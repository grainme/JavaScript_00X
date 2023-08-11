import { useState, useEffect, useRef } from "react";
import { Bell } from "lucide-react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { FriendNotif } from "./FriendNotification";
import { CommentNotification } from "./CommentNotification";

export const NotificationDropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [friendRequests, setFriendRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  const supabase = useSupabaseClient();
  const user = useUser();
  const dropdownRef = useRef(null);

  const retrieveRequests = async () => {
    try {
      const { data, error } = await supabase
        .from("friend_relationships")
        .select()
        .eq("friend_id", user?.id)
        .eq("status", "pending");

      if (error) {
        throw error;
      }
      setFriendRequests(data);
    } catch (error) {
      console.error("Error retrieving friend requests:", error);
    }
  };

  useEffect(() => {
    retrieveRequests();
  }, [supabase, user?.id]);

  useEffect(() => {
    const retrieveFriendData = async () => {
      try {
        if (friendRequests.length > 0) {
          const friendIds = friendRequests.map((request) => request.user_id);
          const { data, error } = await supabase
            .from("profiles")
            .select()
            .in("id", friendIds);

          if (error) {
            throw error;
          }
          setFriends(data);
        }
      } catch (error) {
        console.error("Error retrieving friend data:", error);
      }
    };

    retrieveFriendData();
  }, [friendRequests, supabase]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    if (showDropdown) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [showDropdown]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        id="dropdownNotificationButton"
        onClick={toggleDropdown}
        className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 focus:outline-none"
        type="button"
      >
        <Bell className="h-5 w-5" />
        <div className="relative inline-flex w-3 h-3 bg-red-500 border-2 border-white rounded-full -top-2 right-3 dark:border-gray-900"></div>
      </button>
      {showDropdown && (
        <div
          id="dropdownNotification"
          className="z-20 absolute right-0 mt-2 w-[20rem] max-h-[40rem] bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-800 dark:divide-gray-700 overflow-y-auto"
          aria-labelledby="dropdownNotificationButton"
        >
          <div className="block px-4 py-2 font-medium text-gray-700 rounded-t-lg bg-white dark:bg-gray-800 dark:text-white">
            Notifications
          </div>
          <div>
            {friends.map((friend, index) => (
              <FriendNotif
                userId={friend.id}
                username={friend.username}
                avatar={friend.avatar_url}
                job={friend.job}
                key={index}
                setFriendRequests={setFriendRequests}
              />
            ))}
          </div>
          <CommentNotification />
          <a className="block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-gray-50 hover:bg-gray-100">
            <div className="inline-flex items-center">That's all for you!</div>
          </a>
        </div>
      )}
    </div>
  );
};
