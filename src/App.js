import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import About from './views/About';
import Home from './views/Home';

function App() {
    return (
        <Router>
            <div className="App">
                {/*<ul>
                     ...your existing navigation links...
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                </ul>*/}

                {/* Define the routes */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </div>
        </Router>
    );
}

function Auth0App() {
    const domain = 'auge.eu.auth0.com';
    const clientId = 'nwfr9B2bb0IePJjWSKhzp6YgOxTZhwvN';

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
