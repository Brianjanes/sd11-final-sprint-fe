// FILE: src/pages/Movies.jsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { movieService } from "../services/api";
import { Button } from "../components/ui/Button/Button";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch movies when component mounts
  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        const res = await movieService.getAllMovies();
        setMovies(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load movies.");
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        Loading movies...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "red" }}>
        {error}
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>Movies</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "1rem",
        }}
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            style={{
              backgroundColor: "#fff",
              padding: "1rem",
              borderRadius: "8px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              textAlign: "center",
            }}
          >
            <img
              src={movie.posterImageUrl || "/placeholder.svg"}
              alt={movie.title}
              style={{
                width: "100%",
                height: "300px",
                objectFit: "cover",
                borderRadius: "4px",
              }}
            />
            <h2 style={{ margin: "0.5rem 0" }}>{movie.title}</h2>
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
