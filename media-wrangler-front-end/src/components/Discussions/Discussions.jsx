import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Services/AuthContext";
import NewDiscussionForm from "./NewDiscussionForm";
import "./Discussions.css";

export default function Discussions() {
  const { user } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [err, setErr]           = useState(null);


  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");


  useEffect(() => {
    const t = setTimeout(() => setDebounced(search.trim().toLowerCase()), 250);
    return () => clearTimeout(t);
  }, [search]);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:8080/questions");
      if (!res.ok) throw new Error(`Failed to load (${res.status})`);
      const data = await res.json();
      setQuestions(Array.isArray(data) ? data : []);
      setErr(null);
    } catch (e) {
      setQuestions([]);
      setErr(e.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchQuestions(); }, []);

  const filtered = useMemo(() => {
    if (!debounced) return questions;
    return questions.filter(q => {
      const hay = [
        q.questionText,
        q.shortDescription,
        q.movieTitle,
        q.username
      ].filter(Boolean).join(" ").toLowerCase();
      return hay.includes(debounced);
    });
  }, [questions, debounced]);

  return (
    <div className="disc-page">
      <div className="disc-wrap">

        <section className="disc-left">
          <NewDiscussionForm user={user} onCreated={fetchQuestions} />
        </section>

        <section className="disc-right">
          <div className="disc-right-header">
            <h2>Recent Discussions</h2>
            {!loading && !err && (
              <span className="badge">{filtered.length}</span>
            )}
            <input
              className="disc-search"
              type="search"
              placeholder="Search questions, movies, users…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            
          </div>

          {loading && (
            <div className="skeleton-list">
              <div className="skeleton-card" />
              <div className="skeleton-card" />
              <div className="skeleton-card" />
            </div>
          )}

          {!loading && err && <p className="disc-error">Error: {err}</p>}

          {!loading && !err && filtered.length === 0 && (
            <div className="disc-empty">
              <p>No matching discussions.</p>
            </div>
          )}

          <ul className="disc-list">
            {filtered.map(q => (
              <li key={q.id} className="disc-card">
                <div className="disc-thumb">
                  {q.moviePosterPath ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w92${q.moviePosterPath}`}
                      alt={q.movieTitle}
                    />
                  ) : (
                    <div className="thumb-placeholder">🎬</div>
                  )}
                </div>

                <div className="disc-body">
                  <Link to={`/answers/${q.id}`} className="disc-title">
                    {q.questionText}
                  </Link>

                  {q.shortDescription && (
                    <p className="disc-desc">{q.shortDescription}</p>
                  )}

                  <div className="disc-meta">
                    <span className="pill">
                      {q.movieTitle ? `Movie: ${q.movieTitle}` : "General"}
                    </span>
                    <span>by {q.username}</span>
                    {q.createdAt && (
                      <span>{new Date(q.createdAt).toLocaleString()}</span>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <footer className="disc-footer">
        <p>This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
        <p>© {new Date().getFullYear()} Media Wrangler</p>
        <div className="about-us">
          <a href="/about-us">About PurpleTONE</a>
        </div>
      </footer>
    </div>
  );
}
