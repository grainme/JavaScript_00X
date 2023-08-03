import { Sidebar } from "./components/SideBar";
import { SearchBar } from "./components/SearchBar";
import { Icons } from "./components/Icons";
import { Dropdown } from "./components/Dropdown";
import { Title } from "./components/Title";
import { Avatars } from "./components/Avatars";
import { KanbanBoard } from "./components/Kanban";

function App() {
  return (
    <div className="font-grotesk flex flex-row bg-[#FFFEFB]">
      <div>
        <Sidebar />
      </div>
      <div className="w-screen">
        <div className="h-10 flex flex-row justify-between items-center my-6 pr-2 pl-[3rem]  border-gray-300 mb-3">
          <SearchBar className="flex-grow" />
          <div className="flex flex-row ">
            <Icons />
            <div className="top-[0.2rem]">
              <Dropdown />
            </div>
          </div>
        </div>
        <div className="border-b"></div>
        <div className="flex flex-row items-center justify-between pr-10">
          <Title
            default="Work in progress"
            titleStyle="flex flex-row m-9 font-grotesk items-center space-x-8 text-[40px] font-[500]"
            classNameInput="text-[40px] font-[500] bg-transparent border-b-2  border-indigo-600 focus:outline-none"
            inputEdit="p-1 w-6 h-6 bg-indigo-200 text-indigo-600 rounded-lg cursor-pointer"
            editIcon="true"
          />
          <Avatars />
        </div>
        <KanbanBoard />
      </div>
    </div>
  );
}

export default App;
