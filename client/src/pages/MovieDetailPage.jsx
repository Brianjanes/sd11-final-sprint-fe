// FILE: src/pages/MovieDetailPage.jsx

import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { CalendarIcon, Clock, Share, Star } from "lucide-react";
import { Button } from "../components/ui/Button/Button";
import { Card, CardContent } from "../components/ui/Card/Card";
import { movieService, showtimeService } from "../services/api";

function MovieDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [theaters, setTheaters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Date picker state (default set to a date matching your DB)
  const [selectedDate, setSelectedDate] = useState(new Date("2025-04-10"));
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarDates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });

  // State to control trailer display
  const [showTrailer, setShowTrailer] = useState(false);

  // Inline style objects for a polished look
  const styles = {
    page: {
      fontFamily: "Roboto, sans-serif",
      backgroundColor: "#f7f7f7",
      color: "#333",
      paddingBottom: "2rem",
    },
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "0 1rem",
    },
    banner: {
      position: "relative",
      height: "350px",
      width: "100%",
      overflow: "hidden",
    },
    bannerImg: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
      zIndex: 10,
    },
    headerContent: {
      position: "relative",
      zIndex: 20,
      marginTop: "-2rem",
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem",
    },
    posterWrapper: {
      width: "200px",
      height: "300px",
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    },
    posterImg: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    info: {
      flex: 1,
      paddingTop: "1rem",
    },
    genres: {
      display: "flex",
      gap: "0.5rem",
      marginBottom: "0.75rem",
    },
    genreBadge: {
      backgroundColor: "#e0e0e0",
      color: "#555",
      padding: "0.3rem 0.6rem",
      borderRadius: "4px",
      fontSize: "0.75rem",
    },
    title: {
      fontSize: "2rem",
      fontWeight: "bold",
      marginBottom: "0.5rem",
    },
    meta: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      marginBottom: "1rem",
      fontSize: "1rem",
    },
    metaBadge: {
      backgroundColor: "#ff9800",
      color: "#fff",
      padding: "0.3rem 0.6rem",
      borderRadius: "4px",
      fontSize: "0.875rem",
    },
    description: {
      fontSize: "1rem",
      marginBottom: "1.5rem",
    },
    btnGroup: {
      display: "flex",
      gap: "1rem",
    },
    calendarButton: {
      backgroundColor: "#fff",
      border: "1px solid #ddd",
      padding: "0.5rem 1rem",
      borderRadius: "4px",
      fontSize: "1rem",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    calendarDropdown: {
      position: "absolute",
      zIndex: 100,
      marginTop: "0.5rem",
      padding: "1rem",
      backgroundColor: "#fff",
      border: "1px solid #ddd",
      borderRadius: "4px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    },
    calendarGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(7, 1fr)",
      gap: "0.5rem",
    },
    calendarDay: {
      padding: "0.5rem",
      backgroundColor: "#f0f0f0",
      border: "none",
      borderRadius: "4px",
      fontSize: "0.875rem",
      cursor: "pointer",
    },
    activeDay: {
      backgroundColor: "#3f51b5",
      color: "#fff",
    },
    theaterCard: {
      marginBottom: "1.5rem",
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    },
    theaterName: {
      fontSize: "1.25rem",
      fontWeight: "bold",
    },
    theaterAddress: {
      fontSize: "0.9rem",
      color: "#666",
    },
    showtimeBtn: {
      fontSize: "0.85rem",
      padding: "0.4rem 0.8rem",
      borderRadius: "4px",
      marginRight: "0.5rem",
      marginBottom: "0.5rem",
    },
    trailerContainer: {
      marginTop: "1.5rem",
      display: "flex",
      justifyContent: "center",
    },
    trailerIframe: {
      width: "560px",
      height: "315px",
      border: "none",
    },
  };

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        setLoading(true);
        // Fetch movie details
        const movieRes = await movieService.getMovieById(id);
        setMovie(movieRes.data);

        // Fetch showtimes for this movie
        const stRes = await showtimeService.getShowtimesByMovie(id);
        const stData = stRes.data;

        // Filter by selectedDate (expects date as "YYYY-MM-DD")
        const selectedDateString = selectedDate.toISOString().split("T")[0];
        const filteredShowtimes = stData.filter((st) => st.date === selectedDateString);
        const showtimesToUse = filteredShowtimes.length ? filteredShowtimes : stData;

        // Group showtimes by theater using theaterName and theaterAddress from your DTO
        const theaterMap = new Map();
        showtimesToUse.forEach((st) => {
          if (st.theaterName) {
            if (!theaterMap.has(st.theaterName)) {
              theaterMap.set(st.theaterName, {
                name: st.theaterName,
                address: st.theaterAddress || "Address not provided",
                distance: "2.5 miles",
                showtimes: [],
              });
            }
            theaterMap.get(st.theaterName).showtimes.push({
              id: st.id,
              startTime: st.startTime,
              screenType: st.screenType,
              price: st.price,
            });
          }
        });
        setTheaters(Array.from(theaterMap.values()));
      } catch (err) {
        console.error("Failed to fetch movie details:", err);
        setError("Failed to load movie details. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchMovieDetails();
  }, [id, selectedDate]);

  const handleDateSelect = (d) => {
    setSelectedDate(d);
    setShowCalendar(false);
  };

  const formatTime = (isoString) => {
    if (!isoString) return "";
    const d = new Date(isoString);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        Loading movie details...
      </div>
    );
  }

  if (error) {
    return <div style={{ color: "red", padding: "1rem", textAlign: "center" }}>{error}</div>;
  }

  if (!movie) {
    return <div style={{ padding: "1rem", textAlign: "center" }}>Movie not found</div>;
  }

  return (
    <div style={styles.page}>
      <main>
        {/* Movie Header */}
        <section style={{ position: "relative" }} className="movie-header">
          <div style={styles.banner} className="movie-banner">
            <div style={styles.overlay} />
            <img
              src={movie.posterImageUrl || "https://via.placeholder.com/1200x600"}
              alt={movie.title}
              style={styles.bannerImg}
            />
          </div>
          <div style={{ ...styles.container, display: "flex", flexDirection: "column", gap: "1.5rem", marginTop: "-2rem" }}>
            <div style={styles.posterWrapper} className="movie-poster-wrapper">
              <img
                src={movie.posterImageUrl || "https://via.placeholder.com/300x450"}
                alt={movie.title}
                style={styles.posterImg}
              />
            </div>
            <div style={styles.info} className="movie-info">
              <div style={styles.genres} className="genres">
                {movie.genre &&
                  movie.genre.split(",").map((g) => (
                    <span key={g} style={styles.genreBadge}>
                      {g.trim()}
                    </span>
                  ))}
              </div>
              <h1 style={styles.title}>{movie.title}</h1>
              <div style={styles.meta} className="movie-meta">
                <span style={styles.metaBadge}>{movie.rating}</span>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Clock style={{ height: "16px", width: "16px" }} />
                  <span>{movie.durationMinutes} min</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Star style={{ height: "16px", width: "16px" }} />
                  <span>4.5</span>
                </div>
              </div>
              <p style={styles.description}>{movie.description}</p>
              <div style={styles.btnGroup}>
                <Button size="lg">Get Tickets</Button>
                {movie.trailerUrl && (
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => setShowTrailer((prev) => !prev)}
                  >
                    {showTrailer ? "Hide Trailer" : "Watch Trailer"}
                  </Button>
                )}
                <Button variant="ghost" size="icon" style={{ borderRadius: "50%" }}>
                  <Share style={{ height: "16px", width: "16px" }} />
                  <span className="sr-only">Share</span>
                </Button>
              </div>
              {showTrailer && movie.trailerUrl && (
                <div style={styles.trailerContainer}>
                  <iframe
                    style={styles.trailerIframe}
                    src={movie.trailerUrl}
                    title="Trailer"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Date Picker for Showtimes */}
        <section style={styles.container} className="showtimes-filter">
          <div style={{ position: "relative", marginBottom: "1.5rem" }}>
            <Button
              size="lg"
              variant="outline"
              style={styles.calendarButton}
              onClick={() => setShowCalendar(!showCalendar)}
            >
              <CalendarIcon style={{ height: "16px", width: "16px", marginRight: "0.5rem" }} />
              <span>
                {selectedDate.toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </Button>
            {showCalendar && (
              <div style={styles.calendarDropdown}>
                <div style={styles.calendarGrid}>
                  {calendarDates.map((d, i) => (
                    <button
                      key={i}
                      style={
                        selectedDate.toDateString() === d.toDateString()
                          ? { ...styles.calendarDay, ...styles.activeDay }
                          : styles.calendarDay
                      }
                      onClick={() => handleDateSelect(d)}
                    >
                      {d.getDate()}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Showtimes Section */}
        <section style={styles.container} className="showtimes-section">
          <h2 style={{ fontSize: "1.75rem", fontWeight: "bold", marginBottom: "1rem" }}>
            Showtimes & Tickets
          </h2>
          {theaters.length === 0 ? (
            <div>No showtimes available for this movie.</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {theaters.map((theater) => (
                <Card key={theater.name} style={styles.theaterCard}>
                  <CardContent style={{ padding: "1.5rem" }}>
                    <div style={{ marginBottom: "1rem" }}>
                      <h3 style={styles.theaterName}>{theater.name}</h3>
                      <p style={styles.theaterAddress}>
                        {theater.address} • {theater.distance}
                      </p>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                      {theater.showtimes &&
                        theater.showtimes.map((st) => (
                          <Button
                            key={st.id}
                            variant="outline"
                            style={styles.showtimeBtn}
                            onClick={() => navigate(`/showtimes/${st.id}/seats`)}
                          >
                            <div>
                              <div>{formatTime(st.startTime)}</div>
                              <div style={{ fontSize: "0.75rem", color: "#888" }}>
                                {st.screenType || "Standard"}
                              </div>
                            </div>
                          </Button>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default MovieDetailPage;
