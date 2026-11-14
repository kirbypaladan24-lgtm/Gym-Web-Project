import { PrismaClient } from "@prisma/client";

/* Prisma singleton (avoids exhausting SQLite connections during dev
   hot-reload). Server-side only — never import from client components. */

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
