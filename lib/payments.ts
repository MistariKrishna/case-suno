import { prisma } from "./db";
import { formatINR } from "./status";

/** Idempotent: safe to call from both the browser verification and the webhook */
export async function markPaymentPaid(orderId: string, paymentId: string) {
  const payment = await prisma.payment.findUnique({ where: { razorpayOrderId: orderId } });
  if (!payment) return { ok: false as const };

  const updated = await prisma.payment.updateMany({
    where: { id: payment.id, status: { not: "PAID" } },
    data: { status: "PAID", razorpayPaymentId: paymentId, paidAt: new Date() },
  });
  if (updated.count === 0) return { ok: true as const, already: true };

  await prisma.$transaction([
    prisma.enquiry.updateMany({
      where: { id: payment.enquiryId, status: "AWAITING_PAYMENT" },
      data: { status: "PAID" },
    }),
    prisma.event.create({
      data: { enquiryId: payment.enquiryId, type: "PAYMENT_RECEIVED", detail: `${formatINR(payment.amount)} · ${paymentId}` },
    }),
  ]);
  return { ok: true as const, already: false };
}

export async function markPaymentFailed(orderId: string, reason?: string) {
  const payment = await prisma.payment.findUnique({ where: { razorpayOrderId: orderId } });
  if (!payment || payment.status === "PAID") return;
  await prisma.$transaction([
    prisma.payment.update({ where: { id: payment.id }, data: { status: "FAILED" } }),
    prisma.event.create({ data: { enquiryId: payment.enquiryId, type: "PAYMENT_FAILED", detail: reason?.slice(0, 200) } }),
  ]);
}