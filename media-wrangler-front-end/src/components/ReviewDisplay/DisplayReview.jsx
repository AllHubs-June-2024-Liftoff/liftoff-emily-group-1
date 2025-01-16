import React from "react";
import JournalReviewCard from "./JournalReviewCard";
import { useLocation } from "react-router-dom";



//NOTE: The DisplayReview Page is rendering @localhost:5173/reviews/view  <--- the state of the movie review object
//is passed to DisplayReview.jsx and handed down to the ReviewCard.jsx to show the user that their submission was a success.


export default function DisplayReview() {

//use location to pass the MovieReview object the user created and passing it to the ReviewCard Component
    const location = useLocation();

//log to console to see if the state is the object or if it is null
    console.log("location state ", location.state);

//we are going to set the movieReviewDate to location state or it will return an empty object...
    const { dateWatched, review, isSpoiler, rating, tags, title, genre, movieId, poster, watchAgain } = location.state || {};


    return (
        <>
            <h1> Movie review will display here...</h1>

            {title && movieId && poster&& genre && watchAgain && tags && rating && isSpoiler && review && dateWatched && (
                <JournalReviewCard 
                    movieId={ movieId } 
                    title={ title } 
                    poster={ poster }                    
                    genre={ genre }
                    watchAgain={ watchAgain }
                    tags={ tags }
                    rating={ rating }
                    isSpoiler={ isSpoiler }
                    review={ review }
                    dateWatched={ dateWatched }
                />
            )}               
        </>
    );
}


