/* eslint-disable react/prop-types */
import {
  HomeIcon,
  Hourglass,
  KanbanSquare,
  MessageCircle,
  InfoIcon,
  Settings,
} from "lucide-react";

// Reusable ListItem component
function ListItem({ icon, text }) {
  return (
    <li>
      <a
        href="#"
        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
      >
        <div className="flex flex-row items-center space-x-3">
          {icon}
          <div className="text-[#787486]">{text}</div>
        </div>
      </a>
    </li>
  );
}

export function Sidebar() {
  return (
    <div className="flex h-screen flex-col justify-between border-e">
      <div className="px-4 py-6">
        <span className="grid h-10 place-content-center rounded-lg">
          <h1 className="text-2xl font-semibold font-clash">PomodoroKai</h1>
        </span>

        <ul className="mt-8 space-y-1">
          <ListItem
            icon={<HomeIcon className="h-5 w-5 text-[#787486]" />}
            text="Home"
          />
          <ListItem
            icon={<Hourglass className="h-5 w-5 text-[#787486]" />}
            text="Pomodoro"
          />
          <ListItem
            icon={<KanbanSquare className="h-5 w-5 text-[#787486]" />}
            text="Kanban"
          />
          <ListItem
            icon={<MessageCircle className="h-5 w-5 text-[#787486]" />}
            text="Messages"
          />
          <ListItem
            icon={<InfoIcon className="h-5 w-5 text-[#787486]" />}
            text="About"
          />
          <ListItem
            icon={<Settings className="h-5 w-5 text-[#787486]" />}
            text="Settings"
          />
        </ul>
      </div>

      <section className="w-[15rem] mx-auto mb-3 space-y-7 h-[16rem] rounded-3xl bg-gray-100 p-4 flex flex-col justify-center items-center">
        <h1 className="text-lg font-semibold">Thoughts Time</h1>
        <p className="text-center text-sm">
          We don’t have any notice for you, till then you can share your
          thoughts with your peers.
        </p>
        <button className="bg-white p-3 rounded-xl text-lg font-semibold">
          Write a message
        </button>
      </section>
    </div>
  );
}