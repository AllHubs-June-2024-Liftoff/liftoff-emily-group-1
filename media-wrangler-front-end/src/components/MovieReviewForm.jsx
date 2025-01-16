import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { apiMovieReview } from '../Services/MovieReviewService';

const MovieReviewForm = () => {

    //state variables for the input capture
    const [review, setReview] = useState("");
    const [error, setError] = useState("");

    //handleSubmit function 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(error);

        const movieReviewData = {
            review
        };

        let responseMessage = await apiMovieReview(movieReviewData);

         console.log(responseMessage);
        if (responseMessage === "Success") {
            navigate("/login");
        } else {
            setError(responseMessage);
        }

        console.log("Saving Movie Review ", review);
    };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Review:
        <input 
            name="review"
            type="text" 
            placeholder='Enter something'
            value= { review } 
            onChange={(e) => setReview(e.target.value)}/>
        </label>
            <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default MovieReviewForm




