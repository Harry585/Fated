import { NextResponse, type NextRequest } from "next/server";
import {
  metadataToRegistrationProfile,
  registrationProfileToProfileRow
} from "@/lib/profile-persistence";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") ?? "/auth/confirmed";

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const user = data.user;
      const email = user?.email?.trim();
      const profile = metadataToRegistrationProfile(user?.user_metadata ?? {});

      if (user && email && profile) {
        const { error: profileError } = await supabase
          .from("profiles")
          .upsert(registrationProfileToProfileRow(user.id, email, profile), { onConflict: "id" });

        if (profileError) {
          return NextResponse.redirect(new URL("/register?auth=profile-save-error", request.url));
        }
      }

      return NextResponse.redirect(new URL(next, request.url));
    }
  }

  return NextResponse.redirect(new URL("/register?auth=callback-error", request.url));
}
