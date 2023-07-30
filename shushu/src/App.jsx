import { Sidebar } from "./components/SideBar";
import { SearchBar } from "./SearchBar";
import { Icons } from "./components/Icons";

function App() {
  return (
    <div className="font-poppins flex flex-row bg-[#FFFEFB]">
      <div>
        <Sidebar />
      </div>
      <div className="w-screen">
        <div className="h-10 flex flex-row justify-between items-center my-6 pr-2 pl-[3rem]  border-gray-300 mb-3">
          <SearchBar className="flex-grow" />
          <Icons />
        </div>
        <div className="border-b"></div>
      </div>
    </div>
  );
}

export default App;
