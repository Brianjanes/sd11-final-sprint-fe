import { Link } from "react-router-dom";
import { Clock, Star } from "lucide-react";
import { Button } from "../ui/Button/Button";
import "./FeaturedMovies.css";

const nowPlayingMovies = [
  {
    id: 1,
    title: "Dune: Part Two",
    image: "https://via.placeholder.com/400x600",
    rating: "PG-13",
    duration: "166 min",
    stars: 4.8,
  },
  {
    id: 2,
    title: "Godzilla x Kong",
    image: "https://via.placeholder.com/400x600",
    rating: "PG-13",
    duration: "132 min",
    stars: 4.5,
  },
  {
    id: 3,
    title: "Kingdom of the Planet of the Apes",
    image: "https://via.placeholder.com/400x600",
    rating: "PG-13",
    duration: "145 min",
    stars: 4.6,
  },
  {
    id: 4,
    title: "The Fall Guy",
    image: "https://via.placeholder.com/400x600",
    rating: "PG-13",
    duration: "126 min",
    stars: 4.2,
  },
  {
    id: 5,
    title: "Civil War",
    image: "https://via.placeholder.com/400x600",
    rating: "R",
    duration: "109 min",
    stars: 4.4,
  },
];

const comingSoonMovies = [
  {
    id: 6,
    title: "Furiosa: A Mad Max Saga",
    image: "https://via.placeholder.com/400x600",
    rating: "R",
    duration: "150 min",
    stars: 4.7,
    releaseDate: "May 24, 2024",
  },
  {
    id: 7,
    title: "Inside Out 2",
    image: "https://via.placeholder.com/400x600",
    rating: "PG",
    duration: "110 min",
    stars: 4.9,
    releaseDate: "June 14, 2024",
  },
  {
    id: 8,
    title: "A Quiet Place: Day One",
    image: "https://via.placeholder.com/400x600",
    rating: "PG-13",
    duration: "120 min",
    stars: 4.5,
    releaseDate: "June 28, 2024",
  },
  {
    id: 9,
    title: "Despicable Me 4",
    image: "https://via.placeholder.com/400x600",
    rating: "PG",
    duration: "95 min",
    stars: 4.3,
    releaseDate: "July 3, 2024",
  },
  {
    id: 10,
    title: "Twisters",
    image: "https://via.placeholder.com/400x600",
    rating: "PG-13",
    duration: "135 min",
    stars: 4.1,
    releaseDate: "July 19, 2024",
  },
];

// You can update this based on your DB
const moviesWithShowtimes = [1, 2, 3, 4];

export function FeaturedMovies({ type = "now-playing" }) {
  const movies = type === "now-playing" ? nowPlayingMovies : comingSoonMovies;

  return (
    <div className="movies-grid">
      {movies.map((movie) => (
        <div key={movie.id} className="movie-card">
          <Link to={`/movies/${movie.id}`} className="movie-poster-link">
            <img
              src={movie.image || "/placeholder.svg"}
              alt={movie.title}
              className="movie-poster"
            />
          </Link>
          <div className="movie-info">
            <h3 className="movie-title">{movie.title}</h3>
            <div className="movie-meta">
              <span className="movie-rating">{movie.rating}</span>
              <div className="movie-duration">
                <Clock className="duration-icon" />
                <span>{movie.duration}</span>
              </div>
              <div className="movie-rating-stars">
                <Star className="star-icon" />
                <span>{movie.stars}</span>
              </div>
            </div>
            {type === "coming-soon" && movie.releaseDate && (
              <p className="movie-release-date">Coming {movie.releaseDate}</p>
            )}
            {type === "now-playing" ? (
              moviesWithShowtimes.includes(movie.id) ? (
                <Link to={`/movies/${movie.id}`}>
                  <Button className="movie-button">Get Tickets</Button>
                </Link>
              ) : (
                <Button className="movie-button" disabled>
                  Not Available
                </Button>
              )
            ) : (
              <Button className="movie-button">Pre-Order</Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}