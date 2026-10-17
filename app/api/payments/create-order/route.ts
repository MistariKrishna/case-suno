import { z } from "zod";
import { prisma } from "@/lib/db";
import { clientIp, fail, ok, rateLimit, readJson } from "@/lib/http";
import { createRazorpayOrder, razorpayConfigured } from "@/lib/razorpay";

const schema = z.object({ token: z.string().min(10).max(100) });

export async function POST(req: Request) {
  if (!rateLimit(`order:${clientIp(req)}`, 10, 10 * 60_000)) return fail(429, "Too many attempts. Please wait a moment.");

  const parsed = schema.safeParse(await readJson(req));
  if (!parsed.success) return fail(400, "Invalid request");

  const enquiry = await prisma.enquiry.findUnique({ where: { accessToken: parsed.data.token } });
  if (!enquiry) return fail(404, "Request not found");
  if (enquiry.status !== "AWAITING_PAYMENT" || !enquiry.feeAmount) return fail(409, "No payment is due right now.");
  if (!razorpayConfigured()) return fail(503, "Online payment is not available right now.");

  // Reuse an open order for the same amount, otherwise create a new one
  let payment = await prisma.payment.findFirst({
    where: { enquiryId: enquiry.id, status: "CREATED", amount: enquiry.feeAmount },
    orderBy: { createdAt: "desc" },
  });

  if (!payment) {
    try {
      const order = await createRazorpayOrder(enquiry.feeAmount, enquiry.reference, {
        enquiryId: enquiry.id,
        reference: enquiry.reference,
      });
      payment = await prisma.payment.create({
        data: { enquiryId: enquiry.id, amount: enquiry.feeAmount, razorpayOrderId: order.id },
      });
    } catch (err) {
      console.error(err);
      return fail(502, "Could not start the payment. Please try again.");
    }
  }

  return ok({
    orderId: payment.razorpayOrderId,
    amount: payment.amount,
    currency: "INR",
    keyId: process.env.RAZORPAY_KEY_ID,
    reference: enquiry.reference,
    prefill: { name: enquiry.fullName, email: enquiry.email ?? "", contact: enquiry.phone },
  });
}