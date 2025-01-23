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



async function fetchMovieReviewsByUser(userId) {
    try {
        const response = await axios.get(`http://localhost:8080/reviews/user/${userId}`, { withCredentials: true });


        if (response.status === 200) {
            const userReviewList = response.data;
            console.log('User Review List: ', userReviewList);
            return userReviewList;
        } else {
            return "User Reviews not found or error occurred. Please try again";
        }
    } catch (error) {
        console.log("Error: ", error);
        return "An error occurred. Please try again";
    }

};



const fetchMovieDetails = async () => {
    try {
        const response = await fetch(`http://localhost:8080/api/movies/${id}`);
        
       
        console.log('Response:', response);
        
        //was having some weird warnings and couldn't get the data as a json, so I did text instead
        const textResponse = await response.text();
        console.log('Raw Response Body:', textResponse);

        if (response.ok) {
            const movieDetails = JSON.parse(textResponse); 
            console.log('Movie Details:', movieDetails);
            return movieDetails;
        } else {
            console.error('Failed to fetch movie details from the backend.');
        }
    } catch (error) {
        console.error('Error fetching movie details:', error);
    }
};

export { submitMovieReview, fetchMovieReview, fetchMovieReviewsByUser, fetchMovieDetails };

