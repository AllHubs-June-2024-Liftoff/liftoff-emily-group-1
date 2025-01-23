import React from "react";
import AddEventForm from './components/Discover/UpcomingReleases.jsx'
import "./DiscoverPage.css";

function DiscoverPage() {
  return (
    <div className="discover-page-container">
      <div className="discover-section">
        <h2>Upcoming Movies</h2>
        <AddEventForm />
      </div>

      <div className="discover-section placeholder-section">
        <h2>Random Movie</h2>
        <p>This section will display a random movie feature.</p>
      </div>
    </div>
  );
}

export default DiscoverPage;
