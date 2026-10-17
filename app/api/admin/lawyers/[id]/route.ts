import { z } from "zod";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { fail, ok, readJson } from "@/lib/http";

const schema = z.object({
  active: z.boolean().optional(),
  name: z.string().trim().min(2).max(120).optional(),
  phone: z.string().trim().min(8).max(20).optional(),
  email: z.string().trim().max(160).nullable().optional(),
  specialization: z.string().trim().min(2).max(160).optional(),
  city: z.string().trim().max(120).nullable().optional(),
});
type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, { params }: Ctx) {
  if (!(await getSession())) return fail(401, "Unauthorized");
  const { id } = await params;
  const parsed = schema.safeParse(await readJson(req));
  if (!parsed.success) return fail(400, "Invalid data");
  const exists = await prisma.lawyer.count({ where: { id } });
  if (!exists) return fail(404, "Lawyer not found");
  await prisma.lawyer.update({ where: { id }, data: parsed.data });
  return ok();
}