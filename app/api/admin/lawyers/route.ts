import { z } from "zod";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { fail, ok, readJson } from "@/lib/http";

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(8).max(20),
  email: z.string().trim().max(160).optional().or(z.literal("")),
  specialization: z.string().trim().min(2).max(160),
  city: z.string().trim().max(120).optional().or(z.literal("")),
});

export async function POST(req: Request) {
  if (!(await getSession())) return fail(401, "Unauthorized");
  const parsed = schema.safeParse(await readJson(req));
  if (!parsed.success) return fail(400, "Please fill name, phone and specialization");
  const d = parsed.data;
  const lawyer = await prisma.lawyer.create({
    data: { name: d.name, phone: d.phone, email: d.email || null, specialization: d.specialization, city: d.city || null },
  });
  return ok({ id: lawyer.id });
}