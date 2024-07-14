import React from "react";

interface ProjectCardProps {
  imageUrl: string;
  title: string;
  username: string;
  userImageUrl: string;
  description: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ imageUrl, title, username, userImageUrl, description }) => {
  return (
    <div className="card bg-base-100 rounded-none shadow-none border border-black">
    <figure>
      <img
        src={userImageUrl}
        alt={`${username}'s profile`} />
    </figure>
    <div className="card-body border-t border-black p-4">
    <div className="flex justify-start items-center gap-1 ">
          <img src={userImageUrl}
            alt={`${username}'s profile`}
            className="w-6 h-6 rounded-full" />
          <span className="font-light text-sm">{username}</span>
        </div>
      <h2 className="font-medium text-2xl m-0">{title}</h2>
      <p className="text-base font-light m-0">{description}</p>
    </div>
    </div>

    /*
    <div className="border border-black p-0">
      <img src={imageUrl} alt={title} className="w-full" />
      <div className="column">
        
        <div className="p-16">
          <h2 className="font-medium text-2xl mb-4">{title}</h2>
          <p className="text-base">{description}</p>
        </div>
      </div>
    </div>
    */
  );
};

export default ProjectCard;