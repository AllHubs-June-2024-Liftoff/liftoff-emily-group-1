import { useState, useEffect } from "react";
import { getPopularMovies } from "./HomePageService";

export const useFetchMovies = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUpcoming = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=1ae7a70b471c9eb7d389671747750ad0&language=en-US&page=1`
        );
        const data = await response.json();
        setUpcomingMovies(data.results);
      } catch (err) {
        setError("Error fetching upcoming movies");
      }
    };

    fetchUpcoming();
  }, []);

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const movies = await getPopularMovies();
        if (!Array.isArray(movies)) throw new Error("Invalid movie data");
        setPopularMovies(movies);
      } catch (err) {
        setError("Error fetching popular movies");
      }
    };

    fetchPopular();
  }, []);

  return { upcomingMovies, popularMovies, error };
};
