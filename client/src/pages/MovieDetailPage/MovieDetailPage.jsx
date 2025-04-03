// FILE: src/pages/MovieDetailPage.jsx

import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button/Button";
import { useFetchMovieDetails } from "../../hooks/useFetchMovieDetails";
import LoadingSpinner from "../../components/ui/LoadingSpinner/LoadingSpinner";
import "./MovieDetailPage.css";

function MovieDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date("2025-04-10"));

  const { movie, theaters, loading, error } = useFetchMovieDetails(
    id,
    selectedDate
  );

  const formatTime = (isoString) => {
    if (!isoString) return "";
    const d = new Date(isoString);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleBookTicket = (showtimeId) => {
    navigate(`/booking/${showtimeId}`);
  };

  if (loading) {
    return (
      <div className="loading-spinner-container">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    console.log(error);
    return <div className="error-message">{error}</div>;
  }

  if (!movie) {
    return <div className="error-message">Movie not found</div>;
  }

  return (
    <div className="movie-detail-container">
      <div className="movie-detail-header">
        <img
          src={movie.posterImageUrl || "/placeholder.svg"}
          alt={movie.title}
          className="movie-poster"
        />
        <div className="movie-info">
          <h1 className="movie-title">{movie.title}</h1>
          <div className="movie-meta">
            <span>Rating: {movie.rating}</span>
            <span>Duration: {movie.durationMinutes} min</span>
            <span>Genre: {movie.genre}</span>
          </div>
          <p className="movie-description">{movie.description}</p>
          <div className="movie-actions">
            <Button onClick={() => navigate(-1)}>Back to Movies</Button>
          </div>
        </div>
      </div>

      <div className="showtimes-section">
        <h2>Available Showtimes</h2>
        <div className="showtimes-grid">
          {theaters.map((theater) => (
            <div key={theater.name} className="showtime-card">
              <div className="showtime-time">
                {formatTime(theater.showtimes[0].startTime)}
              </div>
              <div className="showtime-theater">{theater.name}</div>
              <div className="showtime-price">
                ${theater.showtimes[0].price}
              </div>
              <Button onClick={() => handleBookTicket(theater.showtimes[0].id)}>
                Book Now
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieDetailPage;
