import React from "react";
import StarIcon from "@mui/icons-material/Star";
import "./MovieCarousel.css"; 

const MovieCarousel = ({ title, movies, onPosterClick, onAddClick, buttonType }) => {
  return (
    <div className="movie-carousel-container">
      <h2 className="movie-carousel-title">{title}</h2>
      <div className="movie-carousel">
        {movies.slice(0, 10).map((movie) => (
          <div className="movie-card" key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path || movie.posterPath}`}
              alt={`Poster of ${movie.title}`}
              className="movie-poster"
              onClick={() => onPosterClick(movie)}
            />
            <button
              className="add-button"
              onClick={(e) =>
                buttonType === "calendar"
                  ? onAddClick(movie) 
                  : onAddClick(e, movie)
              }
              title={buttonType === "calendar" ? "Add to Calendar" : "Add to List"}
            >
              <StarIcon style={{ color: "white", fontSize: "20px" }} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};


export default MovieCarousel;
