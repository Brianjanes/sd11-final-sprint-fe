// FILE: src/components/MovieCarousel/MovieCarousel.jsx
"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Clock, Star } from "lucide-react";
import { Button } from "../ui/Button/Button";
import { Link } from "react-router-dom";
import { movieService } from "../../services/api";
import "./MovieCarousel.css";

export function MovieCarousel() {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  // 1) fetch now-playing, then pick 2 for "featured"
  useEffect(() => {
    movieService
      .getAllMovies()
      .then((res) => {
        const all = res.data;
        const today = new Date();
        const nowPlaying = all.filter(
          (m) => new Date(m.releaseDate) <= today
        );
        // pick first 2 as "featured" 
        const featured = nowPlaying.slice(0, 2);
        setSlides(featured);
      })
      .catch((err) => console.error("Failed to fetch featured movies:", err))
      .finally(() => setLoading(false));
  }, []);

  // 2) auto-cycle the slides
  useEffect(() => {
    if (!slides.length) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (loading) return <div>Loading featured movies...</div>;
  if (!slides.length) return <div>No featured movies found.</div>;

  return (
    <div className="carousel-container">
      {slides.map((movie, index) => {
        const isActive = index === currentSlide;
        const duration = movie.durationMinutes
          ? `${movie.durationMinutes} min`
          : "N/A";
        const rating = movie.rating || "NR";

        return (
          <div
            key={movie.id}
            className={`carousel-slide ${isActive ? "slide-active" : "slide-inactive"}`}
          >
            <div className="carousel-gradient" />
            <img
              src={movie.posterImageUrl || "/placeholder.svg"}
              alt={movie.title}
              className="carousel-image"
            />
            <div className="carousel-content">
              <div className="carousel-info">
                {/* If genre is comma-separated */}
                <div className="genre-tags">
                  {movie.genre?.split(",").map((g) => (
                    <span key={g} className="genre-tag">
                      {g.trim()}
                    </span>
                  ))}
                </div>
                <h1 className="movie-headline">{movie.title}</h1>
                <div className="movie-details">
                  <span className="movie-rating-badge">{rating}</span>
                  <div className="movie-duration-container">
                    <Clock className="duration-icon-large" />
                    <span>{duration}</span>
                  </div>
                  <div className="movie-stars-container">
                    <Star className="star-icon-large" />
                    <span>4.8/5</span> {/* or remove */}
                  </div>
                </div>
                <p className="movie-description">{movie.description}</p>
                <div className="carousel-actions">
                  <Link to={`/movies/${movie.id}`}>
                    <Button size="lg">Get Tickets</Button>
                  </Link>
                  {movie.trailerUrl && (
                    <Button size="lg" variant="outline">
                      Watch Trailer
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <Button variant="ghost" className="carousel-prev-button" onClick={prevSlide}>
        <ChevronLeft className="carousel-arrow" />
      </Button>
      <Button variant="ghost" className="carousel-next-button" onClick={nextSlide}>
        <ChevronRight className="carousel-arrow" />
      </Button>

      <div className="carousel-indicators">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`carousel-indicator ${i === currentSlide ? "indicator-active" : ""}`}
            onClick={() => setCurrentSlide(i)}
          />
        ))}
      </div>
    </div>
  );
}
