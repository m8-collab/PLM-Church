import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const isAdmin = (session?.user as any)?.email === process.env.ADMIN_EMAIL;

  if (!session || !isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const body = await req.json();
  const { type, title, excerpt, content, description, imageUrl } = body;

  if (type === "blog") {
    const post = await (prisma as any).blogPost.create({
      data: {
        title,
        excerpt,
        content,
      },
    });
    return NextResponse.json(post, { status: 201 });
  }

  if (type === "gallery") {
    const item = await (prisma as any).galleryItem.create({
      data: {
        title,
        description,
        imageUrl,
      },
    });
    return NextResponse.json(item, { status: 201 });
  }

  return NextResponse.json({ error: "Unsupported type" }, { status: 400 });
}
