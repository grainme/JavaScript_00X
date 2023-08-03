/* eslint-disable react/prop-types */
import { useState } from "react";
import { Edit3 } from "lucide-react";

export function Title(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(props.default);

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
    <div className={props.titleStyle}>
      {isEditing ? (
        <input
          type="text"
          value={title}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyPress}
          className={props.classNameInput}
        />
      ) : (
        <div onClick={props.editIcon !== "true" ? handleEditClick : () => {}}>
          {title}
        </div>
      )}
      {props.editIcon === "true" && (
        <Edit3 className={props.inputEdit} onClick={handleEditClick} />
      )}
    </div>
  );
}
