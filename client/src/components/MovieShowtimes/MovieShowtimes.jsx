// FILE: src/components/MovieShowtimes/MovieShowtimes.jsx

import React, { useState, useEffect } from "react";
import { CalendarIcon } from "lucide-react";
import { Button } from "../ui/Button/Button";
import { Card, CardContent } from "../ui/Card/Card";
import { Link } from "react-router-dom";
import {
  theaterService,
  movieService,
  showtimeService,
} from "../../services/api";
import "./MovieShowtimes.css";

export function MovieShowtimes() {
  // State for backend data
  const [theaters, setTheaters] = useState([]);
  const [movies, setMovies] = useState([]);
  const [showtimes, setShowtimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Date picker state – set default to "2025-04-10" to match your inserted data
  const [selectedDate, setSelectedDate] = useState(new Date("2025-04-10"));
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarDates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });

  // Theater tab state
  const [activeTheater, setActiveTheater] = useState(null);

  // Fetch theaters and movies on mount
  useEffect(() => {
    async function fetchInitialData() {
      try {
        setLoading(true);
        const tRes = await theaterService.getAllTheaters(); // GET /api/theaters
        setTheaters(tRes.data);
        if (tRes.data.length > 0) {
          setActiveTheater(tRes.data[0].id);
        }
        const mRes = await movieService.getAllMovies(); // GET /api/movies
        setMovies(mRes.data);
      } catch (err) {
        console.error("Error fetching theaters or movies:", err);
        setError("Failed to load theaters or movies.");
      } finally {
        setLoading(false);
      }
    }
    fetchInitialData();
  }, []);

  // Fetch showtimes whenever the selected date changes
  useEffect(() => {
    async function fetchShowtimes() {
      try {
        setLoading(true);
        const dateString = selectedDate.toISOString().split("T")[0]; // "YYYY-MM-DD"
        const sRes = await showtimeService.getShowTimesByDate(dateString); // GET /api/showtimes/date/{date}
        setShowtimes(sRes.data);
      } catch (err) {
        console.error("Error fetching showtimes:", err);
        setError("Failed to load showtimes.");
      } finally {
        setLoading(false);
      }
    }
    fetchShowtimes();
  }, [selectedDate]);

  // Handler for changing the selected date
  const handleDateSelect = (d) => {
    setSelectedDate(d);
    setShowCalendar(false);
  };

  // Helper: Filter showtimes for a given movie and theater.
  // Here, we assume each showtime object has:
  //    - st.movieId (number)
  //    - st.theaterName (string) – set in your DTO from st.getScreen().getTheater().getName()
  // Adjust this if your field names differ.
  const getShowtimesForMovieAndTheater = (movieId, theaterName) => {
    return showtimes.filter(
      (st) => st.movieId === movieId && st.theaterName === theaterName
    );
  };

  // Helper: Format ISO datetime to "10:30 AM"
  const formatTime = (isoString) => {
    if (!isoString) return "";
    const d = new Date(isoString);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4" style={{ color: "red" }}>{error}</div>;

  return (
    <div className="showtimes-container">
      {/* Date Picker */}
      <div className="date-selector">
        <div className="calendar-wrapper">
          <Button
            variant="outline"
            className="calendar-button"
            onClick={() => setShowCalendar(!showCalendar)}
          >
            <CalendarIcon className="calendar-icon" />
            {selectedDate.toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </Button>
          {showCalendar && (
            <div className="calendar-dropdown">
              <div className="calendar-grid">
                {calendarDates.map((d, i) => (
                  <button
                    key={i}
                    className={`calendar-day ${
                      selectedDate.toDateString() === d.toDateString()
                        ? "calendar-day-active"
                        : ""
                    }`}
                    onClick={() => handleDateSelect(d)}
                  >
                    {d.getDate()}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Theater Tabs */}
      <div className="theaters-container">
        <div className="theater-tabs">
          {theaters.map((th) => (
            <button
              key={th.id}
              className={`theater-tab ${
                activeTheater === th.id ? "theater-tab-active" : ""
              }`}
              onClick={() => setActiveTheater(th.id)}
            >
              {th.name}
            </button>
          ))}
        </div>

        {/* Theater Content */}
        {theaters.map((theater) => (
          <div
            key={theater.id}
            className={`theater-content ${
              activeTheater === theater.id ? "theater-content-active" : ""
            }`}
          >
            {activeTheater === theater.id && (
              <Card className="theater-card">
                <CardContent className="theater-card-content">
                  <div className="theater-address">
                    {theater.address} • {theater.distance || "5 min away"}
                  </div>
                  <div className="movies-list">
                    {movies.map((movie) => {
                      // Here we filter by movie id and match theater by name
                      const relevantShowtimes = getShowtimesForMovieAndTheater(
                        movie.id,
                        theater.name
                      );
                      if (!relevantShowtimes.length) return null;
                      return (
                        <div key={movie.id} className="movie-item">
                          <div className="movie-info-container">
                            <div className="movie-poster-container">
                              <img
                                src={movie.posterImageUrl || "/placeholder.svg"}
                                alt={movie.title}
                                className="movie-poster-small"
                              />
                            </div>
                            <div className="movie-details-small">
                              <h3 className="movie-title-small">{movie.title}</h3>
                              <p className="movie-rating-small">{movie.rating}</p>
                            </div>
                          </div>
                          <div className="showtimes-list">
                            {relevantShowtimes.map((st) => (
                              <Link key={st.id} to={`/showtimes/${st.id}/seats`}>
                                <Button variant="outline" className="showtime-button">
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
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
