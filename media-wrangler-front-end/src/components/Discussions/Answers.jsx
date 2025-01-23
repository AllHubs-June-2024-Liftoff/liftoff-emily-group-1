import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../Services/AuthContext";

const QuestionDetail = () => {
  const { id } = useParams(); 
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [answerText, setAnswerText] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const fetchQuestionDetails = async () => {
      try {
        const questionResponse = await fetch(`http://localhost:8080/questions/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (questionResponse.ok) {
          const questionData = await questionResponse.json();
          setQuestion(questionData);
        } else {
          console.error("Failed to fetch question:", questionResponse.statusText);
        }

        const answersResponse = await fetch(`http://localhost:8080/answers/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (answersResponse.ok) {
          const answersData = await answersResponse.json();
          setAnswers(answersData);
        } else {
          console.error("Failed to fetch answers:", answersResponse.statusText);
        }
      } catch (error) {
        console.error("Failed to fetch question details:", error.message);
      }
    };

    fetchQuestionDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!user) {
        alert("You must be logged in to submit an answer.");
        return;
      }

      const response = await fetch("http://localhost:8080/answers/response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          answerText,
          user: { id: user.id },
          question: { id },
        }),
      });

      if (response.ok) {
        const newAnswer = await response.json();
        setAnswers((prevAnswers) => [...prevAnswers, newAnswer]);
        setAnswerText(""); 
        console.log("Answer submitted successfully.");
      } else {
        console.error("Failed to submit answer:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to submit answer:", error.message);
    }
  };

  if (!question) {
    return <p>Loading...</p>;
  }

  return (
    <div className="box">
      <h2 className="title is-4">{question.questionText}</h2>
      <div>
        <h3 className="title is-5">Answers</h3>
        <ul>
          {answers.map((answer) => (
            <li key={answer.id}>{answer.answerText}</li>
          ))}
        </ul>
      </div>
      <form onSubmit={handleSubmit} className="mt-4">
        <textarea
          className="textarea"
          placeholder="Enter your answer"
          value={answerText}
          onChange={(e) => setAnswerText(e.target.value)}
          required
        ></textarea>
        <button type="submit" className="button is-primary mt-3">
          Submit Answer
        </button>
      </form>
    </div>
  );
};

export default QuestionDetail;
