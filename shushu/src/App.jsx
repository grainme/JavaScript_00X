import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { ProfileSetup } from "./components/ProfileSetup";
import { Waitlist } from "./pages/waitlist";
import { Messages } from "./pages/messages";
import { Wip } from "./pages/Wip";
import { Pomodoro } from "./pages/Pomodoro";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/work" element={<Dashboard />} />
        <Route path="/setup" element={<ProfileSetup />} />
        <Route path="/waitlist" element={<Waitlist />} />
        <Route path="/chat" element={<Messages />} />
        <Route path="/wip" element={<Wip />} />
        <Route path="/pomodoro" element={<Pomodoro />} />
      </Routes>
    </Router>
  );
}

export default App;
