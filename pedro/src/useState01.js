import { useState } from "react";
import "./App.css";

export function App() {
  const [textColor, setColor] = useState("black");

  return (
    <div className="App">
      <button
        onClick={() => {
          setColor(textColor === "black" ? "red" : "black");
        }}
      >
        Show / Hide
      </button>
      <h3 style={{ color: textColor }}>Hello, World!</h3>
    </div>
  );
}
