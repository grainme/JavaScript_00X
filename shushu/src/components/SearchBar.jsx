import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Search } from "lucide-react";
import { useState } from "react";

export function SearchBar() {
  const [friendMail, setFriendMail] = useState("");
  const [friendId, setFriendId] = useState(null);
  const supabase = useSupabaseClient();
  const user = useUser();

  async function getUserIdByEmail() {
    try {
      const { data, error } = await supabase.rpc("get_user_id_by_email", {
        email: friendMail,
      });
      return data[0].id;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  }

  const handleMailInput = async () => {
    const friendUserId = await getUserIdByEmail();
    console.log(friendUserId);
    if (friendUserId) {
      try {
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
        } else {
          console.log("Friend relationship upserted successfully:", data);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      console.log("Friend not found for the given email.");
    }
  };

  return (
    <div>
      {/* Search */}
      <div className="relative">
        <label className="block ml-59">
          <span className="absolute h-9 flex items-center justify-center pl-2">
            <Search className="h-4 w-4 text-gray-800" />
          </span>
          <input
            className="h-9 py-3 pl-8  bg-gray-100 rounded-lg w-[270px] placeholder-gray-400 focus:outline-none focus:border-transparent focus:ring-0 outline-none border-transparent ring-0 text-[14px]"
            placeholder="Invite a friend"
            type="text"
            value={friendMail}
            onChange={(e) => {
              setFriendMail(e.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleMailInput();
                setFriendMail("");
              }
            }}
          />
        </label>
      </div>
    </div>
  );
}
