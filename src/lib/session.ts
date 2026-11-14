import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import type { Staff } from "@prisma/client";

/* ----------------------------------------------------------------------------
   Staff sessions (plan §8, §12).

   Stateless HS256 JWT in an httpOnly cookie — no server-side session store,
   no third-party auth dependency. Sessions carry the staff id; role and
   branch scope are ALWAYS re-read from the database on every privileged
   request, so deactivating a staff member or changing their role takes
   effect immediately (the token alone proves nothing).
   ---------------------------------------------------------------------------- */

export const SESSION_COOKIE = "av_session";
const SESSION_TTL_HOURS = 8;
const ISSUER = "av-fitness-gym";

export interface SessionClaims {
  sub: string; // staff id
}

function secret(): Uint8Array {
  const value = process.env.SESSION_SECRET;
  if (!value || value.length < 32) {
    throw new Error(
      "SESSION_SECRET is missing or too short — set it in .env (openssl rand -hex 32).",
    );
  }
  return new TextEncoder().encode(value);
}

export async function signSessionToken(staffId: number): Promise<string> {
  return new SignJWT({ sub: String(staffId) })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuer(ISSUER)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_HOURS}h`)
    .sign(secret());
}

export async function verifySessionToken(
  token: string,
): Promise<SessionClaims | null> {
  try {
    const { payload } = await jwtVerify(token, secret(), { issuer: ISSUER });
    if (typeof payload.sub !== "string") return null;
    return { sub: payload.sub };
  } catch {
    return null;
  }
}

/** Reads the current staff member from the request cookie (server components / route handlers). */
export async function getSessionStaff(): Promise<Staff | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const claims = await verifySessionToken(token);
  if (!claims) return null;
  const id = Number(claims.sub);
  if (!Number.isInteger(id)) return null;
  const staff = await db.staff.findUnique({ where: { id } });
  if (!staff || !staff.active) return null;
  return staff;
}

export interface GuardFailure {
  status: number;
  body: { error: string };
}

/**
 * API guard — resolves to the staff member, or a failure response.
 * `scope: "owner"` demands the owner role; `scope: "manager"` allows any
 * active staff member. Branch-level data scoping is enforced separately in
 * each handler via `canAccessBranch()`.
 */
export async function guard(
  scope: "owner" | "staff",
): Promise<{ staff: Staff } | { fail: GuardFailure }> {
  const staff = await getSessionStaff();
  if (!staff) {
    return { fail: { status: 401, body: { error: "Sign in required." } } };
  }
  if (scope === "owner" && staff.role !== "OWNER") {
    return {
      fail: {
        status: 403,
        body: { error: "Owner role required for this action." },
      },
    };
  }
  return { staff };
}

export function isFailure(
  result: Awaited<ReturnType<typeof guard>>,
): result is { fail: GuardFailure } {
  return "fail" in result;
}

/** Server-enforced branch access (plan §8.2, §12): managers only see their branch. */
export function canAccessBranch(staff: Staff, branchId: number | null): boolean {
  if (staff.role === "OWNER") return true;
  return staff.branchId !== null && staff.branchId === branchId;
}

/** Attaches a fresh session cookie to a response. */
export function withSessionCookie(
  res: NextResponse,
  token: string,
): NextResponse {
  res.cookies.set({
    name: SESSION_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_HOURS * 3600,
  });
  return res;
}

export function clearSessionCookie(res: NextResponse): NextResponse {
  res.cookies.set({
    name: SESSION_COOKIE,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return res;
}
