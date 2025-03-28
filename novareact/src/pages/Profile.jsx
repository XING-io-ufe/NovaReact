import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Profile = () => {
    const { userId, logout } = useAuth();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
                setUserData(response.data);
            } catch (error) {
                console.error('Failed to fetch user data', error);
            }
        };

        if (userId) fetchUser();
    }, [userId]);

    return (
        <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Profile</h2>
            {userData && (
                <div className="space-y-4">
                    <p><span className="font-semibold">Username:</span> {userData.username}</p>
                    <p><span className="font-semibold">Email:</span> {userData.email}</p>
                    <button
                        onClick={logout}
                        className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default Profile;