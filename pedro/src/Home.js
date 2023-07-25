import { AppContext } from "./stateManagement";
import { useContext } from "react";

export function Home() {
  const { userName } = useContext(AppContext);
  return <h1>This is {userName}!</h1>;
}
