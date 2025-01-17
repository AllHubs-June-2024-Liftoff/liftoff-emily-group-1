import { useState } from "react";
import React from "react";

import 'bulma/css/bulma.min.css';
// import './ReviewForm.css';
import StarRatings from 'react-star-ratings';



function ReviewForm({title, genre, releaseDate, poster, id}) {


  const [dateWatched, setDateWatched] = useState("");
  const [review, setReview] = useState('');
  const [spoiler, setSpoiler] = useState('no');
  const [movieMVP, setMovieMVP] = useState('');
  const [rating, setRating] = useState(0); 
  const [tags, setTags] = useState([]);
  

  
  //This is the tags function. Just splits the string into array elements currently...
  function tagElements(e) {
    let reviewTags = (e.target.value).split(",");
    setTags(reviewTags);

    //if this is how we want to do the tags, I need to trim any whitespaces users could potentially enter
  }
  

  const handleSubmit = (e) => {
      e.preventDefault();

      //There is already a required on the fields, but if we would prefer to have extra info for user we can use these instead...
      if(!dateWatched) {
        alert("You must pick a Date Watched to log in journal.");
        return;
      }

      if(!review){
        alert("Let your peers know what you thought, write your review.");
      }

      //pops up reminding the user must pick a rating 1-5. Without this, if the user leaves blank it will be a 0 rating
      if(rating === 0){
        alert("You must rate the movie.");
        return;
      }

      //This makes sure that the user did not forget to click the spoiler box if there are actually spoilers. User can choose to not submit form and go back and click the box before submission. Or they can continue with submission if there are not any spoilers. 
      if(spoiler === "no") {
        const cancelSubmission = window.confirm("Are you sure there are no spoilers? If so, press ok to continue submitting your review?");

        if(cancelSubmission === false) {
          alert("Canceling the Movie Review Submission");
        return;
        } 
      }

      const movieReview = { dateWatched, review, spoiler, movieMVP, rating, tags, title, genre, id, poster }
      alert("Thank you for your submission!")
      console.log("Submission complete");
      console.log(movieReview);   
           
  }



 
    return (
        <>
          <div className="review-container">

{/* Movie Poster Image */}
            <div className="poster">
              <img src={ poster } ></img>
            </div>

{/* Movie Review Form */}
            <form onSubmit={handleSubmit}>              
              <div className="review-form">
                <div className="content is-normal">
                  <h1>{ title } ({ releaseDate })</h1>
                  
                  <p>{ genre.join(", ") }</p>
                </div>
            
              

{/* Movie Watched Date */}
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Watched </label>
                  </div>  
                  <div className="field-body">
                    <div className="field">
                      <p className="control is-expanded has-icons-left">
                        <input
                          required 
                          className="input is-info" 
                          type="date" 
                          value={ dateWatched }
                          onChange={(e) => setDateWatched(e.target.value)}
                        />
                        <span className="icon is-small is-left">
                          <i className="fas fa-user"></i>
                        </span>
                      </p>
                    </div>
                    <div className="field">
                      <div className="field-label is-normal">
{/* Here is my star rating component */}
                        {/* <StarRating /> */}
                      </div>                        
                    </div>
                  </div>
                </div>

                <br />

{/* NOTE: Could add another Drop down that is for "room for improvement", "missed the mark" or "underwhelming" for when a user didn't favor the movie. OR.... Could add a negative drop down option for the user to pick. Maybe some funny awards for sucking or something--- "what did I just watch?", "Best effort, worst execution", "Most likely to be forgotten", etc .... we can also maybe try to incorporate some funny western/cowboy humor for some of the fields. I did not make it required because I am not even sure if it is asking user too much for the review  */}

{/* User can give MVP award for best aspect of film */}
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Movie MVP:</label>
                  </div>
                  <div className="field-body">
                    <div className="field is-narrow">
                      <div className="control">
                        <div className="select is-warning">
                          <select
                             value={movieMVP} 
                             onChange={(e) => setMovieMVP(e.target.value)} 
                          >
                            <option>Select your MVP </option>
                            <option>Plot/Story Line</option>
                            <option>Character Development</option>
                            <option>Cinematography</option>
                            <option>Soundtrack/Scoring</option>
                            <option>Special Effects</option>
                            <option>Costume and Set Design</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

{/* Contains Spoiler CheckBox */}
                  <div>
                  <label className="checkbox">
                    <input 
                      type="checkbox"
                      value={ spoiler === "yes" }
                      onChange={(e) => setSpoiler(e.target.value)} 
                    />
                    &nbsp; Does Review Contain Spoilers?
                  </label>
                  </div>

                </div>

                <br />

{/* Comments Text Box */}
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Review</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <div className="control">
                        <textarea 
                          required
                          value={ review }
                          className="textarea" 
                          placeholder="Write your thoughts here ..." 
                          rows="10"
                          onChange={(e) => setReview(e.target.value)}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>

                <br />

{/* Add Tags Section -- unfinished */}
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Add Tags</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <div className="control">
                        <input 
                          className="input is-danger" 
                          type="text" 
                          placeholder="tag name here ..." 
                          onChange={tagElements}                       
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <br />

{/* Built in React Star Rating Component */}
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Rating</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <div className="control">
                        <StarRatings
                          rating={ rating }  
                          starRatedColor="teal"  
                          changeRating={(newRating) => setRating(newRating)}  
                          numberOfStars={5}  
                          name="rating"  
                          starDimension="20px"  
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="field is-horizontal">
                  <div className="field-label">
                    {/* <!-- Left empty for spacing --> */}
                    </div>
                    <div className="field-body">
                      <div className="field">
                        <div className="control">
                          <button className="button is-primary">
                            Submit Review
                          </button>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
            </form>
          </div>       
      </>
    );
}

export default ReviewForm;
