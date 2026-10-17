import { z } from "zod";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { fail, ok, readJson } from "@/lib/http";
import { formatINR } from "@/lib/status";

const schema = z.object({
  amountRupees: z.number().positive().max(500000),
  note: z.string().trim().max(300).optional(),
  message: z.string().trim().min(1).max(4000),
});
type Ctx = { params: Promise<{ id: string }> };

export async function POST(req: Request, { params }: Ctx) {
  if (!(await getSession())) return fail(401, "Unauthorized");
  const { id } = await params;
  const parsed = schema.safeParse(await readJson(req));
  if (!parsed.success) return fail(400, "Enter a valid amount and message");

  const enquiry = await prisma.enquiry.findUnique({
    where: { id },
    include: { payments: { where: { status: "PAID" }, take: 1 } },
  });
  if (!enquiry) return fail(404, "Request not found");
  if (enquiry.payments.length > 0) return fail(409, "The platform fee has already been paid for this request.");

  const amount = Math.round(parsed.data.amountRupees * 100);

  await prisma.$transaction([
    prisma.enquiry.update({
      where: { id },
      data: { feeAmount: amount, feeNote: parsed.data.note || null, status: "AWAITING_PAYMENT" },
    }),
    prisma.message.create({ data: { enquiryId: id, sender: "ADMIN", body: parsed.data.message, readByAdmin: true } }),
    prisma.event.create({ data: { enquiryId: id, type: "PAYMENT_REQUESTED", detail: formatINR(amount) } }),
  ]);
  return ok();
}