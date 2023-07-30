import { Bell, Info, Github } from "lucide-react";

export function Icons() {
  return (
    <div className="flex flex-row space-x-3 pr-[3rem]">
      <a href="./">
        <Github className="h-5 w-5" />
      </a>
      <a href="./">
        <Bell className="h-5 w-5" />
      </a>
      <a href="./">
        <Info className="h-5 w-5" />
      </a>
    </div>
  );
}
