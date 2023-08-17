/* eslint-disable no-unused-vars */
import { Sidebar } from "../components/SideBar";
import profile from "../assets/mriwina.jpg";
import { Member } from "./TeamMember";
import { ChatDrop } from "./ChatDropdown";
import { MessageCircle, PlusIcon, Search, Upload } from "lucide-react";
import { ChatMessage } from "./ChatMessage";
import { ChatInterface } from "./ChatInterface";

export function Chat() {
  return (
    <div className="font-Raleway flex flex-row bg-[#FFFEFB]">
      <div>
        <Sidebar />
      </div>
      <div className="flex flex-row w-screen">
        <div className="w-1/4">
          <div className="flex flex-row m-4">
            <h2 className="grow">Messages</h2>
            <PlusIcon />
          </div>
          <div className="flex flex-row items-center m-3 gap-3">
            <span className="absolute h-9 flex items-center justify-center pl-2">
              <Search className="h-4 w-4 text-gray-800" />
            </span>
            <input
              className="h-9 py-3 pl-8 bg-gray-100 rounded-lg w-[270px] placeholder-gray-400 focus:outline-none focus:border-transparent focus:ring-0 outline-none border-transparent ring-0 text-[14px]"
              placeholder="Search a message"
              type="text"
            />
          </div>
          {/* chat Messages */}
          <div className="m-4">
            <ChatMessage
              image={profile}
              name="Marouane Boufarouj"
              LastMessage="haha that's cool :)"
            />
          </div>
        </div>
        <div className="w-[1px] opacity-10 bg-slate-600"></div>
        <div className="w-1/2">
          <div className="flex flex-row m-4">
            <ChatMessage
              image={profile}
              name="Marouane Boufarouj"
              LastMessage="Online"
            />
          </div>

          {/* chat inputs */}
          <ChatInterface />
        </div>
        <div className="w-[1px] opacity-10 bg-slate-600"></div>
        <div className="w-1/4">
          <div className="flex flex-row m-4">
            <h2 className="grow">Directory</h2>
            <ChatDrop />
          </div>
          <div className="flex flex-row items-center m-3 gap-3">
            <div className="text-[14px] font-medium">Team Members</div>
            <div className="flex flex-row w-5 h-5 items-center justify-center text-slate-700 font-bold text-[12px] rounded-full bg-slate-200">
              <div>6</div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Member image={profile} name="Marouane Boufarouj" job="Indie Dev" />
            <Member image={profile} name="Marouane Boufarouj" job="Indie Dev" />
            <Member image={profile} name="Marouane Boufarouj" job="Indie Dev" />
            <Member image={profile} name="Marouane Boufarouj" job="Indie Dev" />
            <Member image={profile} name="Marouane Boufarouj" job="Indie Dev" />
            <Member image={profile} name="Marouane Boufarouj" job="Indie Dev" />
          </div>
        </div>
      </div>
    </div>
  );
}
