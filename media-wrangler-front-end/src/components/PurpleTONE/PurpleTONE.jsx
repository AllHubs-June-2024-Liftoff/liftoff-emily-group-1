import React from "react";
import "./PurpleTONE.css";

const AboutUs = () => {
    return (
        <>
            <div className="about">
                <h1 className="about-heading">PurpleTONE</h1>
            <div className="about-row">
                <div className="about-column">
                    <div className="about-card">
                        <div className="about-container">
                            <img src="1.jpg" alt="Rachel Burkhardt" className="about-image"/>
                            <h2 className="about-name">Rachel Burkhardt</h2>
                            <p className="about-title">Relational Database</p>
                            <p>Users can review and rate movies</p>
                            <p>Users can leave comments on a review</p>
                            <p>Display movie data in a view for the user</p>
                                <a href="https://www.linkedin.com/in/rachel-burkhardt-097900339/" 
                                   className="about-button linkedin-button" 
                                   target="_blank" 
                                   rel="noopener noreferrer">
                                    Connect on LinkedIn
                                </a>
                        </div>
                    </div>
                </div>

                <div className="about-column">
                    <div className="about-card">
                        <div className="about-container">
                            <img src="4.jpg" alt="Dera Cardozo" className="about-image"/>
                            <h2 className="about-name">Dera Cardozo</h2>
                            <p className="about-title">User Account Creation and Management</p>
                            <p>Users can make an account to track movies they’ve seen/want to see, write their bio, make their own lists, and join in discussions.</p>
                            <p>Users can verify account through email</p>
                            <p>Users can create a calendar of movies they want to see</p>
                                <a href="https://www.linkedin.com/in/dera-cardozo" 
                                   className="about-button linkedin-button" 
                                   target="_blank" 
                                   rel="noopener noreferrer">
                                    Connect on LinkedIn
                                </a>
                        </div>
                    </div>
                </div>

                <div className="about-column">
                    <div className="about-card">
                        <div className="about-container">
                            <img src="2.jpg" alt="Henry Luepke" className="about-image"/>
                            <h2 className="about-name">Henry Luepke</h2>
                            <p className="about-title">External API Usage</p>
                            <p>Use TMDB (TheMovie Database) to fetch movie data</p>
                            <p>User stats page on profile, most liked decade/genre</p>
                            <p>Users can search movie database - filter search results by genre, actor, release year, director.</p>
                            <p>A “pick me a movie” feature that generates a random movie from the database</p>
                                <a href="https://www.linkedin.com/in/henry-luepke/" 
                                   className="about-button linkedin-button" 
                                   target="_blank" 
                                   rel="noopener noreferrer">
                                    Connect on LinkedIn
                                </a>
                        </div>
                    </div>
                </div>

                <div className="about-column">
                    <div className="about-card">
                        <div className="about-container">
                            <img src="3.jpg" alt="Maddy Preston" className="about-image"/>
                            <h2 className="about-name">Maddy Preston</h2>
                            <p className="about-title">Full CRUD Functionality</p>
                            <p>Users can adjust their journal, make lists, and leave reviews</p>
                            <p>Conditional render navigation so that log in and register tabs are displayed for users and then after logging in, profile and log out are displayed</p>
                            <p>Users can view upcoming showtimes in their area</p>
                            <p>Users can view where movies are streaming</p>
                                <a href="https://www.linkedin.com/in/madison-preston-profile/" 
                                   className="about-button linkedin-button" 
                                   target="_blank" 
                                   rel="noopener noreferrer">
                                    Connect on LinkedIn
                                </a>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            
        </>
    );
};

export default AboutUs;
