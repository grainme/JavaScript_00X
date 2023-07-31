import { useState } from "react";
import { Edit3 } from "lucide-react";

export function Title() {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("Work in progress!");

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    setTitle(e.target.value);
  };

  const handleInputKeyPress = (e) => {
    if (e.key === "Enter") {
      setIsEditing(false);
    }
  };

  return (
    <div className="flex flex-row m-9 items-center space-x-8">
      {isEditing ? (
        <input
          type="text"
          value={title}
          onChange={handleInputChange}
          onKeyPress={handleInputKeyPress}
          className="text-[40px] font-[500] bg-transparent border-b-2 border-indigo-600 focus:outline-none"
        />
      ) : (
        <h1 className="text-[40px] font-[500]">{title}</h1>
      )}
      <Edit3
        className="p-1 w-6 h-6 bg-indigo-200 text-indigo-600 rounded-lg cursor-pointer"
        onClick={handleEditClick}
      />
    </div>
  );
}
