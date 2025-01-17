import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../Services/AuthContext";
import ProfileHeader from "./ProfileHeader";
import FavoriteFilms from "./FavoriteFilms";

const Profile = () => {
    const { userId } = useParams();
    const { user, error } = useAuth();

    if (error) return <p>{error}</p>;
    if (!user) return <p>Loading...</p>;

    return (
        <div>
            <ProfileHeader user={user} />
            <FavoriteFilms />
        </div>
    )
};

export default Profile;