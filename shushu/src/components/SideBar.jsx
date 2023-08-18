/* eslint-disable react/prop-types */
import {
  HomeIcon,
  Hourglass,
  KanbanSquare,
  MessageCircle,
  InfoIcon,
  Settings,
  BookOpen,
} from "lucide-react";
import { Link } from "react-router-dom";

function ListItem({ icon, text, to }) {
  return (
    <li>
      <Link
        to={to}
        className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-700"
      >
        <div className="flex flex-row items-center space-x-3">
          {icon}
          <div className="text-[#787486]">{text}</div>
        </div>
      </Link>
    </li>
  );
}

export function Sidebar() {
  return (
    <div className="flex h-[100vh] flex-col justify-between border-e">
      <div className="py-6">
        <div className="h-10 place-content-center rounded-lg ">
          <div className="text-2xl font-semibold font-clash px-4 pb-5">
            PomodoroKai
          </div>
          <div className="h-[.8px] bg-gray-300"></div>
        </div>
        <ul className="mt-8 space-y-1 px-4 py-6 font-Bricolage">
          <ListItem
            icon={<HomeIcon className="h-5 w-5 text-[#787486]" />}
            text="Home"
            to="/work"
          />
          <ListItem
            icon={<Hourglass className="h-5 w-5 text-[#787486]" />}
            text="Pomodoro"
            to="/"
          />
          <ListItem
            icon={<KanbanSquare className="h-5 w-5 text-[#787486]" />}
            text="Kanban"
            to="/"
          />
          <ListItem
            icon={<MessageCircle className="h-5 w-5 text-[#787486]" />}
            text="Messages"
            to="/chat"
          />
          <ListItem
            icon={<InfoIcon className="h-5 w-5 text-[#787486]" />}
            text="About"
            to="/"
          />
          <ListItem
            icon={<Settings className="h-5 w-5 text-[#787486]" />}
            text="Support"
            to="/"
          />
        </ul>
      </div>
    </div>
  );
}
