import axios from "axios";

async function submitUserComment(userCommentData) {
    try {
        const response = await axios.post(
            'http://localhost:8080/movies',
            userCommentData, {
                withCredentials: true,
            }
        );
        console.log("Response:", response);
        if (response.status === 201) {          
            console.log("Saving User Comment");
            return "Success"
        } else {
            return ("User Commenting failed. Please try again");
        }
    } catch (error) {
        return ("An error occurred. Please try again", error);
    }
}

export default submitUserComment;