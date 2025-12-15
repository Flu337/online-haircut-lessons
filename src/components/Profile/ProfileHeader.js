import React, { useState, useEffect } from "react";

const ProfileHeader = ({ userName }) => {
  const [avatarSrc, setAvatarSrc] = useState("/img/123.png");

  useEffect(() => {
    if (userName) {
      const savedAvatar = localStorage.getItem(`avatar_${userName}`);
      if (savedAvatar) {
        setAvatarSrc(savedAvatar);
      }
    }
  }, [userName]);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newAvatarSrc = e.target.result;
        setAvatarSrc(newAvatarSrc);
        localStorage.setItem(`avatar_${userName}`, newAvatarSrc);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-header">
      <div className="avatar-section">
        <div className="avatar-container">
          <img
            src={avatarSrc}
            alt="avatar"
            className="profile-avatar"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            style={{ display: 'none' }}
            id="avatar-input"
          />
        </div>
        <label htmlFor="avatar-input" className="change-avatar-btn">
          Сменить аватар профиля
        </label>
      </div>
      <div className="profile-info">
        <h2 className="profile-name">Профиль</h2>

      </div>
    </div>
  );
};

export default ProfileHeader;