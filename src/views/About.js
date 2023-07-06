import React from 'react';
import Skill_input from '../components/Skill_input';
import Skill_search from '../components/Skill_search';
import {useAuth0} from "@auth0/auth0-react";

const About = () => {
    const { logout } = useAuth0();

    const handleLogoutClick = () => {
        logout();
    };

    return (
        <div>
            <h1>About Page</h1>
            <Skill_input/>
            <Skill_search/>
            <button onClick={handleLogoutClick}>logout</button>
        </div>
    );
};

export default About;