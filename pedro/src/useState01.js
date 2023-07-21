import { useState } from "react";
import "./App.css";

export function App() {
  const [textColor, setTextColor] = useState("black");

  const changeColor = () => {
    setTextColor(textColor === "black" ? "red" : "black");
  };

  return (
    <div className="App">
      <button onClick={changeColor}>Change Color</button>
      <h1 style={{ color: textColor }}>Let's learn Hooks!</h1>
    </div>
  );
}

// Add some text
// Add some button
// When clicked, change the color
// use useState
