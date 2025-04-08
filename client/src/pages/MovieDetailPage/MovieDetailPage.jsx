

import React, { useState } from "react"; 
import { useParams, useNavigate, Link } from "react-router-dom"; 
import { CalendarIcon } from "lucide-react"; 
import { Button } from "../../components/ui/Button/Button";
import { useFetchMovieDetails } from "../../hooks/useFetchMovieDetails"; 
import LoadingSpinner from "../../components/ui/LoadingSpinner/LoadingSpinner";
import "./MovieDetailPage.css"; 

function MovieDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  
  const [selectedDate, setSelectedDate] = useState(new Date("2025-04-10")); // Or new Date() for today
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarDates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });

 
  const { movie, theaters, loading, error } = useFetchMovieDetails(
    id,
    selectedDate 
  );

  // --- Helper Functions ---
  const formatTime = (isoString) => {
    if (!isoString) return "N/A";
    try {
        const d = new Date(isoString);
        if (isNaN(d.getTime())) return "Invalid Time";
        return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } catch(e) {
        return "Error"
    }
  };

  
  const handleDateSelect = (d) => {
    setSelectedDate(d);
    setShowCalendar(false);
  };


  const initialLoading = loading && !movie;
  const showtimesLoading = loading && !!movie;

  if (initialLoading) {
    return (
      <div className="loading-spinner-container">
        <LoadingSpinner message="Loading movie details..." />
      </div>
    );
  }

  if (error && !movie) {
    console.error("Error loading movie details:", error);
    return <div className="error-message">{error}</div>;
  }

  if (!movie) {
    return <div className="error-message">Movie not found</div>;
  }

  // Filter theaters from hook data that actually have showtimes
  const theatersWithShowtimes = theaters?.filter(t => t.showtimes && t.showtimes.length > 0) || [];

  return (
    <div className="movie-detail-container">
      {/* --- Movie Header (Keep As Is) --- */}
      <div className="movie-detail-header">
        <img
          src={movie.posterImageUrl || "/placeholder.svg"}
          alt={movie.title}
          className="movie-poster"
        />
        <div className="movie-info">
          <h1 className="movie-title">{movie.title}</h1>
          <div className="movie-meta">
            <span>Rating: {movie.rating || "N/A"}</span>
            <span>Duration: {movie.durationMinutes || "N/A"} min</span>
            <span>Genre: {movie.genre || "N/A"}</span>
          </div>
          <p className="movie-description">{movie.description || "No description."}</p>
          <div className="movie-actions">
            <Button onClick={() => navigate(-1)}>Back</Button>
          </div>
        </div>
      </div>

      {/* --- Showtimes Section --- */}
      <div className="showtimes-section">
        <h2>Showtimes for {selectedDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}</h2>

        {/* --- Date Picker JSX --- */}
        <div className="date-selector movie-detail-date-selector">
          <div className="calendar-wrapper">
            <Button
              variant="outline"
              className="calendar-button"
              onClick={() => setShowCalendar(!showCalendar)}
              aria-label={`Change date, currently selected ${selectedDate.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}`}
              aria-expanded={showCalendar}
            >
              <CalendarIcon className="calendar-icon" />
              {selectedDate.toLocaleDateString("en-US", {
                weekday: "short", month: "short", day: "numeric"
              })}
            </Button>
            {showCalendar && (
              <div className="calendar-dropdown">
                <div className="calendar-grid">
                  {calendarDates.map((d, i) => (
                    <button
                      key={i}
                      className={`calendar-day ${selectedDate.toDateString() === d.toDateString() ? "calendar-day-active" : ""}`}
                      onClick={() => handleDateSelect(d)}
                      aria-label={`Select date ${d.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`}
                    >
                      {d.getDate()}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* --- Loading / Error / Content --- */}
        {showtimesLoading && (
          <LoadingSpinner size="small" message="Loading showtimes..." />
        )}
        {error && !initialLoading && (
           <div className="showtime-error-message">{error}</div>
        )}
        {!loading && !error && theatersWithShowtimes.length === 0 && (
           <p className="no-showtimes-message">No showtimes available for {movie.title} on {selectedDate.toLocaleDateString()}.</p>
        )}

        {/* --- Theater & Showtime List --- */}
        {/* Use the structure from Theatres.jsx for display */}
        {!loading && !error && theatersWithShowtimes.length > 0 && (
          <div className="theaters-showtime-list"> {/* Container for theater groups */}
            {theatersWithShowtimes.map((theater) => (
              
              <div key={theater.id || theater.name} className="theater-showtime-group">
                <h3 className="theater-name">{theater.name}</h3>
                {/* Display address if available from hook data */}
                <p className="theater-address-small">{theater.address || "Address not available"}</p>

                {/* --- THIS IS THE CORE CHANGE --- */}
                {/* Map over the theater.showtimes array returned by the hook */}
                <div className="showtimes-list">
                  {theater.showtimes.map((st) => (
                    
                    <Link
                      key={st.id} 
                      to={`/showtimes/${st.id}/seats`} 
                      className="showtime-link"
                      aria-label={`Select showtime ${formatTime(st.startTime)} for ${movie.title} at ${theater.name} in ${st.screenType || "Standard"}`}
                    >
                      <Button
                        variant="outline"
                        className="showtime-button"
                      >
                        <div>
                           <div className="showtime-time">
                             {formatTime(st.startTime)}
                           </div>
                           <div className="showtime-format">
                             {st.screenType || "Standard"}
                           </div>
                        </div>
                      </Button>
                    </Link>
                  ))}
                </div>
                {/* --- END OF CORE CHANGE --- */}

              </div>
            ))}
          </div>
        )}
      </div> {/* End showtimes-section */}
    </div> 
  );
}

export default MovieDetailPage;