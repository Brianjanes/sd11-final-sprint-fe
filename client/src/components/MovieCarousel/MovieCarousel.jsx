"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Clock, Star } from "lucide-react";
import { Button } from "../ui/Button/Button";
import { Link } from "react-router-dom";
import { useFetchMovies } from "../../hooks/useFetchMovies";
import "./MovieCarousel.css";
import "./TrailerModal.css";
import LoadingSpinner from "../ui/LoadingSpinner/LoadingSpinner";

export function MovieCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { movies: allMovies, loading, error } = useFetchMovies("now-playing");
  const slides = allMovies.slice(0, 5);

  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [currentTrailerUrl, setCurrentTrailerUrl] = useState("");

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

  const handleWatchTrailer = (url) => {
    let embedUrl = url;
    if (url.includes("watch?v=")) {
      embedUrl = url.replace("watch?v=", "embed/");
    }
    setCurrentTrailerUrl(embedUrl);
    setIsTrailerOpen(true);
  };

  const closeTrailerModal = () => {
    setIsTrailerOpen(false);
    setCurrentTrailerUrl("");
  };

  if (loading)
    return (
      <div className="loading-spinner-container loading-spinner-container--section">
        <LoadingSpinner />
      </div>
    );
  if (error) return <div>Failed to load featured movies.</div>;
  if (!slides.length) return <div>No featured movies found.</div>;

  return (
    <>
      <div className="carousel-container">
        {slides.map((movie, index) => {
          const isActive = index === currentSlide;
          const duration = movie.durationMinutes ? `${movie.durationMinutes} min` : "N/A";
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
                      <span>4.8/5</span>
                    </div>
                  </div>
                  <p className="movie-description">{movie.description}</p>
                  <div className="carousel-actions">
                    <Link to={`/movies/${movie.id}`}>
                      <Button size="lg">Get Tickets</Button>
                    </Link>
                    {movie.trailerUrl && (
                      <Button
                        size="lg"
                        variant="outline"
                        onClick={() => handleWatchTrailer(movie.trailerUrl)}
                      >
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

      {isTrailerOpen && (
        <div className="trailer-modal-overlay" onClick={closeTrailerModal}>
          <div className="trailer-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="trailer-modal-close" onClick={closeTrailerModal}>
              &times;
            </button>
            <div className="trailer-video-container">
              <iframe
                width="100%"
                height="400"
                src={currentTrailerUrl}
                title="YouTube Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
