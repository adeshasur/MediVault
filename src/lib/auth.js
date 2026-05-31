import { supabase } from "./supabaseClient";

export async function signIn(email, password) {
  if (!supabase) return { error: { message: "Database connection is not configured." } };
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signOut() {
  if (supabase) await supabase.auth.signOut();
}

export async function getStaffUser() {
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data.session?.user || null;
}
