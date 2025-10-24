import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup, Box } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useAuth } from '../../Services/AuthContext';
import AddToListMenu from "../InteractiveSoloComponents/AddToListButton";
import { submitMovieLike, removeMovieLike, checkIfUserLikedMovie, fetchLikeCount } from '../../Services/MovieLikeService';
import { submitMovieRating, updateMovieRating, checkIfUserRatedMovie, fetchMovieRating } from '../../Services/RatingService';
import Rating from '@mui/material/Rating';


function InteractionsCard({ movieDetails }) {

    const [rating, setRating] = useState(0);
    const [isLiked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [isRated, setRated] = useState(false);
    const [error, setError] = useState("");
    
    const { user } = useAuth();
    const navigate = useNavigate();

    const movieId = movieDetails.id;
    const userId = user? user.id : null;


    useEffect(() => {
        async function checkLikeStatus() {
            if(!userId){
                return;
            }
            const liked = await checkIfUserLikedMovie(movieId, userId);
            setLiked(liked);
        };
        checkLikeStatus();
    }, [movieId, userId]);


    useEffect(() => {
        async function getLikeCount() {
            const count = await fetchLikeCount(movieId);
            setLikeCount(count);
        };
        getLikeCount();
    }, [movieId]);


    useEffect(() => {
    async function checkRatedStatus() {
        if (!userId){
            return;
        }

        try {
            const ratedStatus = await checkIfUserRatedMovie(movieId, userId);
            setRated(ratedStatus);
    
            if (ratedStatus) {
            const userRating = await fetchMovieRating(movieId, userId);
                if (userRating) {
                    setRating(userRating.rating);
                            
                } else {
                    setError("Could not fetch the rating.");
                }
            }
        } catch (error) {
            console.error("Error checking rating status:", error);
            setError("Error fetching rating status.");
        }
    }
    
        checkRatedStatus();
    }, [movieId, userId]);


    async function handleRatingChange(e) {
        if (!userId) {
            alert("You must be logged in to Rate a movie.");
            navigate("/login");
            return;
        }

        const newRating = parseFloat(e.target.value);
        setRating(newRating);

        const data = {
            movieId,
            userId,
            rating: newRating,
        };

        try {
            const hasRated = await checkIfUserRatedMovie(movieId, userId);

            if (hasRated) {
                const result = await updateMovieRating(data);
                if (result === "Success") {
                    console.log("Successfully updated the rating:", data);
                }
            } else {
                const result = await submitMovieRating(data);
                if (result === "Success") {
                    console.log("Successfully submitted the rating:", data);
                }
            }
        } catch (error) {
            console.error("Error occurred while handling rating:", error);
        }
    }


    async function handleLikeClick() {
        if (!userId) {
            alert("You must be logged in to Like a movie.");
            navigate("/login");
            return;
        }

        setLiked(!isLiked);
        setLikeCount(likeCount + 1);

        const data = {
            movieId,
            userId,
        }

        try {
            if (!isLiked) {
                const result = await submitMovieLike(data);
                if (result === "Success") {
                    console.log("Success liking the movie:", result);
                    setLiked(true);
                    setLikeCount(likeCount + 1);
                }
            } else {
                const result = await removeMovieLike(movieId, userId);
                if (result === "Success") {
                    console.log("Success removing the like movie:", result);
                    setLiked(false);
                    setLikeCount(likeCount - 1);
                }
            }
        } catch (error) {
            console.error("An error occurred:", error);
            setLiked(!isLiked);
            setLikeCount(isLiked ? likeCount + 1 : likeCount - 1);
        }
    }


    function handleWriteReviewClick() {
        if(!userId) {
            alert("You must be logged in to write a review");
            navigate('/login');
        } else {
            navigate("/reviews/create", {
                state: { movieDetails, user}
            });
        }

    }


    function handleJournalClick() {
        if(!userId) {
            alert("You must be logged in to visit your journal");
            navigate('/login');
        }
        navigate(`/reviews/user/${user.id}`, {
            state: { user }

        });
    }
      
    
    const buttons = [
        <Button key="one" className="button-container">
            <div className="button-content">
                <span className="button-label">Rate</span>
                <Rating
                    name="half-rating" 
                    title={ movieDetails.title }
                    value={ rating }
                    precision={0.5} 
                    onChange={ handleRatingChange }
                    sx={{
                        '& .MuiRating-iconFilled': {
                            color: '#ff9800',
                        },
                        '& .MuiRating-iconEmpty': {
                            color: '#e0e0e0',
                        },
                        '& .MuiRating-iconHover': {
                            color: '#ffcc00',
                        },
                    }}
                />
            </div>
        </Button>,
        <Button 
            key="two" 
            className="button-container"
            name="like-button"
            title={ movieDetails.title }
            value={ isLiked }                    
            onClick={ handleLikeClick }
        > 
            <div className="button-content">
               <FavoriteIcon sx={{ fontSize: '40px', color: isLiked ? 'red' : 'gray', transition: 'color 0.3s',  }} /> 
               <br />
               <span className="button-label">Likes { likeCount }</span>                
            </div>
        </Button>,
        <Button 
            key="three" 
            className="button-container"
            name="write-review"
            title={ movieDetails.title }
            onClick={ handleWriteReviewClick } 
        >
            <div className="button-content">
                <span className="button-label">Write Review</span>   
            </div>
        </Button>,
        <Button key="four" className="button-container">
            <div className="button-content">
                <AddToListMenu movieId={movieDetails.id} />
            </div>
        </Button>,
        <Button 
            key="five" 
            className="button-container"
            name="route-to-journal"
            onClick={ handleJournalClick }
        >
            <div className="button-content">
                <span className="button-label">Your Journal</span>
            </div>
        </Button>
    ];
    
    return (
      <div >
        <Box 
        sx={{
            display: 'flex',
            '& > *': {
            m: 1,
            },
        }}
        >      
            <ButtonGroup
                orientation="vertical"
                aria-label="Vertical button group"
                sx={{
                    backgroundColor: "rgba(19, 19, 20, 0.81)",  
                    borderRadius: '8px',   
                    border: "3px solid rgba(17, 144, 213, 0.93)"      
                }}
            >
                {buttons}
            </ButtonGroup>
        </Box>
    </div>
  );
}

export default InteractionsCard;


InteractionsCard.propTypes = {
    movieDetails: PropTypes.object
}