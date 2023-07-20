import { useState } from "react";
import "./App.css";

export function App() {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div className="App">
      <input type="text" onChange={handleInputChange}></input>
      <h1>{inputValue}</h1>
    </div>
  );
}
