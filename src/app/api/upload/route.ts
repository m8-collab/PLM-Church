import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

// Buckets must already exist in the Supabase project (Storage → New bucket),
// created as PUBLIC buckets so the site can display the files directly.
const ALLOWED_BUCKETS = ["gallery-photos", "sermon-videos"];

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const isAdmin = (session?.user as any)?.email === process.env.ADMIN_EMAIL;

  if (!session || !isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const bucket = formData.get("bucket") as string | null;

  if (!file) {
    return NextResponse.json({ error: "No file was provided." }, { status: 400 });
  }
  if (!bucket || !ALLOWED_BUCKETS.includes(bucket)) {
    return NextResponse.json({ error: "Unknown storage bucket." }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const extension = file.name.includes(".") ? file.name.split(".").pop() : "bin";
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`;

  const { error } = await supabaseAdmin.storage.from(bucket).upload(fileName, buffer, {
    contentType: file.type || "application/octet-stream",
    upsert: false,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data } = supabaseAdmin.storage.from(bucket).getPublicUrl(fileName);

  return NextResponse.json({ url: data.publicUrl }, { status: 201 });
}
