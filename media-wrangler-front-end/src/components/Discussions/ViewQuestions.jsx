import React, { useState, useEffect } from "react";

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);

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

  return (
    <div>
      <h2 className="title is-4">Questions</h2>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            <a href={`/questions/${question.id}`}>{question.questionText}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionList;
