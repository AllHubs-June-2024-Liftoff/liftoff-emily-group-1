import React, { useState, useMemo, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import "./Discussions.css";

const TMDB_API_KEY = "1ae7a70b471c9eb7d389671747750ad0";

export default function NewDiscussionForm({ user, onCreated }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");

  const searchWrapRef = useRef(null);
  const inputRef = useRef(null);

  const closeResults = () => setResults([]);

  useEffect(() => {
    const onDocClick = (e) => {
      if (!searchWrapRef.current) return;
      if (!searchWrapRef.current.contains(e.target)) {
        closeResults();
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        closeResults();
        inputRef.current?.blur();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const debouncedSearch = useMemo(() => {
    let t;
    return (q) => {
      clearTimeout(t);
      t = setTimeout(async () => {
        if (!q?.trim()) { setResults([]); return; }
        try {
          const res = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&language=en-US&query=${encodeURIComponent(q)}&include_adult=false`
          );
          if (!res.ok) throw new Error("TMDB search failed");
          const data = await res.json();
          setResults(data.results?.slice(0, 7) ?? []);
        } catch {
          setResults([]);
        }
      }, 300);
    };
  }, []);

  const handleQueryChange = (e) => {
    const q = e.target.value;
    setQuery(q);
    if (!q.trim()) { setResults([]); return; }
    debouncedSearch(q);
  };

  const handlePick = (m) => {
    setSelectedMovie(m);
    setQuery(m.title);    
    closeResults();      
    inputRef.current?.blur();
  };

  const clearMovie = () => {
    setSelectedMovie(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return toast.info("Log in to start a discussion.");
    if (!title.trim()) return toast.warn("Please enter a question.");
    if (summary.length > 300) return toast.warn("Short description max 300 chars.");

    const payload = {
      questionText: title.trim(),
      shortDescription: summary.trim(),
      user: { id: user.id },
      movieId: selectedMovie?.id ?? null,
      movieTitle: selectedMovie?.title ?? null,
      moviePosterPath: selectedMovie?.poster_path ?? null,
      movieReleaseDate: selectedMovie?.release_date ?? null,
    };

    try {
      const res = await fetch("http://localhost:8080/questions/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());
      toast.success("Discussion posted!");
      setTitle(""); setSummary("");
      setResults([]); setQuery(""); setSelectedMovie(null);
      onCreated?.();
    } catch (err) {
      console.error(err);
      toast.error("Couldn’t create the discussion.");
    }
  };

  return (
    <div className="df-card">
      <h2 className="df-title">Start a Discussion</h2>

      <label className="df-label">Pick a movie (optional)</label>
      <div className="df-movie-search" ref={searchWrapRef}>
        <input
          ref={inputRef}
          className="df-input"
          placeholder="Search movie title…"
          value={query}
          onChange={handleQueryChange}
          onFocus={() => { if (query.trim()) debouncedSearch(query); }}
        />

        {results.length > 0 && (
          <div className="df-results">
            {results.map(m => (
              <button
                key={m.id}
                type="button"
                className={`df-result ${selectedMovie?.id === m.id ? "active" : ""}`}
                onClick={() => handlePick(m)}
                title={m.title}
              >
                {m.poster_path ? (
                  <img src={`https://image.tmdb.org/t/p/w92${m.poster_path}`} alt={m.title} />
                ) : (
                  <div className="df-no-poster">🎬</div>
                )}
                <span className="df-result-text">
                  {m.title}{m.release_date ? ` (${m.release_date.slice(0,4)})` : ""}
                </span>
              </button>
            ))}
          </div>
        )}

        {selectedMovie && (
          <div className="df-selected">
            {selectedMovie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w154${selectedMovie.poster_path}`}
                alt={selectedMovie.title}
              />
            ) : (
              <div className="df-no-poster large">🎬</div>
            )}
            <div className="df-selected-meta">
              <div className="df-selected-title">{selectedMovie.title}</div>
              {selectedMovie.release_date && (
                <div className="df-muted">
                  {new Date(selectedMovie.release_date).toLocaleDateString()}
                </div>
              )}
              <button type="button" className="df-clear" onClick={clearMovie} aria-label="Clear movie">
                × Remove movie
              </button>
            </div>
          </div>
        )}
      </div>

      <label className="df-label">Your question</label>
      <input
        className="df-input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="e.g., Is the director’s cut worth it?"
        maxLength={140}
      />

      <label className="df-label">
        Short description <span className="df-muted">(optional, max 300)</span>
      </label>
      <textarea
        className="df-textarea"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        rows={4}
        maxLength={300}
        placeholder="Add context or what you’ve tried…"
      />

      <div className="df-actions">
        <button className="btn-primary" onClick={handleSubmit}>Post</button>
      </div>
    </div>
  );
}
