import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./components/Login1";
import { Dashboard } from "./components/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/work" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
