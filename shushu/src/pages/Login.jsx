/* eslint-disable react-hooks/exhaustive-deps */
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import background from "../assets/clouds.jpg";

export function Login() {
  const supabase = useSupabaseClient();
  const navigate = useNavigate(); // Use this to navigate after authentication

  useEffect(() => {
    const maxWidthForMobileTablet = 768; // Adjust this threshold as needed

    if (window.innerWidth <= maxWidthForMobileTablet) {
      // Redirect to the "/phone" page
      navigate("/phone");
    }

    const handleAuthStateChange = async (event, session) => {
      console.log("Auth state changed:", event);

      if (event === "SIGNED_IN" && session?.user?.id) {
        console.log(session.user.id);
        const { data } = await supabase
          .from("profiles")
          .select("username")
          .eq("id", session.user.id);

        if (data[0]?.username !== null) {
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
    <div className="font-clash relative bg-black text-white flex flex-col selection:bg-black/30">
      <img
        src={background}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />
      <div className="container min-h-screen mx-auto px-8 flex flex-col items-center justify-center space-y-10 lg:flex-row lg:px-0 lg:space-x-8 lg:pb-10 xl:space-x-24 relative z-10">
        <div className="text-black w-1/2 bg-[#FFFEFB] flex flex-col items-center px-8 py-10 rounded-2xl z-10 shadow-2xl shadow-black/10 md:px-14 lg:py-16 selection:bg-black selection:text-white">
          <div className=" text-[50px] font-semibold">PomodoroKai</div>
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
                  backgroundColor: "transparent",
                  border: "none",
                },
              },
            }}
            providers={["google"]}
          />
        </div>
      </div>
    </div>
  );
}
