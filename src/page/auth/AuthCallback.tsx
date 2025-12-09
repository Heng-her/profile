import { useEffect } from "react";
import { supabase } from "../../service/supabase";
import { useNavigate } from "react-router-dom";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    // Supabase automatically handles token exchange
    supabase.auth.getSession().then(async ({ data }) => {
      const session = data.session;
      if (!session) return;

      const user = session.user;

      // Get user profile from your public.users table
      const { data: profile } = await supabase
        .from("users")
        .select("*")
        .eq("auth_id", user.id)
        .single();

      if (profile) {
        localStorage.setItem("profile", JSON.stringify(profile));
        navigate(`/${profile.username}`);
        const expires = new Date();
        expires.setDate(expires.getDate() + 1);
        document.cookie = `access_token=${
          profile.id
        }; expires=${expires.toUTCString()}; path=/; Secure; SameSite=Strict`;
      } else {
        // If first time, create a profile
        const { data: newProfile } = await supabase
          .from("users")
          .insert({
            auth_id: user.id,
            username: user.email?.split("@")[0],
          })
          .select()
          .single();

        localStorage.setItem("profile", JSON.stringify(newProfile));
        navigate(`/${newProfile.username}`);
        if (newProfile) {
          const expires = new Date();
          expires.setDate(expires.getDate() + 1);
          document.cookie = `access_token=${
            newProfile.id
          }; expires=${expires.toUTCString()}; path=/; Secure; SameSite=Strict`;
        }
      }
    });
  }, []);

  return (
    <div className="p-6 text-center">
      <h2>Loading...</h2>
    </div>
  );
}
