import { useAuth } from '../context/AuthContext';

const Profile = () => {
    const { user, logout } = useAuth();

    return (
        <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Profile</h2>
            <div className="space-y-4">
                <div>
                    <h3 className="text-lg font-semibold">User Information</h3>
                    <p className="text-gray-600">User ID: {user?.id}</p>
                </div>
                <button
                    onClick={logout}
                    className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Profile;