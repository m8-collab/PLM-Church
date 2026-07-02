import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  const { prisma } = await import("@/lib/prisma");
  const session = await getServerSession(authOptions);
  const currentUserEmail = (session?.user as any)?.email;
  const isAdmin = (session?.user as any)?.role === "admin";

  if (!session || !isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { email, role } = await req.json();
  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const target = await prisma.member.findUnique({ where: { email } });
  if (!target) {
    return NextResponse.json({ error: "Member not found" }, { status: 404 });
  }

  const updated = await (prisma as any).$executeRaw`UPDATE Member SET role = ${role || "admin"} WHERE email = ${email}`;

  return NextResponse.json({ success: true, updatedBy: currentUserEmail, member: updated });
}
