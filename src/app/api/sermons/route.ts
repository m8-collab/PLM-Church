import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

export async function GET() {
  const sermons = await prisma.sermon.findMany({ orderBy: { date: "desc" } });
  return NextResponse.json(sermons);
}

const sermonSchema = z.object({
  title: z.string().min(1),
  speaker: z.string().min(1),
  series: z.string().optional(),
  date: z.string(),
  videoUrl: z.string().url().optional(),
  audioUrl: z.string().url().optional(),
  summary: z.string().min(1),
});

export async function POST(req: Request) {
  // Same note as the events route: open for local dev, gate behind admin auth before going public.
  const body = await req.json();
  const parsed = sermonSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const sermon = await prisma.sermon.create({
    data: { ...parsed.data, date: new Date(parsed.data.date) },
  });
  return NextResponse.json(sermon, { status: 201 });
}
