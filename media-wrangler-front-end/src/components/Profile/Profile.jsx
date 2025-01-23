import React from "react";
import { useAuth } from "../../Services/AuthContext";
import ProfileHeader from "./ProfileHeader";
import MovieListTable from "./MovieListTable";
import CalendarPlaceholder from "./Calendar";
import "./Profile.css";

const Profile = () => {
  const { user, error } = useAuth();

  if (error) return <p>{error}</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <div className="profile-body">
      <div className="profile-page">
        <div className="profile-top">
          <div className="profile-header">
            <ProfileHeader user={user} />
          </div>
          <div className="profile-calendar">
            <CalendarPlaceholder user={user} />
          </div>
        </div>
        <div className="profile-middle-bottom">
          <div className="profile-middle">
            <h2>New Section</h2>
            <p>This is the new section next to the movie list.</p>
          </div>
          <div className="profile-bottom">
            <MovieListTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
