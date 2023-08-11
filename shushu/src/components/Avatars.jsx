import { useEffect, useState } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import debounce from "lodash/debounce";

export function Avatars() {
  const [Friends, setFriends] = useState([]); // Initialize with an empty array
  const [avatars, setAvatars] = useState([]);
  const supabase = useSupabaseClient();
  const user = useUser();

  const fetchAvatars = async () => {
    try {
      const { data: friendData, error: friendError } = await supabase
        .from("friend_relationships")
        .select()
        .eq("status", "accepted")
        .or(`friend_id.eq.${user?.id},user_id.eq.${user?.id}`);

      if (friendError) {
        console.error("Error fetching friend relationships:", friendError);
        return;
      }

      setFriends(friendData);

      const friendIds = friendData.map((duo) =>
        duo.friend_id !== user?.id ? duo.friend_id : duo.user_id
      );

      if (friendIds.length > 0) {
        const { data: avatarData, error: avatarError } = await supabase
          .from("profiles")
          .select("avatar_url")
          .in("id", friendIds);

        if (avatarError) {
          console.error("Error fetching avatars:", avatarError);
          return;
        }

        if (Array.isArray(avatarData) && avatarData.length > 0) {
          setAvatars(avatarData);
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const debouncedFetchAvatars = debounce(fetchAvatars, 300);

  useEffect(() => {
    if (user) {
      console.log(user?.id);
      debouncedFetchAvatars();
      fetchAvatars();
      supabase
        .channel("table-db-changes")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "friend_relationships",
          },
          (payload) => {
            console.log(payload);
            fetchAvatars();
          }
        )
        .subscribe();
    }
  }, [user]);

  return (
    <div className="flex items-center justify-center">
      <div className="flex ml-5 -space-x-3 items-center">
        {avatars.map(
          (avatar, index) =>
            avatar.avatar_url && (
              <img
                key={index}
                className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
                src={avatar.avatar_url}
                alt=""
              />
            )
        )}
      </div>
    </div>
  );
}
