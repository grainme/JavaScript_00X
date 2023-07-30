import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/App.css";
import { Navbar } from "./components/Navbar";
import { Home } from "./components/Home";
import { Profile } from "./components/Profile";
import { Contact } from "./components/Contact";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <div className="App">
      <QueryClientProvider client={client}>
        <Router>
          <Navbar />
          <Routes>
            <Route element={<Home />} path="/"></Route>
            <Route element={<Profile />} path="/profile"></Route>
            <Route element={<Contact />} path="/contact"></Route>
          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
