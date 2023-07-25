import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./Home";
import { Profile } from "./Profile";
import { Contact } from "./Contact";
import { Navbar } from "./Navbar";
import { useState, createContext } from "react";

export const AppContext = createContext();

export function App() {
  const [userName, setUserName] = useState("Marouane");
  return (
    <AppContext.Provider value={{ userName, setUserName }}>
      <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/profile"
              element={
                <Profile userName={userName} setUserName={setUserName} />
              }
            />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Router>
      </div>
    </AppContext.Provider>
  );
}
