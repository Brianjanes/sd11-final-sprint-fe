// FILE: src/components/FeaturedMovies/FeaturedMovies.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Clock, Star } from "lucide-react";
import { Button } from "../ui/Button/Button";
import { movieService } from "../../services/api";
import "./FeaturedMovies.css";

export function FeaturedMovies({ type = "now-playing" }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    if (type === "coming-soon") {
      // GET /api/movies/upcoming
      movieService
        .getUpcomingMovies()
        .then((res) => {
          if (isMounted) setMovies(res.data);
        })
        .catch((err) => {
          console.error(err);
          setError("Failed to load upcoming movies");
        })
        .finally(() => setLoading(false));
    } else {
      // "now-playing": fetch all, then filter by releaseDate <= today
      movieService
        .getAllMovies()
        .then((res) => {
          const allMovies = res.data;
          const today = new Date();
          const nowPlaying = allMovies.filter((m) => {
            // if movie has a releaseDate in ISO format: "2023-12-10"
            // compare to current date
            const movieDate = new Date(m.releaseDate);
            return movieDate <= today;
          });
          if (isMounted) setMovies(nowPlaying);
        })
        .catch((err) => {
          console.error(err);
          setError("Failed to load now-playing movies");
        })
        .finally(() => setLoading(false));
    }

    return () => {
      isMounted = false;
    };
  }, [type]);

  if (loading) return <div>Loading {type} movies...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!movies.length) return <div>No movies found.</div>;

  return (
    <div className="movies-grid">
      {movies.map((movie) => {
        const rating = movie.rating || "NR";
        const duration = movie.durationMinutes
          ? `${movie.durationMinutes} min`
          : "N/A";

        return (
          <div key={movie.id} className="movie-card">
            <Link to={`/movies/${movie.id}`} className="movie-poster-link">
              <img
                src={movie.posterImageUrl || "/placeholder.svg"}
                alt={movie.title}
                className="movie-poster"
              />
            </Link>

            <div className="movie-info">
              <h3 className="movie-title">{movie.title}</h3>
              <div className="movie-meta">
                <span className="movie-rating">{rating}</span>
                <div className="movie-duration">
                  <Clock className="duration-icon" />
                  <span>{duration}</span>
                </div>
                <div className="movie-rating-stars">
                  <Star className="star-icon" />
                  <span>4.5</span> {/* Hardcoded or remove */}
                </div>
              </div>

              {type === "coming-soon" && movie.releaseDate && (
                <p className="movie-release-date">
                  Coming {new Date(movie.releaseDate).toLocaleDateString()}
                </p>
              )}

              {/* "Get Tickets" -> MovieDetailPage -> seat picking */}
              <Link to={`/movies/${movie.id}`}>
                <Button className="movie-button">Get Tickets</Button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
