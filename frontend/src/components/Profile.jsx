import React, { useEffect, useState } from "react";
import API from "../api/api";

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await API.get("/profile/");
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) return <p className="p-4">Loading profile...</p>;

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <p><strong>ID:</strong> {profile.id}</p>
      <p><strong>Username:</strong> {profile.username}</p>
      <p><strong>Email:</strong> {profile.email}</p>
    </div>
  );
};

export default Profile;
