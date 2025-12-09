import { useEffect, useState } from "react";
import { supabase } from "../../service/supabase";
import { useNavigate } from "react-router-dom";

export default function AuthCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;
        if (!session) {
          navigate('/login');
          return;
        }

        const user = session.user;

        // Check if profile exists
        const { data: profile, error: fetchError } = await supabase
          .from("users")
          .select("*")
          .eq("auth_id", user.id)
          .maybeSingle();

        if (fetchError) throw fetchError;

        if (profile) {
          // Existing user
          localStorage.setItem("profile", JSON.stringify(profile));
          
          const expires = new Date();
          expires.setDate(expires.getDate() + 1);
          document.cookie = `access_token=${profile.id}; expires=${expires.toUTCString()}; path=/; Secure; SameSite=Strict`;
          
          navigate(`/${profile.username}`);
        } else {
          // New user - create profile
          const username = user.email?.split("@")[0] || `user_${user.id.slice(0, 8)}`;
          
          const { data: newProfile, error: insertError } = await supabase
            .from("users")
            .insert({
              auth_id: user.id,
              email: user.email,
              username: username,
              firstname: user.user_metadata?.firstname || "",
              lastname: user.user_metadata?.lastname || "",
            })
            .select()
            .single();

          if (insertError) {
            // Check if username collision
            if (insertError.code === '23505') { // Unique violation
              const uniqueUsername = `${username}_${Date.now()}`;
              const { data: retryProfile, error: retryError } = await supabase
                .from("users")
                .insert({
                  auth_id: user.id,
                  email: user.email,
                  username: uniqueUsername,
                  firstname: user.user_metadata?.firstname || "",
                  lastname: user.user_metadata?.lastname || "",
                })
                .select()
                .single();

              if (retryError) throw retryError;
              
              localStorage.setItem("profile", JSON.stringify(retryProfile));
              
              const expires = new Date();
              expires.setDate(expires.getDate() + 1);
              document.cookie = `access_token=${retryProfile.id}; expires=${expires.toUTCString()}; path=/; Secure; SameSite=Strict`;
              
              navigate(`/${retryProfile.username}`);
            } else {
              throw insertError;
            }
          } else {
            localStorage.setItem("profile", JSON.stringify(newProfile));
            
            const expires = new Date();
            expires.setDate(expires.getDate() + 1);
            document.cookie = `access_token=${newProfile.id}; expires=${expires.toUTCString()}; path=/; Secure; SameSite=Strict`;
            
            navigate(`/${newProfile.username}`);
          }
        }
      } catch (err: any) {
        console.error("Auth callback error:", err);
        setError(err.message || "Authentication failed");
        setTimeout(() => navigate('/login'), 2000);
      }
    };

    handleCallback();
  }, [navigate]);

  if (error) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-red-600">Error: {error}</h2>
        <p className="text-sm text-gray-600 mt-2">Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div className="p-6 text-center">
      <h2>Loading...</h2>
    </div>
  );
}