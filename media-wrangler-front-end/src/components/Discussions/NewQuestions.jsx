import React, { useState } from "react";
import { useAuth } from "../../Services/AuthContext";

const NewQuestionForm = () => {
  const [questionText, setQuestionText] = useState("");
  const { user } = useAuth();

  const handleSubmit = async (e) => {
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
          questionText: questionText,
          user: { id: user.id },
        }),
      });

      if (response.ok) {
        setQuestionText(""); 
        console.log("Question submitted successfully.");
      } else {
        console.error("Failed to submit question:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to submit question:", error.message);
    }
  };

  return (
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
  );
};

export default NewQuestionForm;
