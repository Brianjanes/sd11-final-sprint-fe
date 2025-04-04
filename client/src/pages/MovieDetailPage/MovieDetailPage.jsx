// FILE: src/pages/MovieDetailPage.jsx

import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format, addDays } from "date-fns";
import { CalendarIcon } from "lucide-react";
import "./MovieDetailPage.css";
import useFetchMovieDetails from "../../hooks/useFetchMovieDetails";
import LoadingSpinner from "../../components/ui/LoadingSpinner/LoadingSpinner";

const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const TODAY = new Date("2025-04-02"); // Use a consistent date for development
  const [selectedDate, setSelectedDate] = useState(format(TODAY, "yyyy-MM-dd"));
  const [showCalendar, setShowCalendar] = useState(false);

  // Generate calendar dates for the next 14 days
  const calendarDates = Array.from({ length: 14 }, (_, i) => {
    const date = addDays(TODAY, i);
    return {
      date,
      formattedDate: format(date, "yyyy-MM-dd"),
      day: format(date, "d"),
      dayName: format(date, "EEE"),
    };
  });

  const { movie, theaters, isLoading, error } = useFetchMovieDetails(
    id,
    selectedDate
  );

  const handleDateSelect = (formattedDate) => {
    setSelectedDate(formattedDate);
    setShowCalendar(false);
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const handleBookTicket = (showtimeId) => {
    navigate(`/booking/${showtimeId}`);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!movie) {
    return <div className="error-message">Movie not found</div>;
  }

  return (
    <div className="movie-detail-container">
      <div className="movie-detail-header">
        <img
          src={movie.posterUrl}
          alt={`${movie.title} poster`}
          className="movie-poster"
        />
        <div className="movie-info">
          <h1 className="movie-title">{movie.title}</h1>
          <div className="movie-meta">
            <span>{movie.rating}</span>
            <span>{movie.duration} min</span>
            <span>{movie.genre}</span>
          </div>
          <p className="movie-description">{movie.description}</p>
          <div className="movie-actions">
            <button className="primary-button">Watch Trailer</button>
          </div>
        </div>
      </div>

      <div className="showtimes-section">
        <div className="showtimes-header">
          <h2>Available Showtimes</h2>
          <div className="date-picker">
            <button
              className="date-picker-button"
              onClick={() => setShowCalendar(!showCalendar)}
            >
              <span>{format(new Date(selectedDate), "MMMM d, yyyy")}</span>
              <CalendarIcon className="calendar-icon" />
            </button>

            {showCalendar && (
              <div className="calendar-dropdown">
                <div className="calendar-grid">
                  {calendarDates.map((calendarDate) => (
                    <button
                      key={calendarDate.formattedDate}
                      className={`calendar-day ${
                        calendarDate.formattedDate === selectedDate
                          ? "calendar-day-active"
                          : ""
                      }`}
                      onClick={() =>
                        handleDateSelect(calendarDate.formattedDate)
                      }
                    >
                      <div>
                        <div>{calendarDate.dayName}</div>
                        <div>{calendarDate.day}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {theaters.length === 0 ? (
          <div className="no-showtimes-message">
            No showtimes available for this date. Please select a different
            date.
          </div>
        ) : (
          <div className="theaters-list">
            {theaters.map((theater) => (
              <div key={theater.id} className="theater-showtimes-card">
                <h3 className="theater-name">{theater.name}</h3>
                <p className="theater-address">{theater.address}</p>

                <div className="showtimes-grid">
                  {theater.showtimes.map((showtime) => (
                    <div key={showtime.id} className="showtime-card">
                      <div className="showtime-info">
                        <span className="showtime-time">
                          {formatTime(showtime.startTime)}
                        </span>
                        <span>{showtime.screenType || "Standard"}</span>
                        <span className="showtime-price">
                          ${showtime.price || "15.99"}
                        </span>
                      </div>
                      <button
                        className="primary-button book-ticket-button"
                        onClick={() => handleBookTicket(showtime.id)}
                      >
                        Book Now
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetailPage;
