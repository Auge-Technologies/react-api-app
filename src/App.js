import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import Home from "./views/Home";
import Dashboard from "./views/Dashboard";
import Profile from "./views/Profile";
import Admin from "./views/Admin";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {<Route path="/" element={<Home />} />}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

function Auth0App() {
  const domain = "auge.eu.auth0.com";
  const clientId = "nwfr9B2bb0IePJjWSKhzp6YgOxTZhwvN";

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>
  );
}

export default App;
