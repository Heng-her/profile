import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const commentUrl = import.meta.env.VITE_COMMENT_URL;
const commentKey = import.meta.env.VITE_COMMENT_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export const comment = createClient(commentUrl, commentKey);
