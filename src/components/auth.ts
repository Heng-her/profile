import { supabase } from "../service/supabase";
export async function incrementView(targetUserId: string) {
  const { data, error } = await supabase.rpc('increment_profile_view', {
    target_user_id: targetUserId,
  })

  if (error) {
    console.error('Error incrementing profile view:', error)
  } else {
    console.log('Profile view incremented:', data)
  }
}
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
    .select(
      `
      id,
      username,
      email,
      firstname,
      lastname,
      bio,
      profile_image,
      role,
      created_at,
      view_profile(*),
      contacts(*),
      social_links(*)
    `
    )
    .eq("username", username)
    .single();

  if (error) throw error;
  return data;
}

export async function updateUser(userId: string, updates: any) {
  // Remove undefined fields
  const cleanUpdates = Object.fromEntries(
    Object.entries(updates).filter(([_, v]) => v !== undefined)
  );

  cleanUpdates.updated_at = new Date().toISOString();

  const { data, error } = await supabase
    .from("users")
    .update(cleanUpdates)
    .eq("id", userId) // must match RLS: auth.uid() = auth_id
    .select()
    .single();

  if (error) throw error;

  return data;
}
export async function addContact(userId: string, type: string, value: string) {
  const { data, error } = await supabase
    .from("contacts")
    .insert({ user_id: userId, type, value })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateContact(contactId: number, value: string) {
  const { data, error } = await supabase
    .from("contacts")
    .update({ value })
    .eq("id", contactId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteContact(contactId: number) {
  const { error } = await supabase
    .from("contacts")
    .delete()
    .eq("id", contactId);

  if (error) throw error;
}

export async function addSocialLink(
  userId: string,
  platform: string,
  url: string
) {
  const { data, error } = await supabase
    .from("social_links")
    .insert({ user_id: userId, platform, url })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateSocialLink(linkId: number, url: string) {
  const { data, error } = await supabase
    .from("social_links")
    .update({ url })
    .eq("id", linkId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteSocialLink(linkId: number) {
  const { error } = await supabase
    .from("social_links")
    .delete()
    .eq("id", linkId);

  if (error) throw error;
}
