import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const ProfileDetail = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://nt-devconnector.onrender.com/api/profile/user/${id}`)
      .then((response) => {
        setProfile(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="text-center text-lg text-gray-600">Loading...</div>;
  }

  if (!profile) {
    return <div className="text-center text-red-500">Profile not found</div>;
  }

  return (
    <div className="w-[800px] mx-auto p-6 bg-white shadow-md rounded-lg">
      <Link to="/" className="text-sm text-gray-600 hover:underline">
        ← Back To Profiles
      </Link>

      <div className="bg-teal-600 text-white p-6 rounded-t-lg text-center">
        <img
          src={profile.user?.avatar || "https://via.placeholder.com/100"}
          alt="User Avatar"
          className="w-24 h-24 rounded-full mx-auto border-4 border-white"
        />
        <h2 className="text-2xl font-bold mt-2">{profile.user?.name || "No Name"}</h2>
        <p>{profile.status} at {profile.company || "Unknown Company"}</p>
        <p>{profile.location || "Location not provided"}</p>
      </div>

      <div className="p-6 border border-gray-300 rounded-b-lg mt-2">
        <h3 className="font-semibold text-lg">Bio</h3>
        <p className="text-gray-600">{profile.bio || "No bio available"}</p>

        <h3 className="mt-4 font-semibold text-lg">Skill Set</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {profile.skills?.map((skill, index) => (
            <span key={index} className="bg-teal-100 text-teal-600 px-2 py-1 text-sm rounded">
              ✔ {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="border p-4">
          <h3 className="font-semibold text-lg">Experience</h3>
          <p className="text-gray-500">
            {profile.experience?.length > 0 ? profile.experience[0].title : "No experience credentials"}
          </p>
        </div>

        <div className="border p-4">
          <h3 className="font-semibold text-lg">Education</h3>
          <p className="text-gray-500">
            {profile.education?.length > 0 ? profile.education[0].school : "No education credentials"}
          </p>
        </div>
      </div>

      {/* GitHub Repos */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-blue-600">GitHub Repos</h3>
        <p className="text-gray-500">Coming soon...</p>
      </div>
    </div>
  );
};

export default ProfileDetail;
