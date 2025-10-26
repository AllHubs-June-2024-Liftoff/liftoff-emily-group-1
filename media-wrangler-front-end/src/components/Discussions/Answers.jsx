import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../Services/AuthContext";
import "./Answers.css"

const QuestionDetail = () => {
  const { questionId } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [answerText, setAnswerText] = useState("");
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestionDetails = async () => {
      try {
        setLoading(true);

        const questionResponse = await fetch(
          `http://localhost:8080/questions/${questionId}`
        );
        if (!questionResponse.ok) {
          throw new Error("Failed to fetch question details");
        }
        const questionData = await questionResponse.json();
        setQuestion(questionData);

        const answersResponse = await fetch(
          `http://localhost:8080/answers/${questionId}`
        );
        if (!answersResponse.ok) {
          throw new Error("Failed to fetch answers");
        }
        const answersData = await answersResponse.json();
        setAnswers(answersData);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchQuestionDetails();
  }, [questionId]);

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!user) {
    alert("You must be logged in to submit an answer.");
    return;
  }


  const payload = {
    answerText: answerText.trim(),
    questionId: Number(questionId),
    userId: user.id,
  };

  try {
    const response = await fetch("http://localhost:8080/answers/response", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",        
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(errText || `Failed to submit answer (${response.status})`);
    }

    const newAnswer = await response.json();
    setAnswers((prev) => [...prev, newAnswer]);
    setAnswerText("");
  } catch (err) {
    console.error("Error submitting answer:", err.message);
    alert(err.message);
  }
};


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!question) return <p>Question data is unavailable.</p>;

  return (
    <>
    <div className="answer-container">
      <div className="answer-box">
        <h2 className="answer-title">{question.questionText}</h2>
        <div className="answer-movie-info">
          {question.moviePosterPath && (
            <img
              src={`https://image.tmdb.org/t/p/w154${question.moviePosterPath}`}
              alt={question.movieTitle}
            />
          )}

          {question.movieTitle && <h3>{question.movieTitle}</h3>}
          {question.shortDescription && <p className="answer-question-desc">{question.shortDescription}</p>}
        </div>

        
      <div className="mt-5">
        {answers.length > 0 ? (
          <ul className="answer-list">
            {answers.map((answer) => (
              <li key={answer.id} className="answers">
                <p className="answer"><strong>{answer.answerText}</strong></p>
                <p className="answer">Posted by: {answer.username}</p>
                <p className="answer">{" "}{new Date(answer.timestamp).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No answers yet.</p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="answer-form-container">
          <textarea
            className="answer-textarea"
            placeholder="Enter your answer"
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
            required
          ></textarea>
          <button type="submit" className="answer-button">
            Submit Answer
          </button>
        </form>
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

export default QuestionDetail;