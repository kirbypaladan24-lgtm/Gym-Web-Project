import bcrypt from "bcryptjs";

/* Password hashing for staff accounts. bcryptjs is pure JavaScript, so it
   runs identically on Windows/macOS/Linux with no native builds. Cost 12
   keeps interactive login fast enough while staying resistant to
   offline guessing. */

const ROUNDS = 12;

export function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, ROUNDS);
}

export function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}
