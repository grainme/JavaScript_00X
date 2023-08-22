/* eslint-disable react/prop-types */
import {
  HomeIcon,
  Hourglass,
  KanbanSquare,
  MessageCircle,
  InfoIcon,
  Settings,
  LogOut,
} from "lucide-react";
import logo from "../assets/Logo_Trans_V2.png";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../Client/supabaseClient";

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
  const navigate = useNavigate();

  async function signOut() {
    const { error } = await supabase.auth.signOut().catch(() => {
      console.log(error);
    });

    // Clear the items from LocalStorage
    localStorage.clear();

    navigate("/");
  }

  return (
    <div className="flex flex-row">
      <div className="flex flex-col justify-evenly ">
        <div className=" rounded-lg flex flex-col justify-center items-center">
          <img src={logo} className="h-[3rem] w-[3rem]"></img>
        </div>
        <ul className="mt-7 space-y-7 px-3 py-6">
          <ListItem
            icon={<HomeIcon className="h-[1.6rem] w-[1.6rem] text-[#424242]" />}
            to="/wip"
          />
          <ListItem
            icon={
              <KanbanSquare className="h-[1.6rem] w-[1.6rem] text-[#424242]" />
            }
            to="/work"
          />
          <ListItem
            icon={
              <Hourglass className="h-[1.6rem] w-[1.6rem] text-[#424242]" />
            }
            to="/pomodoro"
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
        <ul className="space-y-7 px-3 py-6 " onClick={signOut}>
          <ListItem
            icon={<LogOut className="h-[1.6rem] w-[1.6rem] text-[#424242] " />}
          />
        </ul>
      </div>
      <div className="w-[.03rem] bg-gray-300 h-[100vh]"></div>
    </div>
  );
}
