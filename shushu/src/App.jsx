import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { ProfileSetup } from "./components/ProfileSetup";
import { Waitlist } from "./pages/waitlist";
import { Chat } from "./components/Chat";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/work" element={<Dashboard />} />
        <Route path="/setup" element={<ProfileSetup />} />
        <Route path="/waitlist" element={<Waitlist />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
