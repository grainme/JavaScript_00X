import { useState } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Search } from "lucide-react";

export function SearchBar() {
  const [friendMail, setFriendMail] = useState("");
  const supabase = useSupabaseClient();
  const user = useUser();
  const [notification, setNotification] = useState(null);

  const showNotification = async () => {
    setNotification("loading");

    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      setNotification("success");
      setTimeout(() => {
        setNotification(null);
      }, 2500);
    } catch (error) {
      console.error("Error:", error);
      setNotification("error");
    }
  };

  const getUserIdByEmail = async (email) => {
    try {
      const { data, error } = await supabase.rpc("get_user_id_by_email", {
        email: email,
      });
      return data[0]?.id || null;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  const handleMailInput = async () => {
    const friendUserId = await getUserIdByEmail(friendMail);

    if (friendUserId) {
      try {
        setNotification("loading"); // Show loading notification
        const { data, error } = await supabase
          .from("friend_relationships")
          .upsert([
            {
              user_id: user?.id,
              friend_id: friendUserId,
              status: "pending",
            },
          ]);

        if (error) {
          console.error("Error upserting friend relationship:", error);
          showNotification("error");
        } else {
          console.log("Friend relationship upserted successfully:", data);
          showNotification("success");
        }
      } catch (error) {
        console.error("Error:", error);
        showNotification("error");
      }
    } else {
      console.log("Friend not found for the given email.");
    }

    setFriendMail("");
  };

  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      handleMailInput();
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative">
        <label className="block">
          <span className="absolute h-9 flex items-center justify-center pl-2">
            <Search className="h-4 w-4 text-gray-800" />
          </span>
          <input
            className="h-9 py-3 pl-8 bg-gray-100 rounded-lg w-[270px] placeholder-gray-400 focus:outline-none focus:border-transparent focus:ring-0 outline-none border-transparent ring-0 text-[14px]"
            placeholder="Invite a friend"
            type="text"
            value={friendMail}
            onChange={(e) => setFriendMail(e.target.value)}
            onKeyUp={handleKeyUp}
          />
        </label>
      </div>
      {notification && (
        <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 w-[15rem] rounded-md m-auto mb-1 h-12 flex items-center justify-center text-zinc-100">
          <span className="text-[15px]">
            {notification === "success" && "invitation sent successfully"}
            {notification === "error" && "something is wrong"}
            {notification === "loading" && (
              <div className="flex flex-row items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-r-2 border-slate-100 mr-2"></div>{" "}
                <span>sending the invitation ...</span>
              </div>
            )}
          </span>
        </div>
      )}
    </div>
  );
}
