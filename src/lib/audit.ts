import { db } from "@/lib/db";
import type { Staff } from "@prisma/client";

/* ----------------------------------------------------------------------------
   Audit trail (plan §8.3): every sensitive administrative action and every
   membership/payment transition is recorded — who, when, what, and the
   details that matter for review (reasons, amounts, status changes).
   Records are append-only from the app's perspective; financial records are
   never hard-deleted.
   ---------------------------------------------------------------------------- */

export interface AuditInput {
  actor?: Pick<Staff, "id" | "name"> | null;
  actorName?: string; // fallback label for public (non-staff) actions
  action: string; // e.g. "announcement.create", "payment.verify"
  entity: string; // e.g. "announcement", "payment"
  entityId: string | number;
  details?: Record<string, unknown>;
}

export async function writeAudit(input: AuditInput): Promise<void> {
  try {
    await db.auditLog.create({
      data: {
        actorId: input.actor?.id ?? null,
        actorName: input.actor?.name ?? input.actorName ?? "system",
        action: input.action,
        entity: input.entity,
        entityId: String(input.entityId),
        details: JSON.stringify(input.details ?? {}),
      },
    });
  } catch (err) {
    // Auditing must never break the primary operation; surface to server log.
    console.error("[audit] failed to write entry", input.action, err);
  }
}
