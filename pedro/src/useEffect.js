import "./App.css";
import { useEffect } from "react";

export function App() {
  useEffect(() => {
    console.log("Component Mounted!");
  });
  return (
    <div className="App">
      <h1>Hello!</h1>
    </div>
  );
}
