import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import Admin from "./views/Admin";
import Home from "./views/Home";
import Dashboard from "./views/Dashboard";
import Profile from "./views/Profile";

function App() {
  return (
    <Router>
      <div className="App">
        {/*<ul>
                     ...your existing navigation links...
                    <li>
                        <Link to="/about">Admin</Link>
                    </li>
                </ul>*/}

        {/* Define the routes */}
        <Routes>
          {<Route path="/login" element={<Home />} />}
          <Route path="/Admin" element={<Admin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Profile />} />
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

export default Auth0App;
