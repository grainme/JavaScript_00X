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
  const maxWidthForMobileTablet = 768; // Adjust this threshold as needed

  useEffect(() => {
    if (window.innerWidth <= maxWidthForMobileTablet) {
      // Redirect to the "/phone" page
      navigate("/phone");
    }
  }, []);

  useEffect(() => {
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
      <div className="container min-h-screen mx-auto px-4 md:px-8 lg:px-12 xl:px-24">
        <div className="flex flex-col items-center justify-center space-y-10 lg:flex-row lg:space-x-8 lg:pb-10 xl:space-x-24 relative z-10">
          <div className="flex flex-col space-y-2">
            <h1 className="font-bold text-4xl lg:text-5xl">PomodoroKai</h1>
            <p className="opacity-75 text-xl max-w-md lg:text-2xl">
              where focus meets collaboration effortlessly
            </p>
          </div>
          <div className="relative w-full max-w-md lg:max-w-lg">
            <div className="text-black w-full bg-[#FFFEFB] flex flex-col items-center px-4 md:px-8 lg:px-10 py-10 rounded-2xl z-10 shadow-2xl shadow-black/10 md:py-14 lg:py-16 selection:bg-black selection:text-white">
              <h3 className="font-bold text-3xl mb-10 lg:text-4xl">welcome!</h3>
              <div className="flex flex-col space-y-4 w-full font-medium">
                <Auth
                  supabaseClient={supabase}
                  appearance={{
                    theme: ThemeSupa,
                    style: {
                      // Adjust the styles as needed
                      button: {
                        border: "black",
                        color: "white",
                        backgroundColor: "black",
                      },
                      input: {
                        width: "100%",
                        // Add your input styles here
                      },
                    },
                  }}
                  providers={["google"]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
