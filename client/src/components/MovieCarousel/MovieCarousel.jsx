// src/components/MovieCarousel.jsx
"use client";
import React from "react";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Clock, Star } from "lucide-react";
import { Button } from "../ui/Button/Button";
import "./MovieCarousel.css";

const featuredMovies = [
  {
    id: 1,
    title: "Dune: Part Two",
    description:
      "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    image: "https://via.placeholder.com/1920x1080",
    rating: "PG-13",
    duration: "166 min",
    stars: 4.8,
    genre: ["Sci-Fi", "Adventure"],
  },
  {
    id: 2,
    title: "The Batman",
    description:
      "When a new threat emerges and threatens Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    image: "https://via.placeholder.com/1920x1080",
    rating: "PG-13",
    duration: "176 min",
    stars: 4.7,
    genre: ["Action", "Crime", "Drama"],
  },
];

export function MovieCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredMovies.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + featuredMovies.length) % featuredMovies.length
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel-container">
      {featuredMovies.map((movie, index) => (
        <div
          key={movie.id}
          className={`carousel-slide ${
            index === currentSlide ? "slide-active" : "slide-inactive"
          }`}
        >
          <div className="carousel-gradient" />
          <img
            src={movie.image || "/placeholder.svg"}
            alt={movie.title}
            className="carousel-image"
          />
          <div className="carousel-content">
            <div className="carousel-info">
              <div className="genre-tags">
                {movie.genre.map((genre) => (
                  <span key={genre} className="genre-tag">
                    {genre}
                  </span>
                ))}
              </div>
              <h1 className="movie-headline">{movie.title}</h1>
              <div className="movie-details">
                <span className="movie-rating-badge">{movie.rating}</span>
                <div className="movie-duration-container">
                  <Clock className="duration-icon-large" />
                  <span>{movie.duration}</span>
                </div>
                <div className="movie-stars-container">
                  <Star className="star-icon-large" />
                  <span>{movie.stars}/5</span>
                </div>
              </div>
              <p className="movie-description">{movie.description}</p>
              <div className="carousel-actions">
                <Button size="lg">Get Tickets</Button>
                <Button size="lg" variant="outline">
                  Watch Trailer
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
      <Button
        variant="ghost"
        className="carousel-prev-button"
        onClick={prevSlide}
      >
        <ChevronLeft className="carousel-arrow" />
        <span className="visually-hidden">Previous slide</span>
      </Button>
      <Button
        variant="ghost"
        className="carousel-next-button"
        onClick={nextSlide}
      >
        <ChevronRight className="carousel-arrow" />
        <span className="visually-hidden">Next slide</span>
      </Button>
      <div className="carousel-indicators">
        {featuredMovies.map((_, index) => (
          <button
            key={index}
            className={`carousel-indicator ${
              index === currentSlide ? "indicator-active" : ""
            }`}
            onClick={() => setCurrentSlide(index)}
          >
            <span className="visually-hidden">Go to slide {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
