import "./App.css";
import Axios from "axios";
import { useState } from "react";

export function App() {
  const [execuse, setExecuse] = useState("");

  const generateExecuse = (type) => {
    Axios.get(`https://excuser-three.vercel.app/v1/excuse/${type}`).then(
      (response) => {
        setExecuse(response.data[0].excuse);
      }
    );
  };

  return (
    <div className="App">
      <h1>Generate Execuse</h1>
      <button
        onClick={() => {
          generateExecuse("party");
        }}
      >
        Party
      </button>
      <button
        onClick={() => {
          generateExecuse("family");
        }}
      >
        Family
      </button>
      <button
        onClick={() => {
          generateExecuse("office");
        }}
      >
        Office
      </button>
      <p>{execuse}</p>
    </div>
  );
}
