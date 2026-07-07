import { createClient } from "@supabase/supabase-js";

// Server-side only client, used to upload photos/videos to Supabase Storage
// from admin API routes. Uses the service role key, which can bypass storage
// policies — so it must NEVER be imported into client ("use client") code or
// exposed with the NEXT_PUBLIC_ prefix.
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
