import React, { useState } from "react";

function EventComponent({ user }) {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !start || !end) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/events/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          start,
          end,
          userId: user.id, 
        }),
      });

      if (response.ok) {
        alert("Event added successfully!");
        setTitle("");
        setStart("");
        setEnd("");
      } else {
        alert("Failed to add event.");
      }
    } catch (error) {
      console.error("Error adding event:", error);
      alert("An error occurred while adding the event.");
    }
  };

  return (
    <div>
      <h2>Add Event</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Start Date/Time:</label>
          <input
            type="datetime-local"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            required
          />
        </div>
        <div>
          <label>End Date/Time:</label>
          <input
            type="datetime-local"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Event</button>
      </form>
    </div>
  );
}

export default EventComponent;
