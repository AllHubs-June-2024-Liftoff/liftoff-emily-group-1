import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Discussions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [questionText, setQuestionText] = useState("");
  const navigate = useNavigate();

  const user = { id: 1 }; 

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

      console.log(questionText, user);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="box">
        <h2 className="title is-4">Ask a Question</h2>
        <div className="field">
          <textarea
            className="textarea"
            placeholder="Enter your question"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="field">
          <button type="submit" className="button is-primary">
            Submit
          </button>
        </div>
      </form>

      <div>
        <h1 className="title is-3">Discussions</h1>
        {questions.length > 0 ? (
          <ul className="list is-hoverable">
            {questions.map((question) => (
              <li
              key={question.id}
              className="box"
              style={{ cursor: "pointer" }}
              onClick={() => {
                console.log("Navigating to:", `/answers/${question.id}`);
                navigate(`/answers/${question.id}`);
              }}
              >
                <p><strong>Question:</strong> {question.questionText}</p>
                <p><strong>Posted by User:</strong> {question.user.id}</p>
                <p><strong>Timestamp:</strong> {new Date(question.timestamp).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No questions available</p>
        )}
      </div>
    </div>
  );
};

export default Discussions;
