import React from "react";
import JournalReviewCard from "./JournalReviewCard";
import { useLocation } from "react-router-dom";



//NOTE: The DisplayReview Page is rendering @localhost:5173/reviews/view  <--- the state of the movie review object
//      is passed to DisplayReview.jsx and handed down to the JournalReviewCard.jsx to show the user that their submission was a success.


export default function DisplayReview() {

return(
    <h1>Your review submission was a success. Thank You!</h1>
);
}