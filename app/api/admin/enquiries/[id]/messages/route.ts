import { z } from "zod";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { fail, ok, readJson } from "@/lib/http";

const schema = z.object({ body: z.string().trim().min(1).max(4000) });
type Ctx = { params: Promise<{ id: string }> };

export async function POST(req: Request, { params }: Ctx) {
  if (!(await getSession())) return fail(401, "Unauthorized");
  const { id } = await params;
  const parsed = schema.safeParse(await readJson(req));
  if (!parsed.success) return fail(400, "Message cannot be empty");

  const enquiry = await prisma.enquiry.findUnique({ where: { id } });
  if (!enquiry) return fail(404, "Request not found");

  await prisma.$transaction([
    prisma.message.create({ data: { enquiryId: id, sender: "ADMIN", body: parsed.data.body, readByAdmin: true } }),
    prisma.event.create({ data: { enquiryId: id, type: "ADMIN_REPLY" } }),
    ...(enquiry.status === "NEW"
      ? [
          prisma.enquiry.update({ where: { id }, data: { status: "IN_REVIEW" } }),
          prisma.event.create({ data: { enquiryId: id, type: "STATUS_CHANGED", detail: "New → In review" } }),
        ]
      : []),
  ]);
  return ok();
}