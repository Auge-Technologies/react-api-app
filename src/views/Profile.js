import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

const Profile = () => {
    const { logout } = useAuth0();
    const [skills, setSkills] = useState([]);
    const [roles, setRoles] = useState([]);

    const handleLogoutClick = () => {
        logout();
    };

    const fetchEmployeeSkills = async (employeeId) => {
        try {
            const response = await axios.get(
                `http://localhost:8080/employee/skills/${employeeId}`
            );
            const skillsData = response.data;
            setSkills(skillsData);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchEmployeeRoles = async (employeeId) => {
        try {
            const response = await axios.get(
                `http://localhost:8080/employee/roles/${employeeId}`
            );
            const rolesData = response.data;
            setRoles(rolesData);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        // TODO: use info retained from login
        fetchEmployeeSkills(4);
        fetchEmployeeRoles(4)
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ flex: '1 1 auto' }}>
                <h1>Profile Page</h1>
                <div style={{ display: 'flex' }}>
                    <div>
                        <p>Known skills:</p>
                        <ul>
                            {skills.map((skill) => (
                                <li key={skill.id}>{skill.name}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <p>Roles:</p>
                        <ul>
                            {roles.map((role) => (
                                <li key={role.id}>{role.name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div>
                <button onClick={handleLogoutClick}>Logout</button>
            </div>
        </div>
    );
};

export default Profile;
