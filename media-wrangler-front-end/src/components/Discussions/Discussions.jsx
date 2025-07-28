import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Discussions.css";

const Discussions = () => {
  const [user, setUser] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [questionText, setQuestionText] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); 

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch("http://localhost:8080/questions/view");
      if (!response.ok) {
        throw new Error("Failed to fetch questions");
      }
      const data = await response.json();
      setQuestions(data);
      setFilteredQuestions(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/questions/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          questionText: questionText,
          user: { id: user.id },
        }),
      });

      if (response.ok) {
        setQuestionText("");
        fetchQuestions();
        console.log("Question submitted successfully.");
      } else {
        console.error("Failed to submit question:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to submit question:", error.message);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = questions.filter((question) =>
      question.questionText.toLowerCase().includes(term)
    );
    setFilteredQuestions(filtered);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
    <div className="question-container">
      <div className="question-form-container">
        <form onSubmit={handleSubmit} className="question-box">
          <h2 className="title is-4">Submit What You Want To Discuss</h2>
          <div className="question-field">
            <textarea
              className="question-textarea"
              placeholder="Enter your question"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="question-field">
            <button type="submit" className="button is-primary">
              Submit
            </button>
          </div>
        </form>
      </div>

      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search discussions..."
          value={searchTerm}
          onChange={handleSearch}
          className="question-search-input"
        />
      </div>

      <div>
        <h1 className="title is-3">Discussions</h1>
        {filteredQuestions.length > 0 ? (
          <ul className="question-list is-hoverable">
            {filteredQuestions.map((question) => (
              <li
                key={question.id}
                className="question-view-box"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  console.log("Navigating to:", `/answers/${question.id}`);
                  navigate(`/answers/${question.id}`);
                }}
              >
                <p>
                  <strong>{question.questionText}</strong>
                </p>
                <p>Posted by: {question.user.username}</p>
                <p>{new Date(question.timestamp).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No matching discussions found.</p>
        )}
      </div>
    </div>
     <footer className="footer">
     <p>This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
     <p>© {new Date().getFullYear()} Media Wrangler</p>
     <div className="about-us">
       <a href="/about-us">About PurpleTONE</a>
     </div>
   </footer>
   </>
  );
};

export default Discussions;
