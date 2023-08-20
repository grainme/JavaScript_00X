/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import { PlusCircle } from "lucide-react";
import debounce from "lodash/debounce";
import { supabase } from "../Client/supabaseClient";

export function FriendsDrop(props) {
  const user = useUser();
  const [imageUrl, setImageUrl] = useState("");
  const [job, setJob] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const profileRef = useRef(null);
  const dropdownRef = useRef(null);
  const [Friends, setFriends] = useState([]); // Initialize with an empty array
  const [avatars, setAvatars] = useState([]);
  const [names, setNames] = useState([]); // New state for storing friend names
  const [infos, setInfos] = useState([]);

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
          .select() // Fetch both avatar_url and name
          .in("id", friendIds);

        if (avatarError) {
          console.error("Error fetching avatars:", avatarError);
          return;
        }

        if (Array.isArray(avatarData) && avatarData.length > 0) {
          const avatarUrls = avatarData.map((entry) => entry.avatar_url);
          setAvatars(avatarUrls);

          const friendNames = avatarData.map((entry) => entry.username);
          setNames(friendNames);

          const friendInfos = avatarData.map((entry) => entry);
          setInfos(friendInfos);
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const debouncedFetchAvatars = debounce(fetchAvatars, 300);

  useEffect(() => {
    if (user) {
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
          () => {
            fetchAvatars();
          }
        )
        .subscribe();
    }
  }, [user]);

  useEffect(() => {
    // Fetch user data when the component mounts
    const retrieveUserData = async () => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("avatar_url, username, job")
          .eq("id", user?.id)
          .single();

        if (error) {
          throw error;
        }

        setImageUrl(data?.avatar_url);
        setJob(data?.job);
        setUsername(data?.username);
        setIsLoading(false);
      } catch (error) {
        console.error("Error retrieving user data:", error);
        setIsLoading(false); // Ensure loading state is updated even if an error occurs
      }
    };

    retrieveUserData();
  }, [supabase, user?.id]);

  useEffect(() => {
    const preloadImage = new Image();
    preloadImage.src = imageUrl;
    preloadImage.onload = () => {
      // Image is preloaded, you can now set it in the state
      setImageUrl(preloadImage.src);
    };
  }, [imageUrl]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isDropdownOpen]);

  const addFriendToTask = async (infos) => {
    try {
      // Get the current task's assignee array
      const { data: taskData, error: taskError } = await supabase
        .from("tasks")
        .select()
        .eq("id", props.taskId)
        .single();

      if (taskError) {
        console.error("Error fetching task data:", taskError);
        return;
      }

      // Convert assignee JSON array to a JavaScript array
      const assigneeArray = taskData.assignee || [];
      const newAssignee = infos.id;

      // Modify the assignee array and update it in the database
      const updatedAssignees = [...assigneeArray, newAssignee];

      await supabase
        .from("tasks")
        .update({ assignee: updatedAssignees })
        .eq("id", props.taskId);

      // Close the dropdown after adding a friend to the task
      console.log("Task assignees updated in the database");
      setIsDropdownOpen(false);
    } catch (error) {
      console.error("Error updating task assignees:", error);
    }
  };

  return (
    <div ref={dropdownRef} className="flex flex-row items-center justify-start">
      <button
        id="dropdownAvatarNameButton"
        data-dropdown-toggle="dropdownAvatarName"
        onClick={toggleDropdown}
        ref={profileRef} // Add a ref to the profile image
      >
        <PlusCircle className="focus:outline-none focus:border-transparent focus:ring-0 outline-none border-transparent ring-0 h-4 w-4 " />
      </button>

      {/* Dropdown menu */}
      {isDropdownOpen && (
        <div
          id="dropdownAvatarName"
          className="my-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute"
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownAvatarNameButton"
          >
            {Friends.map((friend, index) => (
              <li key={friend.id} onClick={() => addFriendToTask(infos[index])}>
                <a
                  href="#"
                  className="flex flex-row justify-start items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <img
                    src={avatars[index]}
                    className="h-8 w-8 rounded-full"
                    alt={`Avatar of ${names[index]}`}
                  />
                  {names[index]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
