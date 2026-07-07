import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// No payment processor is wired up here — this just records that a gift was
// given (e.g. by bank transfer or mobile money) so the church has a record
// of it and can follow up. See the Donate page for the giving instructions
// shown to visitors.
const donationSchema = z.object({
  amount: z.number().positive(),
  fund: z.string().min(1),
  donorName: z.string().optional(),
  donorEmail: z.string().email().optional(),
});

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = donationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const donation = await prisma.donation.create({
    data: {
      amountCents: Math.round(parsed.data.amount * 100),
      fund: parsed.data.fund,
      donorName: parsed.data.donorName || null,
      donorEmail: parsed.data.donorEmail || null,
    },
  });

  return NextResponse.json(donation, { status: 201 });
}
