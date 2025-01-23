import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Services/AuthContext";

const DiscussionPage = () => {
  const [questions, setQuestions] = useState([]);
  const [questionText, setQuestionText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://localhost:8080/questions/view", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setQuestions(data);
        } else {
          console.error("Failed to fetch questions:", response.statusText);
        }
      } catch (error) {
        console.error("Failed to fetch questions:", error.message);
      }
    };

    fetchQuestions();
  }, []);

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!user) {
        alert("You must be logged in to ask a question.");
        return;
      }

      const response = await fetch("http://localhost:8080/questions/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          questionText,
          user: { id: user.id },
        }),
      });

      if (response.ok) {
        const newQuestion = await response.json();
        setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
        setQuestionText("");
        console.log("Question submitted successfully.");
      } else {
        console.error("Failed to submit question:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to submit question:", error.message);
    }
  };

  const filteredQuestions = questions.filter((question) =>
    question.questionText.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="discussion-page">
      <h1 className="title is-3">Discussion Forum</h1>

      <div className="box">
        <input
          className="input"
          type="text"
          placeholder="Search questions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="box">
        <form onSubmit={handleQuestionSubmit}>
          <h2 className="title is-4">Ask a Question</h2>
          <textarea
            className="textarea"
            placeholder="Enter your question"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            required
          ></textarea>
          <button type="submit" className="button is-primary mt-3">
            Submit
          </button>
        </form>
      </div>

      <div className="box">
        <h2 className="title is-4">Questions</h2>
        <ul>
          {filteredQuestions.map((question) => (
            <li key={question.id} className="my-2">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/questions/${question.id}`);
                }}
              >
                {question.questionText}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DiscussionPage;
