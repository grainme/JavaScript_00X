/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect, useRef } from "react";
import { Bell } from "lucide-react";
import profile from "../assets/mriwina.jpg";

export const NotificationDropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

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
        className="inline-flex items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none "
        type="button"
      >
        <Bell className="h-5 w-5" />
        <div className="relative inline-flex w-3 h-3 bg-red-500 border-2 border-white rounded-full -top-2 right-3 dark:border-gray-900"></div>
      </button>
      {/* Dropdown menu */}
      {showDropdown && (
        <div
          id="dropdownNotification"
          className="z-20 absolute right-0 mt-2 w-[35rem] max-h-[40rem] bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-800 dark:divide-gray-700 overflow-y-auto"
          aria-labelledby="dropdownNotificationButton"
        >
          {/* Notification items */}
          <div className="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white">
            Notifications
          </div>
          {/* Sample notification items */}
          <a href="#" className="flex px-4 py-3 hover:bg-gray-10">
            {/* Replace the following divs with your actual notification item */}
            <div className="flex-shrink-0">
              <img
                className="rounded-full w-11 h-11"
                src={profile}
                alt="Jese image"
              />
            </div>
            <div className="w-full pl-3">
              <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                New message from{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  Naruto Uzumaki
                </span>
                : "Hey, what's up? All set for the presentation?"
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-500">
                Today
              </div>
            </div>
          </a>
          <a href="#" className="flex px-4 py-3 hover:bg-gray-10">
            {/* Replace the following divs with your actual notification item */}
            <div className="flex-shrink-0">
              <img className="rounded-full w-11 h-11" src={profile} />
            </div>
            <div className="w-full pl-3">
              <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                New message from{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  Saitama Kun
                </span>
                : "We need to deploy the front tomorrow, make a request to the
                cloud repository!"
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-500">
                Today
              </div>
            </div>
          </a>

          {/* End of sample notification items */}
          <a className="block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-gray-50 hover:bg-gray-100 ">
            <div className="inline-flex items-center">That's all for you!</div>
          </a>
        </div>
      )}
    </div>
  );
};
