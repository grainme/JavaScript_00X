/* eslint-disable react-hooks/exhaustive-deps */
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export function Login() {
  const supabase = useSupabaseClient();
  const navigate = useNavigate(); // Use this to navigate after authentication

  useEffect(() => {
    const handleAuthStateChange = async (event, session) => {
      console.log("Auth state changed:", event);

      if (event === "SIGNED_IN" && session?.user?.id) {
        console.log(session.user.id);
        const { data } = await supabase
          .from("profiles")
          .select("username")
          .eq("id", session.user.id);

        if (data[0]?.username.length > 0) {
          console.log("DATA IS ", data);
          navigate("/work");
        } else {
          navigate("/setup");
        }
      } else {
        console.log("OUT");
      }
    };

    return () => {
      supabase.auth.onAuthStateChange(handleAuthStateChange); // Cleanup the event listener when the component unmounts
    };
  }, []);

  return (
    <div className="flex w-screen h-screen overflow-auto">
      <div className="flex-1 flex items-center justify-center flex-col ">
        <div className="font-clash text-[40px] font-semibold">PomodoroKai</div>
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            style: {
              button: {
                border: "black",
                color: "white",
                backgroundColor: "black",
              },
              input: {
                width: "25rem",
                color: "#4A5568",
              },
            },
          }}
          providers={["google"]}
        />
      </div>
    </div>
  );
}
