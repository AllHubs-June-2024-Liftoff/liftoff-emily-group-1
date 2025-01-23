import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieDetailCard from "./MovieDetailCard";
import StreamingProviders from "./StreamingProviders";

function MovieDetailsPage() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    
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
                setMovieDetails(movieDetails);
            } else {
                console.error('Failed to fetch movie details from the backend.');
            }
        } catch (error) {
            console.error('Error fetching movie details:', error);
        }
    };
    
    fetchMovieDetails();
    }, [id]);


   
    const fetchReviews = async () => {
      const response = await fetch(`/api/reviews?movieId=${id}`);
      const data = await response.json();
      setReviews(data);
    };

   
    fetchReviews();


  return (
    <div>
      {movieDetails && (
        <div>
            <MovieDetailCard movieDetails={ movieDetails } />
            <StreamingProviders movieId={id} />
        </div>
      )}
      {/* <div>
        <h2>User Reviews</h2>
        {reviews.map((review) => (
          <div key={review.id}>
            <p>{review.text}</p>
            <small>{review.author}</small>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default MovieDetailsPage;
