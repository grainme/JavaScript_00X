import { UploadCloud, Send } from "lucide-react";

export function ChatInterface() {
  return (
    <div className="flex flex-col h-[87vh] m-4">
      <div className="flex-1">Hello, World</div>
      <div className="mt-6">
        <div className="flex items-center p-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 p-1 outline-none rounded-lg"
          />
          <UploadCloud
            className="text-gray-500 ml-2 cursor-pointer"
            size={20}
          />
          <Send className="text-blue-500 ml-2 cursor-pointer" size={20} />
        </div>
      </div>
    </div>
  );
}
