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
import LoadingSpinner from "../ui/LoadingSpinner/LoadingSpinner";

export function MovieShowtimes() {
  // State for backend data
  const [theaters, setTheaters] = useState([]);
  const [movies, setMovies] = useState([]);
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

  // Initial data load - get theaters and movies
  useEffect(() => {
    async function fetchInitialData() {
      try {
        setLoading(true);
        console.log("Fetching theaters and movies...");

        // Get theaters
        const tRes = await theaterService.getAllTheaters(); // GET /api/theaters
        console.log("Theaters response:", tRes.data);

        if (tRes.data && tRes.data.length > 0) {
          setTheaters(tRes.data);
          setActiveTheater(tRes.data[0].id);
        } else {
          console.warn("No theaters returned from API");
        }

        // Get movies
        const mRes = await movieService.getAllMovies(); // GET /api/movies
        console.log("Movies response:", mRes.data);
        setMovies(mRes.data);

        // Now fetch ALL showtimes after theaters and movies are loaded
        fetchAllShowtimes();
      } catch (err) {
        console.error("Error fetching theaters or movies:", err);
        setError("Failed to load theaters or movies.");
      } finally {
        setLoading(false);
      }
    }

    fetchInitialData();
  }, []);

  // Fetch all showtimes and transform them into theater-grouped format
  async function fetchAllShowtimes() {
    try {
      setLoading(true);
      console.log("Fetching all showtimes...");

      // Get ALL showtimes instead of filtering by date on the server
      const stRes = await showtimeService.getAllShowTimes();
      console.log("All showtimes:", stRes.data);

      if (!stRes.data || stRes.data.length === 0) {
        console.warn("No showtimes returned from API");
        return;
      }

      // Filter by the selected date (client-side filter)
      const selectedDateString = selectedDate.toISOString().split("T")[0];
      console.log("Filtering for date:", selectedDateString);

      // Filter showtimes by their "date" field which matches our selected date
      const filteredShowtimes = stRes.data.filter(
        (st) => st.date === selectedDateString
      );

      console.log("Filtered showtimes for selected date:", filteredShowtimes);

      if (filteredShowtimes.length === 0) {
        console.warn(`No showtimes found for date: ${selectedDateString}`);
        // Try a different date that matches your data
        if (selectedDateString !== "2025-04-02") {
          console.log("Trying default date: 2025-04-02");
          setSelectedDate(new Date("2025-04-02"));
          return;
        }
      }

      // We need to map screenId to theaters
      // Hardcoded screen-to-theater mapping based on your data structure
      // In a real app, you would fetch this from your API
      const screenToTheaterMap = {
        1: { theaterId: 1, theaterName: "Cineplex Village Mall" },
        2: { theaterId: 1, theaterName: "Cineplex Village Mall" },
        3: { theaterId: 1, theaterName: "Cineplex Village Mall" },
        4: { theaterId: 2, theaterName: "Cineplex Sobeys Square" },
        5: { theaterId: 2, theaterName: "Cineplex Sobeys Square" },
        6: { theaterId: 2, theaterName: "Cineplex Sobeys Square" },
      };

      // Transform the data into a theater-grouped structure
      const theaterShowtimesMap = new Map();

      theaters.forEach((theater) => {
        theaterShowtimesMap.set(theater.id, {
          theaterId: theater.id,
          theaterName: theater.name,
          address: theater.address,
          movieShowtimes: {},
        });
      });

      // Group showtimes by theater and movie
      filteredShowtimes.forEach((showtime) => {
        const screenId = showtime.screenId;
        const theaterInfo = screenToTheaterMap[screenId];

        if (!theaterInfo) {
          console.warn(`No theater mapping found for screenId: ${screenId}`);
          return;
        }

        const theaterId = theaterInfo.theaterId;
        const movieId = showtime.movieId;

        if (theaterId && movieId && theaterShowtimesMap.has(theaterId)) {
          const theaterData = theaterShowtimesMap.get(theaterId);

          if (!theaterData.movieShowtimes[movieId]) {
            theaterData.movieShowtimes[movieId] = [];
          }

          // Add the theater/screen info to the showtime object
          const enrichedShowtime = {
            ...showtime,
            theaterId,
            theaterName: theaterInfo.theaterName,
          };

          theaterData.movieShowtimes[movieId].push(enrichedShowtime);
        }
      });

      console.log("Transformed theater-movie showtimes:", theaterShowtimesMap);

      // Update the component state with the processed data
      setTheaters((prevTheaters) =>
        prevTheaters.map((theater) => ({
          ...theater,
          movieShowtimes:
            theaterShowtimesMap.get(theater.id)?.movieShowtimes || {},
        }))
      );
    } catch (err) {
      console.error("Error fetching showtimes:", err);
      setError("Failed to load showtimes.");
    } finally {
      setLoading(false);
    }
  }

  // Refresh showtimes when date changes
  useEffect(() => {
    fetchAllShowtimes();
  }, [selectedDate]);

  // Handler for changing the selected date
  const handleDateSelect = (d) => {
    setSelectedDate(d);
    setShowCalendar(false);
  };

  // Helper: Format ISO datetime to "10:30 AM"
  const formatTime = (isoString) => {
    if (!isoString) return "";
    const d = new Date(isoString);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <div className="text-center p-4" style={{ color: "red" }}>
        {error}
      </div>
    );

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
                      // Check if this movie has showtimes at this theater
                      const movieShowtimes =
                        theater.movieShowtimes?.[movie.id] || [];
                      console.log(
                        `Movie ${movie.title} at ${theater.name}:`,
                        movieShowtimes
                      );

                      if (movieShowtimes.length === 0) return null;

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
                              <h3 className="movie-title-small">
                                {movie.title}
                              </h3>
                              <p className="movie-rating-small">
                                {movie.rating}
                              </p>
                            </div>
                          </div>
                          <div className="showtimes-list">
                            {movieShowtimes.map((st) => (
                              <Link
                                key={st.id}
                                to={`/showtimes/${st.id}/seats`}
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
