import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendAdminNotification } from "@/lib/email";

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, phone, message } = body;

  if (!name || !email) {
    return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
  }

  const request = await (prisma as any).membershipRequest.create({
    data: { name, email, phone, message },
  });

  try {
    await sendAdminNotification(email, name);
  } catch {
    // Email failure should not block the request record
  }

  return NextResponse.json({ success: true, request }, { status: 201 });
}
