/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import { NotifAccepted } from "./NotifAccepted";

export function FriendNotif(props) {
  const supabase = useSupabaseClient();
  const user = useUser();

  const [gotcha, setGotcha] = useState(false);

  const acceptStatus = async () => {
    try {
      const { data, error } = await supabase
        .from("friend_relationships")
        .update({ status: "accepted" })
        .eq("friend_id", user?.id)
        .eq("user_id", props.userId);

      if (error) {
        throw error;
      }

      // Update gotcha state
      setGotcha(true);
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };

  const declineStatus = async () => {
    try {
      const { error } = await supabase
        .from("friend_relationships")
        .delete()
        .eq("friend_id", props.userId);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("Error declining friend request:", error);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div
      id="toast-interactive"
      className="w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-400"
      role="alert"
    >
      <div className="flex items-center justify-center">
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:text-blue-300 dark:bg-blue-900">
          <img src={props.avatar} alt="User" className="rounded-full" />
          <span className="sr-only">User icon</span>
        </div>

        {gotcha ? (
          <div className="ml-3 text-sm font-normal">
            Bingo, Invitation got accepted!
          </div>
        ) : (
          <div className="ml-3 text-sm font-normal">
            <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
              Friend Request
            </span>
            <div className="mb-2 text-sm font-normal">
              {props.username} has sent you a request
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <a
                  onClick={acceptStatus}
                  className="cursor-pointer inline-flex justify-center w-full px-2 py-1.5 text-xs font-medium text-center bg-red-100 hover:bg-red-200 text-red-800 rounded-lg focus:ring-4 focus:outline-none"
                >
                  Accept
                </a>
              </div>
              <div>
                <a
                  onClick={declineStatus}
                  className="cursor-pointer inline-flex justify-center w-full px-2 py-1.5 text-xs font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-600 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                >
                  Decline
                </a>
              </div>
            </div>
          </div>
        )}
        <button
          type="button"
          className="ml-auto -mx-1.5 -my-1.5 bg-white items-center justify-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          data-dismiss-target="#toast-interactive"
          aria-label="Close"
        >
          <span className="sr-only">Close</span>
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
