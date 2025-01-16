import axios from "axios";

async function submitMovieReview(movieReviewData) {
    try {
        const response = await axios.post(
            'http://localhost:8080/reviews/create',
            movieReviewData, {
                withCredentials: true,
            }
        );
        console.log("Response:", response);
        if (response.status === 201) {          
            console.log("Saving Movie Review");
            return "Success"
        } else {
            return ("Movie Review Submission failed. Please try again");
        }
    } catch (error) {
        return ("An error occurred. Please try again", error);
    }
}



async function fetchMovieReview(id) {
    try {
        const response = await axios.get(`http://localhost:8080/reviews/view/${id}`, { withCredentials: true });


        if (response.status === 200) {
            const reviewData = response.data;
            console.log('Review data:', reviewData);
            return reviewData;
        } else {
            return "Review not found or error occurred. Please try again";
        }
    } catch (error) {
        console.log("Error: ", error);
        return "An error occurred. Please try again";
    }

};

export { submitMovieReview, fetchMovieReview };

