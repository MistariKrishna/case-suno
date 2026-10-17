import { prisma } from "@/lib/db";
import { LawyersManager } from "@/components/admin/LawyersManager";

export const dynamic = "force-dynamic";

export default async function LawyersPage() {
  const lawyers = await prisma.lawyer.findMany({
    orderBy: [{ active: "desc" }, { name: "asc" }],
    include: { _count: { select: { enquiries: true } } },
  });

  return (
    <div className="mx-auto max-w-[1300px] space-y-5">
      <div>
        <h1 className="font-serif text-3xl font-medium tracking-tight">Lawyers & professionals</h1>
        <p className="mt-1 text-[13px] text-[#6B655B]">Your verified network for case referrals.</p>
      </div>
      <LawyersManager
        lawyers={lawyers.map((l) => ({
          id: l.id,
          name: l.name,
          phone: l.phone,
          email: l.email,
          specialization: l.specialization,
          city: l.city,
          active: l.active,
          cases: l._count.enquiries,
        }))}
      />
    </div>
  );
}