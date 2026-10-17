import { z } from "zod";
import { prisma } from "@/lib/db";
import { clientIp, fail, ok, rateLimit, readJson, siteOrigin } from "@/lib/http";
import { makeReference, makeToken } from "@/lib/ids";

const schema = z.object({
  category: z.string().trim().min(1).max(120),
  description: z.string().trim().min(5).max(1500),
  fullName: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(8).max(20),
  email: z.string().trim().max(160).optional().or(z.literal("")),
  city: z.string().trim().max(120).optional().or(z.literal("")),
  language: z.enum(["en", "hi", "gu"]).optional(),
  website: z.string().optional(), // honeypot
});

export async function POST(req: Request) {
  if (!rateLimit(`enquiry:${clientIp(req)}`, 6, 10 * 60_000)) {
    return fail(429, "Too many requests. Please try again in a few minutes.");
  }

  const parsed = schema.safeParse(await readJson(req));
  if (!parsed.success) return fail(400, "Please check the form details.");
  const d = parsed.data;

  if (d.website) return ok({ reference: "CS-RECEIVED", trackUrl: siteOrigin(req) }); // silently drop bots

  const digits = d.phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 13) return fail(400, "Please enter a valid mobile number.");

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const enquiry = await prisma.enquiry.create({
        data: {
          reference: makeReference(),
          accessToken: makeToken(),
          category: d.category,
          description: d.description,
          fullName: d.fullName,
          phone: d.phone,
          email: d.email || null,
          city: d.city || null,
          language: d.language ?? "en",
          events: { create: { type: "CREATED" } },
        },
      });
      return ok({
        reference: enquiry.reference,
        trackUrl: `${siteOrigin(req)}/track/${enquiry.accessToken}`,
      });
    } catch (err) {
      if (attempt === 2) {
        console.error("Enquiry create failed", err);
        return fail(500, "Could not save your enquiry. Please try again.");
      }
    }
  }
  return fail(500, "Could not save your enquiry.");
}