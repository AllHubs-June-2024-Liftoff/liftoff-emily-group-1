import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import MovieDetailCard from "./MovieDetailCard";
import StreamingProviders from "./StreamingProviders";
import MovieDetailsNav from "../nav/MovieDetailsNav";
import MovieReviewListCard from "../ReviewDisplay/MovieReviewListCard";
import { fetchMovieDetails, fetchMovieReviewsByMovieId } from "../../Services/MovieReviewService.js";

import "../../stylings/MovieDetailsPage.css";

function MovieDetailsPage() {
  const { id } = useParams();

  // Normalize/guard the TMDB id coming from the route
  const tmdbId = Number(id);
  const isValidId = Number.isFinite(tmdbId) && tmdbId > 0;

  const [movieDetails, setMovieDetails] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loadingMovie, setLoadingMovie] = useState(true);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [error, setError] = useState(null);

  // Fetch movie details
  useEffect(() => {
    if (!isValidId) {
      setError("Invalid movie id");
      setLoadingMovie(false);
      setLoadingReviews(false);
      return;
    }

    const ac = new AbortController();
    (async () => {
      try {
        setLoadingMovie(true);
        const data = await fetchMovieDetails(tmdbId, { signal: ac.signal });
        setMovieDetails(data || null);
      } catch (e) {
        if (e.name !== "AbortError") setError("Failed to load movie details.");
      } finally {
        setLoadingMovie(false);
      }
    })();

    return () => ac.abort();
  }, [isValidId, tmdbId]);

  // Fetch reviews for this movie
  useEffect(() => {
    if (!isValidId) return;
    const ac = new AbortController();
    (async () => {
      try {
        setLoadingReviews(true);
        const data = await fetchMovieReviewsByMovieId(tmdbId, { signal: ac.signal });
        setReviews(Array.isArray(data) ? data : []);
      } catch (e) {
        if (e.name !== "AbortError") setError("Failed to load reviews.");
      } finally {
        setLoadingReviews(false);
      }
    })();

    return () => ac.abort();
  }, [isValidId, tmdbId]);

  if (!isValidId) return <p>Invalid movie id.</p>;
  if (loadingMovie) return <p>Loading movie…</p>;

  return (
    <div className="movie-details-page-background">
      {error && <p style={{ color: "#ff8f00" }}>{error}</p>}

      {movieDetails && (
        <>
          <MovieDetailCard movieDetails={movieDetails} />
          {/* StreamingProviders expects a TMDB numeric id */}
          <StreamingProviders movieId={tmdbId} />
          <MovieDetailsNav movieDetails={movieDetails} />
        </>
      )}

      {/* Reviews */}
      {loadingReviews ? (
        <p>Loading movie reviews…</p>
      ) : reviews.length === 0 ? (
        <p>Be the first to write this movie a review!</p>
      ) : (
        reviews.map((review) => (
          <MovieReviewListCard
            key={review.id}
            rating={review.rating}
            award={review.award}
            review={review.review}
            authorId={review.userId}
            username={review.username}
            firstname={review.firstname}
            lastname={review.lastname}
            title={review.title}
            movieReviewId={review.id}         // used by comments fetch
            dateWatched={review.dateWatched}  // used for formatted date
            isSpoiler={review.isSpoiler}      // spoiler badge
          />
        ))
      )}
    </div>
  );
}

MovieDetailsPage.propTypes = {
  // nothing from parent; all from route + services
};

export default MovieDetailsPage;
