/* eslint-disable react-hooks/exhaustive-deps */
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../components/supabaseClient";
// import image from "../assets/login.jpg";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function Login() {
  const navigate = useNavigate();

  // This is just testing Supabase Fetching Data from Tables
  useEffect(() => {
    const getTasks = async () => {
      try {
        let { data: tasks, error } = await supabase
          .from("tasks")
          .select("title");
        if (error) {
          throw error;
        }
        return tasks;
      } catch (error) {
        console.error("Error fetching tasks:", error);
        return null;
      }
    };

    (async () => {
      const tasks = await getTasks();
      console.log(tasks);
    })();
  }, []);

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event) => {
      if (event === "SIGNED_IN") {
        navigate("/work");
      } else {
        navigate("/");
      }
    });
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
      {/* <div className="hidden md:block relative">
        <img src={image} alt="img" className="w-full h-full rounded-l-3xl" />
      </div> */}
    </div>
  );
}