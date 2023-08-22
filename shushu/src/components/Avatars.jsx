/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import debounce from "lodash/debounce";
import { supabase } from "../Client/supabaseClient";

export function Avatars(props) {
  const [Friends, setFriends] = useState([]);
  const [avatars, setAvatars] = useState([]);
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

  const maxVisibleAvatars = 4;
  const remainingAvatars = Math.max(avatars.length - maxVisibleAvatars, 0);

  return (
    <div className="flex items-center justify-center">
      <div className="flex -space-x-3 items-center">
        {avatars
          .slice(0, maxVisibleAvatars)
          .map(
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
        {remainingAvatars > 0 && (
          <div
            className={`w-10 h-10 rounded-full bg-red-100 border-red-200 text-red-500 font-semibold flex items-center justify-center ${props.classy}`}
          >
            +{remainingAvatars}
          </div>
        )}
      </div>
    </div>
  );
}
