import { z } from "zod";
import { prisma } from "@/lib/db";
import { clientIp, fail, ok, rateLimit, readJson } from "@/lib/http";

const schema = z.object({
  reference: z.string().trim().min(3).max(40),
  phone: z.string().trim().min(8).max(20),
});

/** Compare only the last 10 digits so "+91 94271 62414" matches "9427162414" */
const last10 = (s: string) => s.replace(/\D/g, "").slice(-10);

export async function POST(req: Request) {
  // Slow down guessing attempts
  if (!rateLimit(`track-lookup:${clientIp(req)}`, 10, 10 * 60_000)) {
    return fail(429, "Too many attempts. Please try again in a few minutes.");
  }

  const parsed = schema.safeParse(await readJson(req));
  if (!parsed.success) return fail(400, "Please enter your reference number and mobile number.");

  const raw = parsed.data.reference.replace(/\s+/g, "");

  const enquiry = await prisma.enquiry.findFirst({
    where: { reference: { in: [raw, raw.toUpperCase()] } },
    select: { accessToken: true, phone: true },
  });

  // Same message for "not found" and "wrong phone" so details can't be probed
  if (!enquiry || last10(enquiry.phone) !== last10(parsed.data.phone)) {
    return fail(404, "No request found with these details. Please check and try again.");
  }

  return ok({ path: `/track/${enquiry.accessToken}` });
}