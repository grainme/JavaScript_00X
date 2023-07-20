import "./App.css";
import { useState } from "react";

export function App() {
  const [age, setAge] = useState(0);

  const incrementAge = () => {
    setAge(age + 1);
  };

  return (
    <div>
      {age} <button onClick={incrementAge}>Increment Age</button>
    </div>
  );
}
