import { z } from "zod";
import { prisma } from "@/lib/db";
import { clientIp, fail, ok, rateLimit, readJson } from "@/lib/http";

const schema = z.object({ body: z.string().trim().min(1).max(2000) });
type Ctx = { params: Promise<{ token: string }> };

export async function POST(req: Request, { params }: Ctx) {
  const { token } = await params;
  if (!rateLimit(`track-msg:${clientIp(req)}`, 15, 10 * 60_000)) return fail(429, "Too many messages. Please wait a moment.");

  const parsed = schema.safeParse(await readJson(req));
  if (!parsed.success) return fail(400, "Message cannot be empty");

  const enquiry = await prisma.enquiry.findUnique({ where: { accessToken: token } });
  if (!enquiry) return fail(404, "Not found");
  if (["CLOSED", "REJECTED"].includes(enquiry.status)) return fail(409, "This request is closed.");

  await prisma.$transaction([
    prisma.message.create({ data: { enquiryId: enquiry.id, sender: "CLIENT", body: parsed.data.body } }),
    prisma.event.create({ data: { enquiryId: enquiry.id, type: "CLIENT_MESSAGE" } }),
  ]);
  return ok();
}