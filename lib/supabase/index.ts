// Import necessary modules from Supabase SDK and Next.js
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
/**
 * Create a read-only Supabase client for server-side rendering.
 * This function retrieves the Supabase URL and anonymous key from environment variables.
 * It also uses the "cookies" module from Next.js to handle cookie operations.
 * @returns {Object} - Read-only Supabase client instance.
 */
export async function createSupbaseServerClientReadOnly() {
  // Access the cookie store from Next.js headers
  const cookieStore = cookies();
  // Create a read-only Supabase client with specified cookie handling
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
}
/**
 * Create a Supabase client for server-side rendering.
 * This function is similar to the read-only client but also provides cookie setting and removal capabilities.
 * @returns {Object} - Supabase client instance.
 */
export async function createSupbaseServerClient() {
  // Access the cookie store from Next.js headers
  const cookieStore = cookies();
  // Create a Supabase client with cookie handling for set and remove operations
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: "", ...options });
        },
      },
    }
  );
}
/**
 * Create an admin Supabase client.
 * This function retrieves the Supabase URL and admin role key from environment variables.
 * It configures the client with specific authentication options.
 * @returns {Object} - Admin Supabase client instance.
 */
export async function createSupabaseAdmin() {
  // Create an admin Supabase client with specified authentication options
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SERVICE_ROLE!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
