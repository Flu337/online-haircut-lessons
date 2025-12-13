import React from "react";

const ProfileHeader = () => {
  return (
    <div className="profile-header">
      <img
        src="/img/123.png"
        alt="avatar"
        className="profile-avatar"
      />
      <div className="profile-info">
        <h2 className="profile-name">Профиль</h2>
        
      </div>
    </div>
  );
};

export default ProfileHeader;