import { NextResponse } from "next/server";
import { markPaymentFailed, markPaymentPaid } from "@/lib/payments";
import { verifyWebhookSignature } from "@/lib/razorpay";

type RzpWebhook = {
  event: string;
  payload?: {
    payment?: { entity?: { id?: string; order_id?: string; error_description?: string } };
    order?: { entity?: { id?: string } };
  };
};

export async function POST(req: Request) {
  const raw = await req.text();
  const signature = req.headers.get("x-razorpay-signature") ?? "";
  if (!verifyWebhookSignature(raw, signature)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  let body: RzpWebhook;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const payment = body.payload?.payment?.entity;
  const orderId = payment?.order_id ?? body.payload?.order?.entity?.id;

  try {
    if ((body.event === "payment.captured" || body.event === "order.paid") && orderId && payment?.id) {
      await markPaymentPaid(orderId, payment.id);
    } else if (body.event === "payment.failed" && orderId) {
      await markPaymentFailed(orderId, payment?.error_description);
    }
  } catch (err) {
    console.error("Webhook handling failed", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}