import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JournalReviewCard from "./JournalReviewCard";
import { fetchMovieReview } from "../../Services/MovieReviewService";





export default function DisplayReview() {
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
        <JournalReviewCard {...review} />
        
       
       


        </>
    );
 
}


