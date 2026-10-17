import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { razorpayConfigured } from "@/lib/razorpay";
import { TrackView } from "@/components/TrackView";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Your request · CASE SUNO",
  robots: { index: false, follow: false },
};

export default async function TrackPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;

  const e = await prisma.enquiry.findUnique({
    where: { accessToken: token },
    include: {
      messages: { orderBy: { createdAt: "asc" } },
      lawyer: true,
      payments: { where: { status: "PAID" }, orderBy: { paidAt: "desc" }, take: 1 },
    },
  });
  if (!e) notFound();

  const paid = e.payments[0];

  return (
    <TrackView
      data={{
        token,
        reference: e.reference,
        category: e.category,
        fullName: e.fullName,
        status: e.status,
        feeAmount: e.feeAmount,
        createdAt: e.createdAt.toISOString(),
        paymentEnabled: razorpayConfigured(),
        paid: paid ? { amount: paid.amount, paidAt: (paid.paidAt ?? paid.createdAt).toISOString() } : null,
        lawyer:
          e.shareLawyerWithClient && e.lawyer
            ? { name: e.lawyer.name, phone: e.lawyer.phone, email: e.lawyer.email, specialization: e.lawyer.specialization }
            : null,
        messages: e.messages.map((m) => ({ id: m.id, sender: m.sender, body: m.body, createdAt: m.createdAt.toISOString() })),
      }}
    />
  );
}