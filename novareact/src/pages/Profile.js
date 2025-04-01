import React, { useEffect, useState } from 'react';

function Profile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch('http://localhost:4000/api/profile', {
                    credentials: 'include'
                });
                const data = await res.json();
                if (res.ok) {
                    setUser(data);
                } else {
                    console.error(data.error);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchProfile();
    }, []);

    if (!user) {
        return <div>Please log in to see your profile.</div>;
    }

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Profile</h2>
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
        </div>
    );
}

export default Profile;
