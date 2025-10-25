import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";
import { toast } from "react-toastify";

const locales = { "en-US": enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const TMDB_API_KEY = "1ae7a70b471c9eb7d389671747750ad0";

function CalendarPlaceholder({ user }) {
  const [events, setEvents] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const [detailsLoading, setDetailsLoading] = useState(false);
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/events/user/${user.id}`);
        if (!res.ok) throw new Error("Failed to fetch events");
        const data = await res.json();

        const formatted = data.map(ev => ({
          id: ev.id,
          title: ev.title,
          start: new Date(ev.start),
          end: new Date(ev.end),
          tmdbId: ev.tmdbId,
          posterPath: ev.posterPath,
          overview: ev.overview,
        }));
        setEvents(formatted);
      } catch (err) {
        console.error(err);
        toast.error("Couldn’t load your events.");
      }
    };

    if (user?.id) fetchEvents();
  }, [user]);

  const handleSelectSlot = (slotInfo) => {
    setTitle("");
    setStart(slotInfo.start.toISOString().slice(0, 16));
    setEnd(slotInfo.end.toISOString().slice(0, 16));
    setShowAddModal(true);
  };

  const handleSelectEvent = async (event) => {
  setSelectedEvent(event);
  setDetails(null);

  if (!event.tmdbId) {
    setDetails({
      title: event.title,
      overview: null,      
      posterUrl: null,     
      releaseDate: undefined,
      isCustom: true,
    });
    return;
  }

  if (event.posterPath || event.overview) {
    setDetails({
      title: event.title,
      overview: event.overview || "No description available.",
      posterUrl: event.posterPath
        ? `https://image.tmdb.org/t/p/w342${event.posterPath}`
        : null,
      releaseDate: undefined,
      isCustom: false,
    });
    return;
  }

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${event.tmdbId}?api_key=${TMDB_API_KEY}&language=en-US`
    );
    if (!res.ok) throw new Error();
    const m = await res.json();
    setDetails({
      title: m.title,
      overview: m.overview || "No description available.",
      posterUrl: m.poster_path ? `https://image.tmdb.org/t/p/w342${m.poster_path}` : null,
      releaseDate: m.release_date,
      isCustom: false,
    });
  } catch {
    setDetails({
      title: event.title,
      overview: "Couldn’t load details from TMDB.",
      posterUrl: null,
      releaseDate: undefined,
      isCustom: false,
    });
  }
};

  const handleAddEvent = async (e) => {
    e.preventDefault();
    if (!title || !start || !end) {
      toast.warn("Please fill in all fields.");
      return;
    }

    const startDay = new Date(start);
    const dup = events.some(ev => {
      const sameTitle = ev.title.trim().toLowerCase() === title.trim().toLowerCase();
      const sameDay =
        ev.start.getFullYear() === startDay.getFullYear() &&
        ev.start.getMonth() === startDay.getMonth() &&
        ev.start.getDate() === startDay.getDate();
      return sameTitle && sameDay;
    });
    if (dup) {
      toast.info("That movie is already on your calendar for that day.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/events/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, start, end, userId: user.id }),
      });

      if (res.status === 409) {
        toast.info("That movie is already on your calendar for that day.");
        return;
      }
      if (!res.ok) throw new Error();

      const newEvent = {
        id: crypto.randomUUID(), 
        title,
        start: new Date(start),
        end: new Date(end),
      };
      setEvents(prev => [...prev, newEvent]);
      setShowAddModal(false);
      setTitle(""); setStart(""); setEnd("");
      toast.success("Event added!");
    } catch {
      toast.error("Failed to add event.");
    }
  };

  const handleDeleteEvent = async () => {
    if (!selectedEvent?.id) return;

    try {
      const res = await fetch(`http://localhost:8080/api/events/${selectedEvent.id}`, {
        method: "DELETE",
      });

      if (res.ok || res.status === 204) {
        setEvents(prev => prev.filter(ev => ev.id !== selectedEvent.id));
        toast.success("Event deleted!");
        setSelectedEvent(null);
        setDetails(null);
      } else {
        toast.error("Failed to delete event.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error deleting event.");
    }
  };

  return (
    <>
      <div className="calendar-card">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          selectable
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          views={["month"]}
          defaultView="month"
          style={{ height: "400px", marginTop: "20px" }}
        />
      </div>

      {showAddModal && (
        <div className="calendar-modal-overlay">
          <div className="calendar-modal-content">
            <h2 className="calendar-modal-title">Add Event</h2>
            <form onSubmit={handleAddEvent} className="calendar-event-form">
              <div className="calendar-form-group">
                <label>Title:</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Event title"
                />
              </div>
              <div className="calendar-form-group">
                <label>Start Date/Time:</label>
                <input
                  type="datetime-local"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                />
              </div>
              <div className="calendar-form-group">
                <label>End Date/Time:</label>
                <input
                  type="datetime-local"
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                />
              </div>
              <div className="calendar-modal-buttons">
                <button type="submit" className="calendar-submit-button">Add Event</button>
                <button type="button" className="calendar-cancel-button" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


      {selectedEvent && (
        <div className="calendar-modal-overlay">
          <div className="calendar-modal-content">
            <h2 style={{ marginBottom: 8 }}>
              {details?.title || selectedEvent.title}
            </h2>

            {detailsLoading ? (
              <p>Loading details…</p>
            ) : (
              <>
                {details?.isCustom ? (
                  <>
                    <p><em>Custom event</em></p>
                    {/* No start/end lines */}
                    <div className="calendar-modal-buttons" style={{ marginTop: 16 }}>
                      <button onClick={handleDeleteEvent} className="calendar-delete-button">
                        Delete
                      </button>
                      <button
                        onClick={() => { setSelectedEvent(null); setDetails(null); }}
                        className="calendar-cancel-button"
                      >
                        Close
                      </button>
                    </div>
                  </>
                ) : details ? (
                  <>
                    <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                      {details.posterUrl ? (
                        <img
                          src={details.posterUrl}
                          alt={details.title}
                          style={{ width: 150, borderRadius: 8, flexShrink: 0 }}
                        />
                      ) : (
                        <div
                          style={{
                            width: 150,
                            height: 225,
                            borderRadius: 8,
                            background: "#ddd",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 12,
                            color: "#666",
                            flexShrink: 0,
                          }}
                        >
                          No poster
                        </div>
                      )}

                      <div style={{ flex: 1 }}>
                        {/* Optional: show release date only (no start/end) */}
                        {details.releaseDate && (
                          <p style={{ marginTop: 0 }}>
                            <strong>Release date:</strong>{" "}
                            {new Date(details.releaseDate).toLocaleDateString()}
                          </p>
                        )}

                        <p style={{ whiteSpace: "pre-wrap" }}>
                          {details.overview || "No description available."}
                        </p>
                      </div>
                    </div>

                    <div className="calendar-modal-buttons" style={{ marginTop: 16 }}>
                      <button onClick={handleDeleteEvent} className="calendar-delete-button">
                        Delete
                      </button>
                      <button
                        onClick={() => { setSelectedEvent(null); setDetails(null); }}
                        className="calendar-cancel-button"
                      >
                        Close
                      </button>
                    </div>
                  </>
                ) : (
                  <p>Loading details…</p>
                )}
              </>
            )}
          </div>
        </div>
      )}

    </>
  );
}

export default CalendarPlaceholder;

