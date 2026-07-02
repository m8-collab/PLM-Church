import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { amount, fund } = await req.json();

  if (!amount || amount <= 0) {
    return NextResponse.json({ error: "Invalid amount." }, { status: 400 });
  }

  if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.includes("replace_me")) {
    return NextResponse.json(
      {
        error:
          "Stripe isn't configured yet. Add a real STRIPE_SECRET_KEY to your .env file (get a free test key at https://dashboard.stripe.com/test/apikeys).",
      },
      { status: 500 }
    );
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const origin = req.headers.get("origin") ?? process.env.NEXTAUTH_URL ?? "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: { name: `${fund} Fund Donation` },
          unit_amount: Math.round(amount * 100),
        },
        quantity: 1,
      },
    ],
    success_url: `${origin}/donate?status=success`,
    cancel_url: `${origin}/donate?status=cancelled`,
  });

  // Record the pending donation so it shows up even before the webhook confirms it.
  await prisma.donation.create({
    data: {
      amountCents: Math.round(amount * 100),
      fund,
      stripeId: session.id,
    },
  });

  return NextResponse.json({ url: session.url });
}
