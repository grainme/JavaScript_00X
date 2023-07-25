import { AppContext } from "./stateManagement";
import { useState, useContext } from "react";

export function ChangeProfile() {
  const { setUserName } = useContext(AppContext);
  const [newUserName, setNewUserName] = useState("");

  return (
    <div>
      <input
        placeholder="Add Name here"
        onChange={(event) => {
          setNewUserName(event.target.value);
        }}
        value={newUserName}
      ></input>
      <button
        onClick={() => {
          setUserName(newUserName);
          setNewUserName("");
        }}
      >
        Submit
      </button>
    </div>
  );
}
