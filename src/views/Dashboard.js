import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import profile_img from '../icons/manage_account.svg';

const Dashboard = () => {
    const { logout } = useAuth0();
    const navigate = useNavigate();
    const [employeeGoals, setEmployeeGoals] = useState([]);
    const { isAuthenticated, user } = useAuth0();
    const [userId, setUserId] = useState();

    const handleLogoutClick = () => {
        logout();
    };

    useEffect(() => {
        let parts = user.sub.split("|");
        let numberString = parts[1];
        setUserId(numberString);
    }, [user]);

    const handleProfileClick = () => {
        navigate('/profile');
    };

    const handleToggleSkills = (goalId) => {
        setEmployeeGoals((prevGoals) => {
            return prevGoals.map((prevGoal) => {
                if (prevGoal.id === goalId) {
                    return {
                        ...prevGoal,
                        showSkills: !prevGoal.showSkills
                    };
                }
                return prevGoal;
            });
        });
    };

    useEffect(() => {
        const fetchEmployeeGoals = async () => {
            try {
                const response = await fetch(`http://localhost:8080/employee/goals/${userId}`);
                const data = await response.json();
                setEmployeeGoals(data);
            } catch (error) {
                console.log("Error fetching employee goals:", error);
            }
        };

        fetchEmployeeGoals();
    }, [userId]);

    return (
        <div>
            <h1>Dashboard</h1>
            <div>
                <img src={profile_img} alt="profile" onClick={handleProfileClick} style={{ cursor: 'pointer' }} />
            </div>
            <button onClick={handleLogoutClick}>Logout</button>

            <h2>Employee Goals:</h2>
            {employeeGoals.length > 0 ? (
                <ul>
                    {employeeGoals.map((goal) => (
                        <li key={goal.id}>
                            {goal.name}
                            <button onClick={() => handleToggleSkills(goal.id)}>
                                {goal.showSkills ? 'Hide Details' : 'Show Details'}
                            </button>
                            {goal.showSkills && (
                                <ul>
                                    {goal.relevantSkills.map((skill, index) => (
                                        <li key={index}>{skill.name}</li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No employee goals found.</p>
            )}
        </div>
    );
};

export default Dashboard;
