import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const { prisma } = await import("@/lib/prisma");
  const session = await getServerSession(authOptions);
  const isAdmin = (session?.user as any)?.email === process.env.ADMIN_EMAIL;

  if (!session || !isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const [posts, galleryItems, requests] = await Promise.all([
    (prisma as any).blogPost.findMany({ orderBy: { createdAt: "desc" } }),
    (prisma as any).galleryItem.findMany({ orderBy: { createdAt: "desc" } }),
    (prisma as any).membershipRequest.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  return NextResponse.json({ posts, galleryItems, requests });
}
