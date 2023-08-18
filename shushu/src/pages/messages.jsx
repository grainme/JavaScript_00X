import { Chat } from "../components/Chat";
import { Sidebar } from "../components/SideBar";
import { SearchBar } from "../components/SearchBar";
import { Icons } from "../components/Icons";
import { Dropdown } from "../components/Dropdown";

export function Messages() {
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

        <Chat />
      </div>
    </div>
  );
}
