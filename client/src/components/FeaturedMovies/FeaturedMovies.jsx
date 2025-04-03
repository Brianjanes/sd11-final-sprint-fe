// FILE: src/components/FeaturedMovies/FeaturedMovies.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Clock, Star } from "lucide-react";
import { Button } from "../ui/Button/Button";
import { useFetchMovies } from "../../hooks/useFetchMovies";
import "./FeaturedMovies.css";
import LoadingSpinner from "../ui/LoadingSpinner/LoadingSpinner";

export function FeaturedMovies({ type = "now-playing" }) {
  const { movies, loading, error } = useFetchMovies(type);

  if (loading)
    return (
      <div className="loading-spinner-container loading-spinner-container--section">
        <LoadingSpinner />
      </div>
    );
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
                  <span>4.5</span>
                </div>
              </div>

              {type === "coming-soon" && movie.releaseDate && (
                <p className="movie-release-date">
                  Coming {new Date(movie.releaseDate).toLocaleDateString()}
                </p>
              )}

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
