import React, { useState } from "react";
import { useAuth } from "../../Services/AuthContext";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Box, Typography, Button } from "@mui/material";
import "./ProfileHeader.css";
import { deleteProfile } from "../../Services/AuthService";


export default function LetterAvatars({ user }) {
  const { updateProfile, deleteProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    username: user.username,
    bio: user.bio || "",
  });

  const getInitials = (name) => {
    const names = name.split(" ");
    return names.map((n) => n[0]).join("").toUpperCase();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      console.log("Saving profile with data:", formData);
      await updateProfile(formData);
      console.log("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Profile update failed:", error.message);
      alert("Failed to update profile.");
    }
  };

  const handleDeleteProfile = async () => {
    try {
      if (user) {
        await deleteProfile();
        console.log("Profile deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting profile:", error.message);
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <Box component="section" className="profile-header-container">
      <div className="poster-heading">
    
      </div>
      <Stack direction="column" alignItems="center" className="profile-header-content">

        <Avatar className="profile-avatar">
          <span className="avatar-initials">
          {getInitials(user.firstname + " " + user.lastname)}
          </span>
          </Avatar>

        {isEditing ? (
          <Stack spacing={1} className="profile-edit-form">
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              placeholder="First Name"
            />
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              placeholder="Last Name"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
            />
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Add a short bio"
              rows={3}
              className="profile-bio-textarea"
            />
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
            <Button variant="text" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
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
          <>
          <div className="profile-buttons-container">
          <Button
            variant="contained"
            className="edit-profile-button"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </Button>

            <Button
              variant="contained"
              sx={{ marginLeft: "auto" }}
              onClick={handleDeleteProfile}
              className="delete-profile-button"
              >
                Delete Profile
            </Button>
          </div>
          </>
        )}
      </Stack>
    </Box>
  );
}
