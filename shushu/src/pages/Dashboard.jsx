/* eslint-disable no-unused-vars */
import { Sidebar } from "../components/SideBar";
import { SearchBar } from "../components/SearchBar";
import { Icons } from "../components/Icons";
import { Dropdown } from "../components/Dropdown";
import { Title } from "../components/TitleInput";
import { Avatars } from "../components/Avatars";
import { KanbanBoard } from "../components/Kanban";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useEffect } from "react";

export function Dashboard() {
  const supabase = useSupabaseClient();

  useEffect(() => {
    for (const key in localStorage) {
      if (key.startsWith("friend_request_")) {
        localStorage.removeItem(key);
      }
    }
    const handleBeforeUnload = () => {
      for (const key in localStorage) {
        if (key.startsWith("friend_request_")) {
          localStorage.removeItem(key);
        }
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const channelA = supabase
    .channel("schema-db-changes")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
      },
      (payload) => {}
    )
    .subscribe();

  return (
    <div className="flex flex-row bg-[#FFFEFB]">
      <div>
        <Sidebar />
      </div>
      <div className="w-screen flex flex-col ">
        <div className="h-10 flex flex-row justify-between items-center my-6 pr-2 pl-[3rem] mb-3">
          <SearchBar className="flex-grow" />
          <div className="flex flex-row ">
            <Icons />
            <div className="top-[0.2rem]">
              <Dropdown />
            </div>
          </div>
        </div>
        <div className="border-b"></div>
        <div className="flex flex-row items-center justify-between pr-10">
          <Title
            default="Welcome Back!"
            titleStyle="flex flex-row m-9 items-center space-x-8 text-[40px] font-Raleway"
            classNameInput="text-[40px] bg-transparent border-b-2 border-indigo-600 focus:outline-none focus:border-transparent focus:ring-0 outline-none border-transparent ring-0 "
            inputEdit="p-1 w-6 h-6 bg-indigo-200 text-indigo-600 rounded-lg cursor-pointer hover:bg-indigo-300"
            editIcon="true"
          />
          <Avatars classy="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" />
        </div>
        <KanbanBoard />
      </div>
    </div>
  );
}
