import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  Paper,
  Divider,
  TextField,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import PropTypes from "prop-types";
import { useAuth } from "../../Services/AuthContext";
import { useNavigate } from "react-router-dom";
import AvatarHeader from "../Profile/AvatarHeader";

// IMPORTANT: use the default export object from the service to avoid named/default mismatch.
// Make sure your CommentService file does: export default { submitUserComment, fetchCommentsByMovieReviewId };
import CommentService from "../../Services/CommentService.js";

const MovieReviewListCard = ({
  rating,
  award,
  review,
  username,
  firstname,
  lastname,
  title,
  movieReviewId,
  dateWatched,
  isSpoiler,
}) => {
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [userComment, setUserComment] = useState("");
  const [userComments, setUserComments] = useState([]);
  const [error, setError] = useState("");

  const { user } = useAuth();
  const navigate = useNavigate();

  // Fetch existing comments
  useEffect(() => {
    let ignore = false;
    (async () => {
      if (movieReviewId == null) return; // guard
      const data = await CommentService.fetchCommentsByMovieReviewId(movieReviewId);
      if (ignore) return;

      if (Array.isArray(data)) {
        setUserComments(data);
      } else if (typeof data === "string") {
        // service returns an error string on failure
        setError(data);
      } else {
        setError("Failed to load comments.");
      }
    })();
    return () => {
      ignore = true;
    };
  }, [movieReviewId]);

  const handleCommentClick = () => setShowCommentBox((prev) => !prev);
  const handleCommentChange = (e) => setUserComment(e.target.value);

  const handleCancelComment = () => {
    setUserComment("");
    setShowCommentBox(false);
  };

  const handleSaveComment = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to write a comment");
      navigate("/login");
      return; // stop here
    }

    if (!userComment.trim()) {
      alert("You must write a comment or press cancel");
      return;
    }

    if (movieReviewId == null) {
      setError("Cannot post comment: review id is missing.");
      return;
    }

    const userCommentData = {
      userComment,
      userId: user.id,
      movieReviewId,
      username: user.username ?? username, // prefer auth username
    };

    try {
      const responseMessage = await CommentService.submitUserComment(userCommentData);

      if (responseMessage === "Success") {
        const newComment = {
          id: Date.now(), // optimistic UI; BE id will differ
          username: user.username ?? username,
          userComment,
        };
        setUserComments((prev) => [...prev, newComment]);
        setError("");
      } else {
        setError(responseMessage || "Failed to save comment.");
      }
    } catch (err) {
      console.error("Unexpected error during comment submission:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setUserComment("");
      setShowCommentBox(false);
    }
  };

  const formattedDate =
    dateWatched
      ? new Date(dateWatched).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "—";

  return (
    <div>
      <Paper
        elevation={0}
        sx={{
          maxWidth: 1100,
          background: "rgba(249, 79, 0, 0.55)",
          padding: "10px",
          margin: "20px auto",
        }}
      >
        <Card
          sx={{
            maxWidth: 1200,
            marginBottom: 2,
            border: "3px solid rgba(17, 144, 213, 0.93)",
            background: "rgba(19, 19, 20, 0.81)",
          }}
        >
          <CardContent>
            <div className="avatar-username-rating-container ">
              <AvatarHeader firstname={firstname} lastname={lastname} />
              <div className="username-profile-link">{username}</div>
              <Rating name="read-only" value={Number(rating) || 0} precision={0.5} readOnly />
            </div>

            <Divider
              sx={{
                marginBottom: "20px",
                backgroundColor: "white",
                height: "1px",
              }}
            />

            <div className="movie-review-info">
              <Typography sx={{ textAlign: "center" }}>
                Presented {title} with the{" "}
                <span
                  style={{
                    color: "rgba(249, 79, 0, 0.55)",
                    fontSize: "20px",
                    fontWeight: "bold",
                    margin: "5px",
                  }}
                >
                  "{award}"
                </span>{" "}
                Award
              </Typography>

              {isSpoiler && (
                <Typography className="spoiler-alert">
                  <PriorityHighIcon /> Contains Spoilers
                </Typography>
              )}

              <Typography variant="body2">Watched on {formattedDate}</Typography>

              <br />
              <br />

              <Typography variant="body1">{review}</Typography>
            </div>
          </CardContent>

          <Divider
            sx={{
              margin: "15px",
              backgroundColor: "white",
              height: "1px",
            }}
          />

          <div className="comments-section">
            <Typography variant="body2">User Comments :</Typography>
            <br />
            {error && (
              <Typography variant="body2" color="warning.main" sx={{ mb: 1 }}>
                {error}
              </Typography>
            )}
            {userComments.length === 0 ? (
              <Typography variant="body2">No comments. Be the first to comment...</Typography>
            ) : (
              userComments.map((comment) => (
                <div key={comment.id} className="comment-card">
                  <Typography variant="body2">
                    <span
                      style={{
                        color: "rgba(249, 79, 0, 0.55)",
                        fontSize: "20px",
                      }}
                    >
                      <b>{comment.username}</b>
                    </span>{" "}
                    : {comment.userComment}
                  </Typography>
                </div>
              ))
            )}
          </div>

          <CardActions>
            <Button size="small" onClick={handleCommentClick}>
              Comment
            </Button>
          </CardActions>

          {showCommentBox && (
            <CardContent>
              <TextField
                label="Write a comment"
                fullWidth
                multiline
                value={userComment}
                onChange={handleCommentChange}
                sx={{
                  marginBottom: 2,
                  "& .MuiInputBase-root": { color: "white" },
                  "& .MuiInputLabel-root": { color: "white" },
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#ff8f00",
                  },
                }}
              />
              <Button size="small" onClick={handleSaveComment}>
                Save
              </Button>
              <Button size="small" onClick={handleCancelComment}>
                Cancel
              </Button>
            </CardContent>
          )}
        </Card>
      </Paper>
    </div>
  );
};

MovieReviewListCard.propTypes = {
  movieReviewId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // used to fetch comments
  title: PropTypes.string,
  rating: PropTypes.number,
  award: PropTypes.string,
  review: PropTypes.string,
  authorId: PropTypes.number,
  username: PropTypes.string,
  firstname: PropTypes.string,
  lastname: PropTypes.string,
  dateWatched: PropTypes.string, // ISO date string
  isSpoiler: PropTypes.bool,
};

export default MovieReviewListCard;
