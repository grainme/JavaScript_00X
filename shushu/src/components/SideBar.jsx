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
import logo from "../assets/Logo_Trans_V2.png";
import { Link } from "react-router-dom";

function ListItem({ icon, to }) {
  return (
    <li>
      <Link
        to={to}
        className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-700"
      >
        {icon}
      </Link>
    </li>
  );
}

export function Sidebar() {
  return (
    <div className="flex h-[100vh] flex-col border-e">
      <div>
        <div className="h-[4.76rem] rounded-lg flex flex-col justify-center items-center">
          <img src={logo} className="h-[3rem] w-[3rem]"></img>
        </div>
        <div className="h-[.8px] bg-gray-300"></div>
      </div>

      <ul className="mt-8 space-y-7 px-3 py-6 font-Bricolage">
        <ListItem
          icon={<HomeIcon className="h-[1.6rem] w-[1.6rem] text-[#424242]" />}
          to="/wip"
        />
        <ListItem
          icon={<Hourglass className="h-[1.6rem] w-[1.6rem] text-[#424242]" />}
          to="/pomodoro"
        />
        <ListItem
          icon={
            <KanbanSquare className="h-[1.6rem] w-[1.6rem] text-[#424242]" />
          }
          to="/work"
        />
        <ListItem
          icon={
            <MessageCircle className="h-[1.6rem] w-[1.6rem] text-[#424242]" />
          }
          to="/chat"
        />
        <ListItem
          icon={<InfoIcon className="h-[1.6rem] w-[1.6rem] text-[#424242]" />}
          to="/wip"
        />
        <ListItem
          icon={<Settings className="h-[1.6rem] w-[1.6rem] text-[#424242]" />}
          to="/wip"
        />
      </ul>
    </div>
  );
}
