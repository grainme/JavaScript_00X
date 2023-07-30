import { useState } from "react";
import "./App.css";

function App() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="App">
      <button
        onClick={() => {
          setIsVisible(!isVisible);
        }}
      >
        {isVisible ? "Hide" : "Show"}
      </button>
      {isVisible && <p>Hi There!</p>}
    </div>
  );
}

export default App;
