import { Search } from "lucide-react";

export function SearchBar() {
  return (
    <div>
      {/* Search */}
      <div className="relative">
        <label className="block ml-59">
          <span className="absolute h-9 flex items-center justify-center pl-2">
            <Search className="h-4 w-4 text-gray-800" />
          </span>
          <input
            className="h-9 py-3 pl-8  bg-gray-100 rounded-lg w-[270px] placeholder-gray-400 focus:outline-none focus:border-transparent focus:ring-0 outline-none border-transparent ring-0 text-[14px]"
            placeholder="Search project or tags..."
            type="text"
          />
        </label>
      </div>
    </div>
  );
}
