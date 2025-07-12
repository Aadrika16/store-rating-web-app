import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import './index.css';

const ProfilePage = () => {
  const [user, setUser] = useState({ username: '', role: '', userId: '' });

  useEffect(() => {
    const profile = Cookies.get("user_info"); // ✅ Correct usage
    if (profile) {
      setUser(JSON.parse(profile));
    }
  }, []);

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <p><strong>Name:</strong> {user.username}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <p><strong>User ID:</strong> {user.userId}</p>
    </div>
  );
};

export default ProfilePage;
