import React from "react";

interface UserTagProps {
  username: string;
  profileImage: string;
}

const UserTag: React.FC<UserTagProps> = ({ username, profileImage }) => {
  return (
    <a
      href="/profile"
      className="inline-flex items-center bg-white rounded-full p-[2px] shadow-md hover:shadow-lg transition-shadow duration-300 gap-2"
    >
      <img
        src={profileImage}
        alt={`${username}'s profile`}
        className="w-8 h-8 rounded-full"
      />
      <span className="text-gray-800 font-light mr-2">{username}</span>
    </a>
  );
};

export default UserTag;