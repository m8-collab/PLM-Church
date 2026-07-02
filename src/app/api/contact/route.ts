import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  reason: z.string().optional(),
  message: z.string().min(1),
});

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  await prisma.contactMessage.create({ data: parsed.data });

  // To actually email the church office, plug in a provider like Resend or
  // nodemailer here. For local use, messages are stored in the database -
  // view them by running `npx prisma studio`.

  return NextResponse.json({ ok: true });
}
