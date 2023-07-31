import { Info, Github } from "lucide-react";
import { NotificationDropdown } from "./NotificationDropdown";

export function Icons() {
  return (
    <div className="flex items-center space-x-3">
      <a
        href="./"
        className="text-gray-500 hover:text-gray-900 focus:outline-none"
      >
        <Github className="h-5 w-5" />
      </a>

      <a
        href="./"
        className="text-gray-500 hover:text-gray-900 focus:outline-none"
      >
        <Info className="h-5 w-5" />
      </a>
      <div className="relative top-[0.2rem]">
        {/* Add the relative and top-[X] classes to adjust the position */}
        <NotificationDropdown />
      </div>
    </div>
  );
}
