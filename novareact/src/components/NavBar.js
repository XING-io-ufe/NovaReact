import React from 'react';
import { Link } from 'react-router-dom';

function NavBar({ isLoggedIn, setIsLoggedIn }) {
    const handleLogout = async () => {
        try {
            const res = await fetch('http://localhost:4000/api/logout', {
                method: 'POST',
                credentials: 'include',
            });
            if (res.ok) {
                alert('Logged out');
                setIsLoggedIn(false);
            } else {
                alert('Failed to log out');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex gap-4">

                {isLoggedIn ? (
                    <>
                        <Link to="/cart">Cart</Link>
                        <Link to="/profile">Profile</Link>
                        <Link to="/">Products</Link>
                        <Link to="/create">Create</Link>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/">Products</Link>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default NavBar;
