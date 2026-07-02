import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const existing = await prisma.member.findUnique({ where: { email: parsed.data.email } });
  if (existing) {
    return NextResponse.json({ error: "An account with that email already exists." }, { status: 409 });
  }

  const password = await bcrypt.hash(parsed.data.password, 10);
  const member = await prisma.member.create({
    data: { name: parsed.data.name, email: parsed.data.email, password },
  });

  return NextResponse.json({ id: member.id, email: member.email }, { status: 201 });
}
