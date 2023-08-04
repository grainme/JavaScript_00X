import { useState } from "react";
import { supabase } from "./supabaseClient";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    setLoading(true);
    const { user, error } = await supabase.auth.signIn({ email, password });

    if (error) {
      console.error("Error signing in:", error);
    } else {
      console.log("User successfully signed in:", user);
      // You can redirect or perform other actions here upon successful login
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FFFEFB]">
      <div className="relative flex flex-col m-6 space-y-8 rounded-3xl md:flex-row md:space-y-0 md:w-[1000px]">
        {/* ... */}
        <div className="flex flex-col justify-center p-8 md:p-14">
          <span className="font-clash mb-3 text-4xl font-semibold">
            PomodoroKai
          </span>
          <span className="font-normal text-gray-600 mb-2">
            Enter your credentials to access your account!
          </span>
          {/* ... */}
          <div className="py-4">
            <span className="mb-2 text-md">Email</span>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md placeholder-font-light placeholder-text-gray-500"
              name="email"
              id="email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="py-4">
            <span className="mb-2 text-md">Password</span>
            <input
              type="password"
              name="pass"
              id="pass"
              autoComplete="off"
              className="w-full p-2 border border-gray-300 rounded-md placeholder-font-light placeholder-text-gray-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="w-full border border-gray-300 text-md p-2 rounded-lg mb-6 hover:bg-black hover:text-white"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
          {/* ... */}
        </div>
        {/* ... */}
      </div>
    </div>
  );
};
