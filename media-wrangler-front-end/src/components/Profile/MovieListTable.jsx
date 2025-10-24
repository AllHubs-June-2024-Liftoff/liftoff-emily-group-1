import React, { useEffect, useState } from "react";
import "./MovieListTable.css";
import { useAuth } from "../../Services/AuthContext";

const MovieListTable = () => {
  const [movieLists, setMovieLists] = useState([]);
  const [movies, setMovies] = useState({});
  const [filter, setFilter] = useState("");
  const { user } = useAuth();

  const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNGY4N2NjNmIxZTZhMzQyMThjNjdjYWM1NGMwYzE0ZiIsIm5iZiI6MTczNDE5MTM5MS43NzcsInN1YiI6IjY3NWRhOTFmZjFiZjk2ZGMyNDc4MTA4ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4trA-9bv10lqcfQyhPxFTeKRWMyyPjIhgM_3Vri9Y6Y";
;

  const getTmdbId = (item) => {
    const raw =
      item?.tmdbId ??
      item?.movieId ??           
      item?.movie?.tmdbId ??
      item?.movie?.id ??
      null;
    const n = Number(raw);
    return Number.isFinite(n) && n > 0 ? n : null;
  };

  useEffect(() => {
    if (!user?.id) return;

    const fetchMovieLists = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/lists/all");
        if (!response.ok) {
          console.error("Failed to fetch movie lists.");
          return;
        }
        const data = await response.json();
        const userMovieLists = Array.isArray(data)
          ? data.filter((list) => list?.user?.id === user.id)
          : [];
        setMovieLists(userMovieLists);
      } catch (error) {
        console.error("Error fetching lists:", error);
      }
    };

    fetchMovieLists();
  }, [user?.id]);

  // Fetch TMDB details for any ids we don't have yet
  useEffect(() => {
    if (!Array.isArray(movieLists) || movieLists.length === 0) return;
    if (!TMDB_TOKEN) {
      console.warn("Missing VITE_TMDB_V4_TOKEN env var for TMDB.");
      return;
    }

    const idsToFetch = [];
    for (const list of movieLists) {
      const id = getTmdbId(list);
      if (id != null && !movies[id]) idsToFetch.push(id);
    }
    if (idsToFetch.length === 0) return;

    (async () => {
      try {
        await Promise.all(
          idsToFetch.map(async (id) => {
            const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
              headers: {
                Authorization: `Bearer ${TMDB_TOKEN}`,
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            });
            if (!res.ok) {
              console.error(`Failed to fetch details for movieId: ${id}`);
              return;
            }
            const data = await res.json();
            setMovies((prev) => ({ ...prev, [id]: data }));
          })
        );
      } catch (e) {
        console.error("TMDB fetch batch failed:", e);
      }
    })();
    // IMPORTANT: don't depend on `movies` here to avoid a re-fetch loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieLists, TMDB_TOKEN]);

  const handleFilterChange = (e) => setFilter(e.target.value);

  const handleDelete = async (listId, tmdbId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/lists/${listId}/movie/${tmdbId}`,
        { method: "DELETE" }
      );
      if (!response.ok) {
        console.error("Failed to delete the movie.");
        return;
      }
      setMovieLists((prev) =>
        prev.filter((list) => !(list.id === listId && getTmdbId(list) === tmdbId))
      );
      alert("Movie removed from the list successfully.");
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  const filteredLists = filter
    ? movieLists.filter((list) => (list.listName || "").includes(filter))
    : movieLists;

  return (
    <div>
      <h1>Movie Lists</h1>

      <div>
        <label htmlFor="filterDropdown">Filter by List Name: </label>
        <select id="filterDropdown" value={filter} onChange={handleFilterChange}>
          <option value="">All</option>
          {Array.from(new Set(movieLists.map((l) => l.listName || "")))
            .map((listName, idx) => (
              <option key={`ln-${idx}-${listName || "unnamed"}`} value={listName}>
                {listName || "Unnamed"}
              </option>
          ))}
        </select>
      </div>

      <div id="movie-search">
        {filteredLists
          .map((list) => ({ list, id: getTmdbId(list) }))
          .filter(({ id }) => id !== null)
          .map(({ list, id }) => {
            const details = movies[id];
            return (
              <div key={`${list.id}-${id}`} className="posterContainer">
                {details?.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${details.poster_path}`}
                    alt={details.title}
                    className="posterImage"
                  />
                ) : (
                  <p>Loading...</p>
                )}
                <button
                  className="deleteButton"
                  onClick={() => handleDelete(list.id, id)}
                  aria-label={`Remove ${details?.title || "movie"} from list`}
                >
                  x
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MovieListTable;