import background from "../assets/clouds.jpg";
import { useState, useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export function Waitlist() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [lastId, setLastId] = useState(0);
  const [check, setCheck] = useState(false);
  const supabase = useSupabaseClient();

  useEffect(() => {
    fetchLastId();
  }, []);

  const fetchLastId = async () => {
    const { data, error } = await supabase
      .from("waitlist")
      .select("id", { order: "id.desc", limit: 1 });

    if (!error && data.length > 0) {
      setLastId(data[0].id);
    }
  };

  const handleJoinWaitlist = async () => {
    const newId = lastId + 1;
    const { data, error } = await supabase
      .from("waitlist")
      .insert([{ id: newId, name, email }]);

    setCheck(true);

    if (!error) {
      console.log("User added to waitlist:", data);
      // Optionally, you can send a confirmation email or notification here
      setLastId(newId); // Update lastId after successful insertion
    } else {
      console.error("Error adding user to waitlist:", error);
    }
  };

  return (
    <div className="font-clash relative bg-black text-white flex flex-col selection:bg-black/30">
      <img
        src={background}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />
      <div className="container min-h-screen mx-auto px-8 flex flex-col items-center justify-center space-y-10 lg:flex-row lg:px-0 lg:space-x-8 lg:pb-10 xl:space-x-24 relative z-10">
        <div className="flex flex-col space-y-2">
          <h1 className="font-bold text-4xl lg:text-5xl">PomodoroKai</h1>
          <p className="opacity-75 text-xl max-w-md lg:text-2xl">
            join the waitlist and we'll contact you for access.
          </p>
        </div>
        <div className="relative w-full max-w-md lg:max-w-lg">
          <div className="text-black w-full bg-[#FFFEFB] flex flex-col items-center px-8 py-10 rounded-2xl z-10 shadow-2xl shadow-black/10 md:px-14 lg:py-16 selection:bg-black selection:text-white">
            <h3 className="font-bold text-3xl mb-10 lg:text-4xl">
              wanna early access?
            </h3>
            <form
              className="flex flex-col items-center w-full space-y-8 mb-8"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="flex flex-col space-y-4 w-full font-medium">
                <input
                  type="text"
                  placeholder="what's your name?"
                  onChange={(e) => setName(e.target.value)}
                  className="transition-colors w-full bg-[#FFFEFB] px-5 py-3 rounded-lg border-[2px]   focus:border-black focus:outline-none focus:border-transparent focus:ring-0 outline-none border-transparent ring-0"
                />
                <input
                  type="text"
                  placeholder="what about your email?"
                  onChange={(e) => setEmail(e.target.value)}
                  className="transition-colors w-full bg-[#FFFEFB] px-5 py-3 rounded-lg border-[2px]   focus:border-black focus:outline-none focus:border-transparent focus:ring-0 outline-none border-transparent ring-0"
                />
              </div>
              <button
                type="button"
                onClick={handleJoinWaitlist}
                className="transition-all flex items-center justify-center space-x-1 px-5 py-3 bg-black text-white rounded-lg w-full ring-transparent ring-offset-4 ring active:ring-black hover:bg-neutral-800"
              >
                <span>join waitlist</span>
              </button>
            </form>
            {check ? (
              <p className="text-slate-500">gotcha we'll get to you soon.</p>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
