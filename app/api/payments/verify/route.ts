import { z } from "zod";
import { fail, ok, readJson } from "@/lib/http";
import { markPaymentPaid } from "@/lib/payments";
import { verifyPaymentSignature } from "@/lib/razorpay";

const schema = z.object({
  razorpay_order_id: z.string().min(1),
  razorpay_payment_id: z.string().min(1),
  razorpay_signature: z.string().min(1),
});

export async function POST(req: Request) {
  const parsed = schema.safeParse(await readJson(req));
  if (!parsed.success) return fail(400, "Invalid payment data");
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = parsed.data;

  if (!verifyPaymentSignature(razorpay_order_id, razorpay_payment_id, razorpay_signature)) {
    return fail(400, "Payment verification failed");
  }
  const result = await markPaymentPaid(razorpay_order_id, razorpay_payment_id);
  if (!result.ok) return fail(404, "Payment not found");
  return ok();
}