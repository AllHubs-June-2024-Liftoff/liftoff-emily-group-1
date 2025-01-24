import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import 'bulma/css/bulma.min.css';
import './ReviewForm.css';
import { submitMovieReview } from "../../Services/MovieReviewService";
import PropTypes from 'prop-types';
import InputTags from "../InteractiveSoloComponents/InputTags";
import { Checkbox, Paper, useStepContext } from "@mui/material";
import RadioButton from '../InteractiveSoloComponents/RadioButton';
import AwardEnum from "../enums/AwardEnum";
import { useAuth } from '../../Services/AuthContext';
import { checkIfUserRatedMovie, fetchMovieRating, submitMovieRating, updateMovieRating } from '../../Services/RatingService';
import Rating from '@mui/material/Rating';


function AwardReviewForm({ title, releaseDate, movieId, posterPath, }) {

  const [dateWatched, setDateWatched] = useState("");
  const [review, setReview] = useState('');
  const [isSpoiler, setSpoiler] = useState(false);
  const [rating, setRating] = useState(0);
  const [rated, setRated] = useState(false);
  const [ratingId, setRatingId] = useState(null);
  const [tags, setTags] = useState([]);
  const [error, setError] = useState("");
  const [award, setAward] = useState(null);
  const [lovedAward, setLovedAward] = useState("");
  const [hatedAward, setHatedAward] = useState("");
  const [isLovedDisabled, setLovedDisabled] = useState(false);
  const [isHatedDisabled, setHatedDisabled] = useState(false);
  const [watchAgain, setWatchAgain] = useState('');
  
  const { user } = useAuth();
  const navigate = useNavigate();

  const userId = user.id;
  console.log("THIS IS THE USER ID: ", userId);
  

  const lovedAwards = Object.values(AwardEnum.loved);
  const hatedAwards = Object.values(AwardEnum.hated);

  const yearReleased = new Date(releaseDate).getFullYear();

  const baseImageURL = "https://image.tmdb.org/t/p/w300";
  const fullPosterURL = `${baseImageURL}${posterPath}`;


  useEffect(() => {
    async function checkRatedStatus() {
      try {
        const ratedStatus = await checkIfUserRatedMovie(movieId, userId);
        setRated(ratedStatus);

        if (ratedStatus) {
          const userRating = await fetchMovieRating(movieId, userId);
          if (userRating) {
            setRating(userRating.rating);
            console.log("User rating now set to :", userRating);
            console.log("extract rating value from rating: ", userRating.rating);
            console.log("Checking if there is rating.id :", userRating.id);
            setRatingId(userRating.id);
            console.log("Now setting the id into ratingId: ", ratingId);
             
           
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


  function handleHatedAward(e){
    setHatedAward(e.target.value);
    setAward(e.target.value);
    setLovedDisabled(true);
    setHatedDisabled(false);
  }

  function handleLovedAward(e){
    setLovedAward(e.target.value);
    setAward(e.target.value);
    setHatedDisabled(true);
    setLovedDisabled(false);    
  }

  function resetAwards() {
    setHatedAward("");
    setLovedAward("")
    setHatedDisabled(false); 
    setLovedDisabled(false); 
  }

  function updateTags(updatedTags) {
    setTags(updatedTags);
  }

  async function handleSubmit(e) {
      e.preventDefault();
     
      if(!dateWatched) {   
        alert("You must pick a date watched to log in your journal.");
        return;
      }
      if(!review){
        alert("Let your peers know what you thought, write your review.");
        return;
      }      
      if(watchAgain === ""){
        alert("Would you watch movie again, pick yes or no...");
        return;
      }
  

      if(isSpoiler === false) {
        const submission = window.confirm("Are you sure there are no spoilers? If so, press ok to continue submitting your review?");
        if(submission === false) {
          alert("Canceling the Movie Review Submission");
        return;
        }
      }

  
      
      const movieReviewData = { 
        dateWatched,
        review,
        isSpoiler,
        rating: {
          movieId: movieId,
          userId: user.id, 
          id: ratingId,
        
        },
        tags,
        title,
        movieId,
        fullPosterURL, 
        watchAgain,
        award,
        yearReleased,
        user,
      }

     
      console.log("Submitting review for:", movieReviewData);
    

      try {
        const responseMessage = await submitMovieReview(movieReviewData); 

        if (responseMessage === "Success") {
          navigate(`/reviews/user/${user.id}`, {
              state: movieReviewData,
          });    
        

        } else {
          setError(responseMessage);
        }
        
      } catch (error) {
          console.error("Unexpected error during movie review submission: ", error);
          setError({error: "An unexpected error occurred. Please try again"})
      }
    };

    return (
        <>       
        <div className="paper-container">
          <Paper 
            elevation={0} 
            sx={{
                maxWidth: 1000, 
                background: "#004d40", 
                margin: "30px", 
                padding: "20px", 
                transform: "scale(.9)", 
                transition: "transform 0.3s, box-shadow 0.3s", 
                "&:hover": {
                    transform: "scale(1.1)", 
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)" 
                }
            }} >
            <div className="review-container">
              <div className="poster">
              <div className="form-header">
                      <h3 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0' }}>
                       <b>{ title }</b> <span style={{ fontSize: '19px', margin: '0', color: "#ff8f00", fontWeight: '100' }}> ({ yearReleased }) </span> 
                      </h3>
                    </div> 
                <img src={ fullPosterURL } ></img>
              </div>
              <form onSubmit={ handleSubmit }>              
                  <div className="review-form">
                    <div className="field is-horizontal">
                      <div className="field-label is-normal">
                        <label htmlFor="dateWatched" className="label">Watched : </label>
                      </div>                  
                      <div className="field-body">
                        <div className="field">
                          <p className="control is-expanded has-icons-left">
                            <input
                              required
                              name="dateWatched"
                              className="input is-primary"
                              type="date"
                              value={ dateWatched }
                              onChange={ (e) => setDateWatched(e.target.value) }
                            />
                            <span className="icon is-small is-left">
                              <i className="fas fa-user"></i>
                            </span>
                          </p>
                        </div>
                        <div className="field-label"></div>
                        <div className="field">
                          <div className="field-label is-normal">
                          <Rating
                              required
                              name="half-rating" 
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
                        </div>
                      </div>
                    </div>                             
                    <div className="field is-grouped is-grouped-centered">
                      <div className="control">
                        <label className="label has-text-centered" htmlFor="loved-award">
                          Loved It Award:
                        </label>
                        <div className="select is-warning">
                          <select
                            id="loved-award"
                            name="loved-award"
                            value={ lovedAward }
                            onChange={ handleLovedAward }
                            disabled={ isLovedDisabled }
                          >
                           
                            <option value="">-- Select an Award --</option>
                            { lovedAwards.map((award) => (
                            <option key={ award.id } value={ award.value } title={ award.description }>
                                { award.icon } { award.label }
                            </option>
                            ))}
                           
                          </select>
                        </div>
                      </div>
                      <button className="is-centered"
                        type="button"
                        title="Click here to reset the awards"
                        onClick={ resetAwards }
                      >
                        <br /><span style={{color: "white"}}>RESET</span>
                        <br /><span style={{fontSize: "25px"}}>🆚</span>
                      </button>                    
                      <div className="control">
                        <label className="label has-text-centered" htmlFor="hated-award">
                          Hated It Award:
                        </label>
                        <div className="select is-warning">
                          <select
                            id="hated-award"
                            name="hated-award"
                            value={ hatedAward }
                            onChange={ handleHatedAward }
                            disabled={ isHatedDisabled }
                          >
                            <option value="">-- Select an Award --</option>
                            { hatedAwards.map((award) => (
                            <option key={ award.id } value={ award.value } title={ award.description }>
                                { award.icon } { award.label }
                            </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>           
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                      <label className="radio-label">
                        Would You Watch This Movie Again?
                        <div className="radio-group">
                          <label className="radio">
                            <RadioButton
                              name="watchAgain"
                              value="yes"
                              checked={ watchAgain === 'yes' }
                              onChange={ (e) => setWatchAgain(e.target.value) }
                            />
                              Yes
                          </label>
                          <label className="radio">
                            <RadioButton
                              name="watchAgain"
                              value="no"
                              checked={ watchAgain === 'no' }
                              onChange={ (e) => setWatchAgain(e.target.value) }
                            />
                              No
                          </label>
                        </div>
                      </label>
                    </div>
                    <div>
                    <div className="field-body">
                        <div className="field">
                          <div className="control">
                            <textarea
                              id="review-comments"
                              required
                              value={ review }
                              className="textarea is-success"
                              placeholder="Write your thoughts here ..."
                              rows="4"
                              onChange={ (e) => setReview(e.target.value) }
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>                  
                    <div className="inline-form" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                      <label className="checkbox" style={{ display: 'flex', alignItems: 'center' }}>
                        <Checkbox 
                          name="isSpoiler" 
                          checked={ isSpoiler } 
                          onChange={ (e) => setSpoiler(e.target.checked) } 
                        />
                          &nbsp; Does Review Contain Spoilers?
                      </label>
                    </div>               
                    <div>                    
                      <InputTags onChange={ updateTags } />
                    </div>                  
                    <br />               
                    <div className="field is-horizontal">                     
                      <div className="field-label"></div>
                      <div className="field-label"></div>
                        <div className="field-body">
                          <div className="field">
                            <div className="control">
                              <button className="button is-warning">Submit Review</button>
                            </div>
                          </div>
                        </div>
                    </div>
                  </div>
                </form>
              </div>  
              </Paper>  
            </div> 
        </>
    );
}
export default AwardReviewForm;

AwardReviewForm.propTypes = {
    movieId: PropTypes.number,
    title: PropTypes.string,
    releaseDate: PropTypes.string,  
    poster: PropTypes.string,
    genre: PropTypes.array
}
