import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { fail, ok, readJson } from "@/lib/http";
import { HANDLING, PRIORITIES, STATUSES, STATUS_META, PRIORITY_META, type Priority, type Status } from "@/lib/status";

const schema = z.object({
  status: z.enum(STATUSES).optional(),
  priority: z.enum(PRIORITIES).optional(),
  handling: z.enum(HANDLING).optional(),
  lawyerId: z.string().min(1).nullable().optional(),
  shareLawyerWithClient: z.boolean().optional(),
});

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, { params }: Ctx) {
  if (!(await getSession())) return fail(401, "Unauthorized");
  const { id } = await params;

  const parsed = schema.safeParse(await readJson(req));
  if (!parsed.success) return fail(400, "Invalid data");
  const d = parsed.data;

  const current = await prisma.enquiry.findUnique({ where: { id } });
  if (!current) return fail(404, "Request not found");

  const data: Prisma.EnquiryUpdateInput = {};
  const events: { type: string; detail?: string }[] = [];
  const sLabel = (s: string) => STATUS_META[s as Status]?.label ?? s;
  const pLabel = (p: string) => PRIORITY_META[p as Priority]?.label ?? p;
  const hLabel = (h: string) => (h === "IN_HOUSE" ? "Managed in-house" : h === "LAWYER" ? "Forward to lawyer" : "Undecided");

  if (d.status && d.status !== current.status) {
    data.status = d.status;
    events.push({ type: "STATUS_CHANGED", detail: `${sLabel(current.status)} → ${sLabel(d.status)}` });
  }
  if (d.priority && d.priority !== current.priority) {
    data.priority = d.priority;
    events.push({ type: "PRIORITY_CHANGED", detail: `${pLabel(current.priority)} → ${pLabel(d.priority)}` });
  }
  if (d.handling && d.handling !== current.handling) {
    data.handling = d.handling;
    events.push({ type: "HANDLING_CHANGED", detail: hLabel(d.handling) });
  }
  if (d.lawyerId !== undefined && d.lawyerId !== current.lawyerId) {
    if (d.lawyerId) {
      const lawyer = await prisma.lawyer.findUnique({ where: { id: d.lawyerId } });
      if (!lawyer) return fail(400, "Lawyer not found");
      data.lawyer = { connect: { id: lawyer.id } };
      events.push({ type: "LAWYER_ASSIGNED", detail: `${lawyer.name} (${lawyer.specialization})` });
    } else {
      data.lawyer = { disconnect: true };
      events.push({ type: "LAWYER_REMOVED" });
    }
  }
  if (d.shareLawyerWithClient !== undefined && d.shareLawyerWithClient !== current.shareLawyerWithClient) {
    data.shareLawyerWithClient = d.shareLawyerWithClient;
    events.push({ type: "SHARE_CHANGED", detail: d.shareLawyerWithClient ? "Visible to client" : "Hidden from client" });
  }

  if (events.length === 0) return ok();

  await prisma.$transaction([
    prisma.enquiry.update({ where: { id }, data }),
    ...events.map((e) => prisma.event.create({ data: { enquiryId: id, type: e.type, detail: e.detail } })),
  ]);
  return ok();
}