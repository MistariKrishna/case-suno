import { checkCredentials, createSession } from "@/lib/auth";
import { clientIp, fail, ok, rateLimit, readJson } from "@/lib/http";

export async function POST(req: Request) {
  if (!rateLimit(`login:${clientIp(req)}`, 8, 15 * 60_000)) {
    return fail(429, "Too many attempts. Please try again later.");
  }
  const body = (await readJson(req)) as { email?: unknown; password?: unknown } | null;
  const email = typeof body?.email === "string" ? body.email : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!checkCredentials(email, password)) {
    await new Promise((r) => setTimeout(r, 600));
    return fail(401, "Invalid email or password.");
  }
  await createSession(email.trim().toLowerCase());
  return ok();
}