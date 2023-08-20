/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@supabase/auth-helpers-react";
import { supabase } from "../Client/supabaseClient";

export function Dropdown() {
  const navigate = useNavigate();
  const user = useUser();
  const [job, setJob] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const profileRef = useRef(null);
  const dropdownRef = useRef(null);

  // Load user data from LocalStorage if available
  useEffect(() => {
    const localData = localStorage.getItem("userData");
    if (localData) {
      const { avatar_url, job, username } = JSON.parse(localData);
      setImageUrl(avatar_url);
      setJob(job);
      setUsername(username);
      setIsLoading(false);
    }
  }, []);

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

        // Save user data to LocalStorage
        localStorage.setItem("userData", JSON.stringify(data));
      } catch (error) {
        console.error("Error retrieving user data:", error);
        setIsLoading(false);
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

  async function signOut() {
    const { error } = await supabase.auth.signOut().catch(() => {
      console.log(error);
    });

    // Clear the items from LocalStorage
    localStorage.clear();

    navigate("/");
  }

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

  return (
    <div className="m-4 mr-7 font-Bricolage" ref={dropdownRef}>
      <button
        id="dropdownAvatarNameButton"
        data-dropdown-toggle="dropdownAvatarName"
        className="flex items-center text-sm font-medium text-gray-900 rounded-xl md:mr-0  "
        type="button"
        onClick={toggleDropdown}
        ref={profileRef} // Add a ref to the profile image
      >
        <span className="sr-only">Open user menu</span>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              className="w-10 h-10 rounded-3xl"
              src={imageUrl}
              alt="user photo"
            />{" "}
            <span className="top-0 left-7 absolute w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
          </div>

          <div className=" flex flex-col items-start ">
            <div className="hover:text-purple-700">{username}</div>
            <div className="text-gray-500">{job}</div>
          </div>
        </div>
      </button>

      {/* Dropdown menu */}
      {isDropdownOpen && (
        <div
          id="dropdownAvatarName"
          className="flex flex-col items-start my-3 z-10 bg-white divide-y  rounded-lg shadow absolute"
        >
          <ul
            className="py-2 text-sm text-gray-700  w-[9rem] "
            aria-labelledby="dropdownAvatarNameButton"
          >
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 ">
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 ">
                Settings
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 ">
                Teams
              </a>
            </li>
            <li>
              <div onClick={signOut} className="cursor-pointer ">
                <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ">
                  Log out
                </div>
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
