import React from "react";
// Убираем import "./ProfileHeader.css";

const ProfileHeader = () => {
  return (
    <div className="profile-header">
      <img
        src="/img/{BACC5AFF-C2A9-41A3-B885-9DBF0B6BB2F3}.png"
        alt="avatar"
        className="profile-avatar"
      />
      <div className="profile-info">
        <h2 className="profile-name">Кирилл Иванов</h2>
        <p className="profile-email">kirill@example.com</p>
      </div>
    </div>
  );
};

export default ProfileHeader;