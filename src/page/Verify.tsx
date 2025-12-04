import { useEffect, useState } from "react";
import { supabase } from "../service/supabase";
import { useNavigate } from "react-router-dom";

const Verify = () => {
  const [message, setMessage] = useState("Verifying your email...");
  const navigate = useNavigate();

  useEffect(() => {
    async function verifyEmail() {
      try {
        const hash = window.location.hash; // #access_token=...&refresh_token=...&type=signup
        const params = new URLSearchParams(hash.replace("#", ""));

        const access_token = params.get("access_token");
        const refresh_token = params.get("refresh_token");
        const type = params.get("type"); // signup | email_change | recovery
        const error = params.get("error");
        const error_description = params.get("error_description");

        // ❌ If Supabase sent an error
        if (error) {
          setMessage(`Verification failed: ${error_description}`);
          return;
        }

        // ❌ If tokens missing
        if (!access_token || !refresh_token) {
          setMessage("Invalid verification link.");
          return;
        }

        // ✅ Set Supabase session (logs user in)
        const { error: sessionError } = await supabase.auth.setSession({
          access_token,
          refresh_token,
        });

        if (sessionError) {
          setMessage("Session error: " + sessionError.message);
          return;
        }

        // Different messages depending on action
        if (type === "signup") {
          setMessage("Email verified! Redirecting...");
        } else if (type === "email_change") {
          setMessage("Your email address has been updated!");
        } else if (type === "recovery") {
          setMessage("Password reset complete!");
        }

        setTimeout(() => navigate("/"), 1500);
      } catch (err: any) {
        setMessage("Unexpected error: " + err.message);
      }
    }

    verifyEmail();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center text-lg">
      {message}
    </div>
  );
};

export default Verify;
