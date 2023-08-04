import { useState, useRef } from "react";
import profile from "../assets/mriwina.jpg";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom";

export function Dropdown() {
  const navigate = useNavigate();

  async function signOut() {
    const { error } = await supabase.auth.signOut().catch(() => {
      console.log(error);
    });
    navigate("/");
  }
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const profileRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="m-4">
      <button
        id="dropdownAvatarNameButton"
        data-dropdown-toggle="dropdownAvatarName"
        className="flex items-center text-sm font-medium text-gray-900 rounded-xl hover:text-purple-200  md:mr-0  "
        type="button"
        onClick={toggleDropdown}
        ref={profileRef} // Add a ref to the profile image
      >
        <span className="sr-only">Open user menu</span>
        <img className="w-8 h-8 rounded-full" src={profile} alt="user photo" />
      </button>

      {/* Dropdown menu */}
      {isDropdownOpen && (
        <div
          id="dropdownAvatarName"
          className=" my-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute"
          style={{
            // Calculate the position based on the profile image's coordinates
            top: profileRef.current.offsetTop + profileRef.current.offsetHeight,
            right:
              window.innerWidth -
              (profileRef.current.offsetLeft + profileRef.current.offsetWidth) -
              20,
          }}
        >
          <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <div className="font-medium">Indie Developer</div>
            <div className="truncate">saitama@grainme.io</div>
          </div>
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownAvatarNameButton"
          >
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Settings
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Teams
              </a>
            </li>
          </ul>
          <div onClick={signOut} className="py-2 cursor-pointer ">
            <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
              Log out
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
