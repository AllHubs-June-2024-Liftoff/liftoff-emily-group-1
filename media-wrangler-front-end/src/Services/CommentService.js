import axios from "axios";

async function submitUserComment(userCommentData) {
  try {
    const response = await axios.post(
      "http://localhost:8080/comments/create",
      userCommentData,
      { withCredentials: true }
    );

    if (response.status === 201) {
      return "Success";
    }
    return "User Comment failed. Please try again.";
  } catch (error) {
    console.error(error);
    return "An error occurred. Please try again.";
  }
}

async function fetchCommentsByMovieReviewId(movieReviewId) {
  try {
    const response = await axios.get(
      `http://localhost:8080/comments/review/${movieReviewId}`,
      { withCredentials: true }
    );

    if (response.status === 200) {
      return response.data;
    }
    return "Review comments not found.";
  } catch (error) {
    console.error(error);
    return "An error occurred. Please try again.";
  }
}

export default { submitUserComment, fetchCommentsByMovieReviewId };
