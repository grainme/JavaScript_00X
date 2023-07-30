import { Search, Settings, BellMinus } from "lucide-react";

export function Navbar() {
  return (
    <div className="flex flex-row flex-wrap items-center justify-center space-x-4 my-6 pr-2 pl-2">
      {/* Logo */}
      <h1 className="text-[27px] font-bold">SHUSHU</h1>

      {/* Search */}
      <div className="relative">
        <label className="block h-9 ml-5">
          <span className="absolute h-9 flex items-center justify-center pl-2">
            <Search className="h-4 w-4 text-gray-800" />
          </span>
          <input
            className="font-shushu h-9 rounded-md py-3 pl-8 placeholder-gray-400 focus:outline-none text-[14px]"
            placeholder="Search project or tags"
            type="text"
          />
        </label>
      </div>

      {/* Navigation Links */}
      <div className="flex space-x-4 text-sm font-normal grow justify-center text-[17.5px]">
        <p>Projects and Tags</p>
        <p>Members</p>
        <p>Performance</p>
        <p>Profile</p>
      </div>

      {/* Icons */}
      <div className="flex items-center space-x-5 mr-5">
        <a href="/settings">
          <Settings className="h-5 w-5" />
        </a>
        <a href="/notifications">
          <BellMinus className="h-5 w-5" />
        </a>
        <a href="/user/profile">
          <img
            className="h-9 w-9 rounded-full"
            src="/src/assets/Mriwina (1).jpg"
            alt="User Profile"
          />
        </a>
      </div>
    </div>
  );
}
