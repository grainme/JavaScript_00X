import { ChangeProfile } from "./ChangeProfile";
import { AppContext } from "./stateManagement";
import { useContext } from "react";

export function Profile() {
  const { userName, setUserName } = useContext(AppContext);

  return (
    <div>
      <h1>This is {userName} page!</h1>
      <ChangeProfile setUserName={setUserName} />
    </div>
  );
}
