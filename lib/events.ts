import { prisma } from "./db";

export function addEvent(enquiryId: string, type: string, detail?: string) {
  return prisma.event.create({ data: { enquiryId, type, detail } });
}