import crypto from "node:crypto";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE = "cs_admin";
const MAX_AGE = 60 * 60 * 12; // 12 hours

function secret() {
  const s = process.env.ADMIN_JWT_SECRET;
  if (!s || s.length < 32) throw new Error("ADMIN_JWT_SECRET must be set (at least 32 characters).");
  return new TextEncoder().encode(s);
}

const digest = (s: string) => crypto.createHash("sha256").update(s).digest();

export function checkCredentials(email: string, password: string) {
  const E = process.env.ADMIN_EMAIL;
  const P = process.env.ADMIN_PASSWORD;
  if (!E || !P) return false;
  const emailOk = crypto.timingSafeEqual(digest(email.trim().toLowerCase()), digest(E.trim().toLowerCase()));
  const passOk = crypto.timingSafeEqual(digest(password), digest(P));
  return emailOk && passOk;
}

export async function createSession(email: string) {
  const token = await new SignJWT({ role: "admin", email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(secret());

  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function destroySession() {
  (await cookies()).delete(COOKIE);
}

export async function getSession(): Promise<{ email: string } | null> {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    return payload.role === "admin" ? { email: String(payload.email ?? "") } : null;
  } catch {
    return null;
  }
}

/** For server pages: redirects to login when not signed in */
export async function requireAdminPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}