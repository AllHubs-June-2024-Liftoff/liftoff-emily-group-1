import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JournalReviewCard from "./JournalReviewCard";
import { fetchMovieReview } from "../../Services/MovieReviewService";





export default function JournalDisplayReview() {
    const { id } = useParams();
    const [review, setReview] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        async function fetchData() {
            const data = await fetchMovieReview(id);
            setReview(data);
            setLoading(false);
        };
        fetchData();
    }, [id]);


    if (loading) {
        return <p>Loading review...</p>;
    }


    if (!review) {
        alert("No review was found.");
    }




    return (
        <>
            <h1>Movie Review:</h1>
            <JournalReviewCard 
                title = { review.title }
                fullPosterURL = { review.fullPosterURL }
                watchAgain = { review.watchAgain }
                tags = { review.tags }
                rating = { review.rating }
                isSpoiler = { review.isSpoiler }
                review = { review.review }
                dateWatched = { review.dateWatched }
                award = { review.award }
                yearReleased = { review.yearReleased }
            />
             
        </>
    );
 
}


