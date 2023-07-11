import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import profile_img from '../icons/manage_account.svg';

const Dashboard = () => {
    const { logout } = useAuth0();
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        logout();
    };

    const handleProfileClick = () => {
        navigate('/profile');
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <div>
                <img src={profile_img} alt="profile" onClick={handleProfileClick} style={{ cursor: 'pointer' }} />
            </div>
            <button onClick={handleLogoutClick}>Logout</button>
        </div>
    );
};

export default Dashboard;
