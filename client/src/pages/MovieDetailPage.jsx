// src/pages/MovieDetailPage.jsx
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  CalendarIcon,
  Clock,
  Film,
  MapPin,
  Search,
  Share,
  Star,
  User,
} from "lucide-react";
import { Button } from "../components/ui/Button/Button";
import { Card, CardContent } from "../components/ui/Card/Card";
import { movieService, showtimeService } from "../services/api";

function MovieDetailPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [theaters, setTheaters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  
  // Hook to navigate programmatically
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const response = await movieService.getMovieById(id);
        setMovie(response.data);

        // Fetch showtimes for this movie
        const showtimesResponse = await showtimeService.getShowtimesByMovie(id);

        // Group showtimes by theater
        const theaterMap = new Map();

        showtimesResponse.data.forEach((showtime) => {
          const theaterId = showtime.screen.theater.id;

          if (!theaterMap.has(theaterId)) {
            theaterMap.set(theaterId, {
              id: theaterId,
              name: showtime.screen.theater.name,
              address: showtime.screen.theater.address,
              distance: "2.5 miles", // This would be calculated based on user location
              showtimes: [],
            });
          }

          theaterMap.get(theaterId).showtimes.push({
            id: showtime.id,
            time: new Date(showtime.startTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            format: showtime.screen.screenType,
          });
        });

        setTheaters(Array.from(theaterMap.values()));
      } catch (err) {
        console.error("Failed to fetch movie details:", err);
        setError("Failed to load movie details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading movie details...
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 p-4 text-center">{error}</div>;
  }

  if (!movie) {
    return <div className="text-center p-4">Movie not found</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="relative">
          <div className="relative h-[300px] md:h-[400px] w-full">
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
            <img
              src={movie.posterImageUrl || "https://via.placeholder.com/1200x600"}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="container px-4 md:px-6 relative z-20 -mt-32">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="relative w-[200px] h-[300px] shrink-0 mx-auto md:mx-0">
                <img
                  src={
                    movie.posterImageUrl ||
                    "https://via.placeholder.com/300x450"
                  }
                  alt={movie.title}
                  className="w-full h-full object-cover rounded-md shadow-lg"
                />
              </div>
              <div className="flex-1 pt-4 md:pt-32">
                <div className="flex gap-2 mb-2">
                  {movie.genre &&
                    movie.genre.split(",").map((genre) => (
                      <span
                        key={genre}
                        className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs"
                      >
                        {genre.trim()}
                      </span>
                    ))}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {movie.title}
                </h1>
                <div className="flex items-center gap-4 mb-4 text-sm">
                  <span className="bg-primary text-primary-foreground px-2 py-1 rounded-md">
                    {movie.rating}
                  </span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{movie.durationMinutes} min</span>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6">
                  {movie.description}
                </p>
                <div className="flex gap-4">
                  <Button size="lg">Get Tickets</Button>
                  {movie.trailerUrl && (
                    <Button size="lg" variant="outline">
                      Watch Trailer
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Share className="h-4 w-4" />
                    <span className="sr-only">Share</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container px-4 py-8 md:px-6 md:py-12">
          <h2 className="text-2xl font-bold mb-6">Showtimes & Tickets</h2>
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="relative">
              <Button
                variant="outline"
                className="justify-start text-left font-normal w-[240px]"
                onClick={() => setShowCalendar(!showCalendar)}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                <span>
                  {selectedDate.toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </Button>
              {showCalendar && (
                <div className="absolute z-10 mt-1 p-4 bg-white border rounded-md shadow-lg">
                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: 14 }).map((_, i) => {
                      const date = new Date();
                      date.setDate(date.getDate() + i);
                      return (
                        <button
                          key={i}
                          className={`p-2 text-center rounded-md ${
                            selectedDate.toDateString() === date.toDateString()
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-muted"
                          }`}
                          onClick={() => {
                            setSelectedDate(date);
                            setShowCalendar(false);
                          }}
                        >
                          {date.getDate()}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Format tabs */}
          <div className="mb-6">
            <div className="flex border-b">
              <button className="px-4 py-2 border-b-2 border-primary">
                Standard
              </button>
              <button className="px-4 py-2">IMAX</button>
              <button className="px-4 py-2">3D</button>
              <button className="px-4 py-2">All Formats</button>
            </div>
          </div>

          <div className="space-y-6">
            {theaters.map((theater) => (
              <Card key={theater.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{theater.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {theater.address} • {theater.distance}
                      </p>
                    </div>
                    <Button variant="outline" className="mt-2 md:mt-0">
                      View Theater Details
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {theater.showtimes.map((showtime) => (
                      <Button
                        key={showtime.id}
                        variant="outline"
                        className="h-auto py-2"
                        onClick={() =>
                          navigate(`/showtimes/${showtime.id}/seats`)
                        }
                      >
                        <div>
                          <div>{showtime.time}</div>
                          <div className="text-xs text-muted-foreground">
                            {showtime.format}
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default MovieDetailPage;
