import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfileCard from "./ProfileCard";

const Profiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://nt-devconnector.onrender.com/api/profile")
      .then((response) => {
        setProfiles(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching profiles:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center text-lg text-gray-600">Loading...</div>;
  }

  return (
    <div className="w-[1000px] mx-auto p-6">
      <h2 className="text-3xl font-bold text-teal-600 mb-4">Developers</h2>
      <p className="text-gray-600 mb-6">⚡ Browse and connect with developers</p>

      <div className="space-y-6">
        {profiles.length === 0 ? (
          <p className="text-center text-gray-500">No profiles found.</p>
        ) : (
          profiles.map((profile) => <ProfileCard key={profile._id} profile={profile} />)
        )}
      </div>
    </div>
  );
};

export default Profiles;
