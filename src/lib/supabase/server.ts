import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export function createClient() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: async () => (await cookieStore).getAll(), setAll: async (c) => { const store = await cookieStore; c.forEach(({ name, value, options }) => store.set(name, value, options)); } } }
  );
}