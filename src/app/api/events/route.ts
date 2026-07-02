import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

export async function GET() {
  const events = await prisma.event.findMany({ orderBy: { startTime: "asc" } });
  return NextResponse.json(events);
}

const eventSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  location: z.string().min(1),
  startTime: z.string(), // ISO date string
  endTime: z.string().optional(),
});

export async function POST(req: Request) {
  // Note: this is intentionally open for local development. Before deploying
  // publicly, wrap this in an admin-only check (e.g. a role field on Member).
  const body = await req.json();
  const parsed = eventSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const event = await prisma.event.create({
    data: {
      ...parsed.data,
      startTime: new Date(parsed.data.startTime),
      endTime: parsed.data.endTime ? new Date(parsed.data.endTime) : undefined,
    },
  });
  return NextResponse.json(event, { status: 201 });
}
