import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../components/supabaseClient";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export function Login() {
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event) => {
      if (event === "SIGNED_IN") {
        // Fetch user data
        const user = await supabase.auth.getUser();
        if (user) {
          setUserId(user.data?.user.id);
        }

        // Check if user has completed profile information
        const { data } = await supabase
          .from("profiles")
          .select("username")
          .eq("id", user.data?.user.id)
          .single();

        if (data && data.username) {
          // User has profile info, navigate to work page
          navigate("/work");
        } else {
          // User needs to complete profile info, navigate to profile completion page
          navigate("/Setup");
        }
      } else {
        navigate("/");
      }
    });
  }, [userId]);

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
      {/* <div className="hidden md:block relative">
        <img src={image} alt="img" className="w-full h-full rounded-l-3xl" />
      </div> */}
    </div>
  );
}
