import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { ProfileSetup } from "./components/ProfileSetup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/work" element={<Dashboard />} />
        <Route path="/Setup" element={<ProfileSetup />} />
      </Routes>
    </Router>
  );
}

export default App;
