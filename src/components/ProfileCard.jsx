
import React from "react";
import { NavLink } from "react-router-dom";

const ProfileCard = ({ profile }) => {
  return (
    <div className="flex items-center bg-gray-100 border rounded-lg p-4 shadow-sm">
      <img
        src={profile.user?.avatar || "https://via.placeholder.com/100"}
        alt="User Avatar"
        className="w-20 h-20 rounded-full border mr-4"
      />

      <div className="flex-1">
        <h3 className="text-xl font-semibold text-gray-800">{profile.user?.name || "No Name"}</h3>
        <p className="text-gray-600">{profile.status} at {profile.company || "Unknown Company"}</p>
        <p className="text-gray-500">{profile.location || "Location not provided"}</p>

        <div className="mt-2">
          {profile.skills?.slice(0, 3).map((skill, index) => (
            <span key={index} className="inline-block bg-teal-100 text-teal-600 px-2 py-1 text-sm rounded mr-2">
              ✔ {skill}
            </span>
          ))}
        </div>

        <NavLink to={`/profile/${profile.user?._id}`} className="mt-3 inline-block bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600">
          View Profile
        </NavLink>
      </div>
    </div>
  );
};

export default ProfileCard;
