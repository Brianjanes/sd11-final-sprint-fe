import React, { useState, useEffect } from "react";
import { CalendarIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button/Button";
import { Card, CardContent } from "../components/ui/Card/Card";
import LoadingSpinner from "../components/ui/LoadingSpinner/LoadingSpinner";
import { theaterService, movieService, showtimeService } from "../services/api";
import "./Theatres.css";

function Tickets() {
    // ... (Keep all state, useEffect, handlers, helpers as before) ...
    const [theaters, setTheaters] = useState([]);
    const [movies, setMovies] = useState([]);
    const [showtimes, setShowtimes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date("2025-04-10"));
    const [showCalendar, setShowCalendar] = useState(false);
    const [activeTheater, setActiveTheater] = useState(null);

    const calendarDates = Array.from({ length: 14 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() + i);
        return d;
    });

    useEffect(() => {
        /* ... fetchInitialData ... */
        async function fetchInitialData() {
            try {
                setLoading(true);
                setError(null);
                const tRes = await theaterService.getAllTheaters();
                setTheaters(tRes.data);
                if (tRes.data && tRes.data.length > 0) {
                    setActiveTheater(tRes.data[0].id);
                } else {
                    setActiveTheater(null);
                }
                const mRes = await movieService.getAllMovies();
                setMovies(mRes.data);
            } catch (err) {
                console.error("Error fetching theaters or movies:", err);
                setError("Failed to load initial theater or movie data.");
            } finally {
                setLoading(false);
            }
        }
        fetchInitialData();
    }, []);

    useEffect(() => {
        /* ... fetchShowtimes ... */
        async function fetchShowtimes() {
            if (!selectedDate) return;
            try {
                setLoading(true);
                setError(null);
                const dateString = selectedDate.toISOString().split("T")[0];
                const sRes = await showtimeService.getShowTimesByDate(dateString);
                setShowtimes(sRes.data || []);
            } catch (err) {
                console.error(
                    `Error fetching showtimes for date ${selectedDate}:`,
                    err
                );
                setError(
                    `Failed to load showtimes for ${selectedDate.toLocaleDateString()}.`
                );
                setShowtimes([]);
            } finally {
                setLoading(false);
            }
        }
        fetchShowtimes();
    }, [selectedDate]);

    const handleDateSelect = (d) => {
        /* ... */
        setSelectedDate(d);
        setShowCalendar(false);
    };
    const getShowtimesForMovieAndTheater = (movieId, theaterName) => {
        /* ... */
        return showtimes.filter(
            (st) => st.movieId === movieId && st.theaterName === theaterName
        );
    };
    const formatTime = (isoString) => {
        /* ... */
        if (!isoString) return "";
        try {
            const d = new Date(isoString);
            if (isNaN(d.getTime())) return "Invalid Time";
            return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        } catch (e) {
            return "Error";
        }
    };

    // --- Render Logic ---
    const showInitialLoading =
        loading && theaters.length === 0 && movies.length === 0;
    if (showInitialLoading) return <LoadingSpinner />;
    if (error && theaters.length === 0) {
        /* ... error display ... */
        return (
            <div className="theatres-container error-message">
                <h1>Error</h1>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="theatres-container">
            <h1>Find Showtimes</h1>

            {/* ... (Date Picker JSX remains the same) ... */}
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

            {/* Loading/Error indicators */}
            {loading && !showInitialLoading && (
                <LoadingSpinner size="small" message="Loading showtimes..." />
            )}
            {error && theaters.length > 0 && (
                <div className="showtime-error-message">{error}</div>
            )}

            {/* Theater Tabs and Content */}
            {theaters.length > 0 ? (
                <div className="theaters-section">
                    {/* ====== CHANGE 1: Add role="tablist" ====== */}
                    <div className="theater-tabs" role="tablist" aria-label="Theaters">
                        {theaters.map((th) => (
                            <button
                                key={th.id}
                                // ====== CHANGE 2: Add role="tab" ======
                                role="tab"
                                // ====== CHANGE 3: Add id for association ======
                                id={`tab-${th.id}`}
                                className={`theater-tab ${
                                    activeTheater === th.id ? "theater-tab-active" : ""
                                }`}
                                onClick={() => setActiveTheater(th.id)}
                                // ====== aria-selected is now VALID on role="tab" ======
                                aria-selected={activeTheater === th.id}
                                // ====== CHANGE 4: Link tab to its panel ======
                                aria-controls={`panel-${th.id}`}
                                // Optional: Add tabIndex for keyboard navigation
                                tabIndex={activeTheater === th.id ? 0 : -1}
                            >
                                {th.name}
                            </button>
                        ))}
                    </div>

                    {/* Theater Content Area */}
                    {theaters.map((theater) => (
                        <div
                            key={theater.id}
                            // ====== CHANGE 5: Add id for association ======
                            id={`panel-${theater.id}`}
                            className={`theater-content ${
                                activeTheater === theater.id ? "theater-content-active" : ""
                            }`}
                            // ====== role="tabpanel" should already be here ======
                            role="tabpanel"
                            // ====== CHANGE 6: Link panel back to its tab ======
                            aria-labelledby={`tab-${theater.id}`}
                            hidden={activeTheater !== theater.id}
                        >
                            {/* Render content only if this is the active theater */}
                            {activeTheater === theater.id && (
                                // ... (Card, CardContent, Movie List JSX remains the same) ...
                                <Card className="theater-card">
                                    <CardContent className="theater-card-content">
                                        <div className="theater-address">
                                            {theater.address}
                                            {theater.distance && ` • ${theater.distance}`}
                                        </div>
                                        <div className="movies-list">
                                            {movies.map((movie) => {
                                                const relevantShowtimes =
                                                    getShowtimesForMovieAndTheater(
                                                        movie.id,
                                                        theater.name
                                                    );
                                                if (relevantShowtimes.length === 0) return null;
                                                return (
                                                    <div key={movie.id} className="movie-item">
                                                        {/* Movie Info */}
                                                        <div className="movie-info-container">
                                                            <div className="movie-poster-container">
                                                                <img
                                                                    src={
                                                                        movie.posterImageUrl || "/placeholder.svg"
                                                                    }
                                                                    alt={`${movie.title} poster`}
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
                                                        {/* Showtimes List */}
                                                        <div className="showtimes-list">
                                                            {relevantShowtimes.map((st) => (
                                                                <Link
                                                                    key={st.id}
                                                                    to={`/showtimes/${st.id}/seats`}
                                                                    className="showtime-link"
                                                                >
                                                                    <Button
                                                                        variant="outline"
                                                                        className="showtime-button"
                                                                        aria-label={`Select ${formatTime(
                                                                            st.startTime
                                                                        )} showtime for ${movie.title} in ${
                                                                            st.screenType || "Standard"
                                                                        }`}
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
                                            {movies.filter(
                                                    (m) =>
                                                        getShowtimesForMovieAndTheater(m.id, theater.name)
                                                            .length > 0
                                                ).length === 0 &&
                                                !loading && (
                                                    <p className="no-showtimes-message">
                                                        No showtimes available for this date at{" "}
                                                        {theater.name}.
                                                    </p>
                                                )}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                !loading &&
                !error && <p className="no-theaters-message">No theaters found.</p>
            )}
        </div>
    );
}

export default Tickets;