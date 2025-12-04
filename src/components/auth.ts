import { supabase } from "../service/supabase";

export async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  return {
    user: data.user,
    session: data.session,
    token: data.session?.access_token,
  };
}
export async function getUserByUsername(username: string) {
  const { data, error } = await supabase
    .from("users")
    .select(`
      *,
      view_profile(*),
      contacts(*),
      social_links(*)
    `)
    .eq("username", username)
    .single();

  if (error) throw error;
  return data;
}
