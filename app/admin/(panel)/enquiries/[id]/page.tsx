import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { EnquiryWorkspace } from "@/components/admin/EnquiryWorkspace";

export const dynamic = "force-dynamic";

export default async function EnquiryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const e = await prisma.enquiry.findUnique({
    where: { id },
    include: {
      messages: { orderBy: { createdAt: "asc" } },
      notes: { orderBy: { createdAt: "desc" } },
      events: { orderBy: { createdAt: "desc" } },
      payments: { orderBy: { createdAt: "desc" } },
    },
  });
  if (!e) notFound();

  // Opening a request marks client replies as read
  await prisma.message.updateMany({
    where: { enquiryId: id, sender: "CLIENT", readByAdmin: false },
    data: { readByAdmin: true },
  });

  const lawyers = await prisma.lawyer.findMany({
    where: { OR: [{ active: true }, ...(e.lawyerId ? [{ id: e.lawyerId }] : [])] },
    orderBy: { name: "asc" },
  });

  const h = await headers();
  const origin =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    `${h.get("x-forwarded-proto") ?? "http"}://${h.get("host") ?? "localhost:3000"}`;

  const iso = (d: Date) => d.toISOString();

  return (
    <EnquiryWorkspace
      data={{
        id: e.id,
        reference: e.reference,
        category: e.category,
        description: e.description,
        fullName: e.fullName,
        phone: e.phone,
        email: e.email,
        city: e.city,
        language: e.language,
        status: e.status,
        priority: e.priority,
        handling: e.handling,
        feeAmount: e.feeAmount,
        feeNote: e.feeNote,
        lawyerId: e.lawyerId,
        shareLawyerWithClient: e.shareLawyerWithClient,
        createdAt: iso(e.createdAt),
        trackUrl: `${origin}/track/${e.accessToken}`,
        messages: e.messages.map((m) => ({ id: m.id, sender: m.sender, body: m.body, createdAt: iso(m.createdAt) })),
        notes: e.notes.map((n) => ({ id: n.id, body: n.body, createdAt: iso(n.createdAt) })),
        events: e.events.map((ev) => ({ id: ev.id, type: ev.type, detail: ev.detail, createdAt: iso(ev.createdAt) })),
        payments: e.payments.map((p) => ({
          id: p.id,
          amount: p.amount,
          status: p.status,
          razorpayOrderId: p.razorpayOrderId,
          razorpayPaymentId: p.razorpayPaymentId,
          createdAt: iso(p.createdAt),
          paidAt: p.paidAt ? iso(p.paidAt) : null,
        })),
      }}
      lawyers={lawyers.map((l) => ({
        id: l.id,
        name: l.name,
        phone: l.phone,
        email: l.email,
        specialization: l.specialization,
        city: l.city,
        active: l.active,
      }))}
    />
  );
}