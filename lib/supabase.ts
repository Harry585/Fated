import { createClient } from "@/utils/supabase/client";

export function createSupabaseBrowserClient() {
  try {
    return createClient();
  } catch {
    return null;
  }
}
