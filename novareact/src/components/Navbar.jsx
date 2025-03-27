import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, token, logout } = useAuth();

    return (
        <nav className="bg-white shadow-lg">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="text-xl font-bold text-indigo-600">E-Commerce</Link>
                <div className="flex space-x-4">
                    <Link to="/" className="px-3 py-2 text-gray-700 hover:text-indigo-600">Home</Link>
                    <Link to="/cart" className="px-3 py-2 text-gray-700 hover:text-indigo-600">Cart</Link>
                    {token ? (
                        <>
                            <Link to="/profile" className="px-3 py-2 text-gray-700 hover:text-indigo-600">Profile</Link>
                            <button onClick={logout} className="px-3 py-2 text-gray-700 hover:text-indigo-600">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="px-3 py-2 text-gray-700 hover:text-indigo-600">Login</Link>
                            <Link to="/register" className="px-3 py-2 text-gray-700 hover:text-indigo-600">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;