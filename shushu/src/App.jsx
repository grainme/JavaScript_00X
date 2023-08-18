import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { ProfileSetup } from "./components/ProfileSetup";
import { Waitlist } from "./pages/waitlist";
import { Messages } from "./pages/messages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/work" element={<Dashboard />} />
        <Route path="/setup" element={<ProfileSetup />} />
        <Route path="/waitlist" element={<Waitlist />} />
        <Route path="/chat" element={<Messages />} />
      </Routes>
    </Router>
  );
}

export default App;
