import React, { useState, useEffect } from "react";
import { useAuth } from "../../Services/AuthContext";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Box, Typography, Button } from "@mui/material";
import "./ProfileHeader.css";

export default function ProfileHeader() {
  const { user, updateProfile, deleteProfile } = useAuth(); 
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: user?.id ?? "",
    firstname: user?.firstname ?? "",
    lastname: user?.lastname ?? "",
    email: user?.email ?? "",
    username: user?.username ?? "",
    bio: user?.bio ?? "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        id: user.id,
        firstname: user.firstname ?? "",
        lastname: user.lastname ?? "",
        email: user.email ?? "",
        username: user.username ?? "",
        bio: user.bio ?? "",
      });
    }
  }, [user]);

  const getInitials = (first, last) =>
    [first, last].filter(Boolean).map(n => n[0]).join("").toUpperCase();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await updateProfile(formData); 
      setIsEditing(false);
    } catch (err) {
      console.error("Profile update failed:", err);
      alert("Failed to update profile.");
    }
  };

  const handleDeleteProfile = async () => {
    try {
      await deleteProfile(); 
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <Box component="section" className="profile-header-container">
      <Stack direction="column" alignItems="center" className="profile-header-content">
        <Avatar className="profile-avatar">
          <span className="avatar-initials">
            {getInitials(user.firstname, user.lastname)}
          </span>
        </Avatar>

        {isEditing ? (
          <Stack spacing={1} className="profile-edit-form">
            <input name="firstname" value={formData.firstname} onChange={handleChange} placeholder="First Name" />
            <input name="lastname" value={formData.lastname} onChange={handleChange} placeholder="Last Name" />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
            <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Add a short bio"
              rows={3}
              className="profile-bio-textarea"
            />
            <Button variant="contained" onClick={handleSave}>Save</Button>
            <Button variant="text" onClick={() => setIsEditing(false)}>Cancel</Button>
          </Stack>
        ) : (
          <Stack className="profile-view-content">
            <Typography variant="h6">{user.username}</Typography>
            <Typography>{`${user.firstname} ${user.lastname}`}</Typography>
            <Typography>{user.email}</Typography>
            <Typography className="profile-bio">{user.bio || "No bio available"}</Typography>
          </Stack>
        )}

        {!isEditing && (
          <div className="profile-buttons-container">
            <Button variant="contained" className="edit-profile-button" onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
            <Button variant="contained" className="delete-profile-button" onClick={handleDeleteProfile}>
              Delete Profile
            </Button>
          </div>
        )}
      </Stack>
    </Box>
  );
}
