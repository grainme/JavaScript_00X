/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import debounce from "lodash/debounce";

export function Avatars(props) {
  const [Friends, setFriends] = useState([]);
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
          .select("*")
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
    debouncedFetchAvatars();
  }, [user?.id]);

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
        fetchAvatars();
      }
    )
    .subscribe();

  console.log(avatars);

  return (
    <div className="flex items-center justify-center">
      <div className="flex -space-x-3 items-center">
        {avatars.map(
          (avatar, index) =>
            avatar.avatar_url && (
              <img
                key={index}
                className={props.classy}
                src={avatar.avatar_url}
                alt=""
              />
            )
        )}
      </div>
    </div>
  );
}
