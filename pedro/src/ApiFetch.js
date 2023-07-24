import "./App.css";
import Axios from "axios";
import { useEffect, useState } from "react";

export function App() {
  const [predictAge, setpredictAge] = useState({ name: "", age: 0 });
  const [personName, setPersonName] = useState("");

  const fetchCat = () => {
    Axios.get(`https://api.agify.io/?name=${personName}`)
      .then((res) => {
        setpredictAge({ name: res.data.name, age: res.data.age });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchCat();
  }, []);

  const handleInputChange = (event) => {
    setPersonName(event.target.value);
  };

  return (
    <div className="App">
      <input
        onChange={handleInputChange}
        placeholder="What's the Name?"
      ></input>
      <button onClick={fetchCat}>Predict Age</button>
      <p>
        Predicted Age of {predictAge?.name} : {predictAge?.age}
      </p>
    </div>
  );
}

// if we don't use useEffect the api calls will run forever!!
