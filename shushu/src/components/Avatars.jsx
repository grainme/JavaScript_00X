import profile from "../assets/mriwina.jpg";
import { Plus } from "lucide-react";

export function Avatars() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-row items-center space-x-3">
        <Plus className="w-5 h-5 bg-indigo-200 text-indigo-600 rounded-md cursor-pointer" />
      </div>
      <div className="flex ml-5 -space-x-3 items-center">
        <img
          className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
          src={profile}
          alt=""
        />
        <img
          className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
          src={profile}
          alt=""
        />
        <img
          className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
          src={profile}
          alt=""
        />
        <img
          className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
          src={profile}
          alt=""
        />
      </div>
    </div>
  );
}
