// FILE: src/pages/Movies.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/Button/Button";
import { useFetchMovies } from "../../hooks/useFetchMovies";
import LoadingSpinner from "../../components/ui/LoadingSpinner/LoadingSpinner";
import "./Movies.css";

function Movies() {
  const { movies, loading, error } = useFetchMovies("all");

  if (loading) {
    return (
      <div className="loading-spinner-container loading-spinner-container--fullpage">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="movies-container">
      <h1 className="movies-title">Movies</h1>
      <div className="movies-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={movie.posterImageUrl || "/placeholder.svg"}
              alt={movie.title}
              className="movie-poster"
            />
            <h2 className="movie-title">{movie.title}</h2>
            <p>{movie.rating}</p>
            <Link to={`/movies/${movie.id}`}>
              <Button>Get Tickets</Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Movies;
