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
  if (!parsed.success) return fail(400, "Note cannot be empty");

  const exists = await prisma.enquiry.count({ where: { id } });
  if (!exists) return fail(404, "Request not found");

  await prisma.$transaction([
    prisma.note.create({ data: { enquiryId: id, body: parsed.data.body } }),
    prisma.event.create({ data: { enquiryId: id, type: "NOTE_ADDED" } }),
  ]);
  return ok();
}