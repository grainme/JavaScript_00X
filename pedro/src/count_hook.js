import { useState } from "react";
import "./App.css";

export function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="App">
      <h1>Count : {count}</h1>
      <button onClick={() => {setCount(count+1)}}>Increase</button>
      <button onClick={()=>{setCount(count-1)}}>Decrease</button>
      <button onClick={()=>{setCount(0)}}>Set To Zero</button>
    </div>
  );
}
