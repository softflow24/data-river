import { createClient } from "@supabase/supabase-js";
import { type Database } from "~/types/supabase";

if (!process.env.SUPABASE_URL) throw new Error("Missing SUPABASE_URL");
if (!process.env.SUPABASE_ANON_KEY)
  throw new Error("Missing SUPABASE_ANON_KEY");

export const supabase = createClient<Database>(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
);
