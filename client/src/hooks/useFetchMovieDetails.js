// custom hook for fetching movie details

import { useState, useEffect } from "react";
import { movieService, showtimeService } from "../services/api";

const useFetchMovieDetails = (movieId, selectedDate) => {
  const [movie, setMovie] = useState(null);
  const [theaters, setTheaters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Map screens to theaters (configuration mapping)
  const screenToTheaterMap = {
    1: {
      id: "theater-1",
      name: "Cineplex Avalon Mall",
      address: "48 Kenmount Rd",
    },
    2: {
      id: "theater-1",
      name: "Cineplex Avalon Mall",
      address: "48 Kenmount Rd",
    },
    3: {
      id: "theater-1",
      name: "Cineplex Avalon Mall",
      address: "48 Kenmount Rd",
    },
    4: {
      id: "theater-2",
      name: "Cineplex Sobeys Square",
      address: "35 Hebron Way",
    },
    5: {
      id: "theater-2",
      name: "Cineplex Sobeys Square",
      address: "35 Hebron Way",
    },
    6: {
      id: "theater-2",
      name: "Cineplex Sobeys Square",
      address: "35 Hebron Way",
    },
  };

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch movie details
        const movieData = await movieService.getMovieById(movieId);
        if (!isMounted) return;

        if (!movieData) {
          setError("Movie not found");
          setIsLoading(false);
          return;
        }

        setMovie(movieData);

        // Fetch all showtimes
        const allShowtimes = await showtimeService.getAllShowTimes();
        if (!isMounted) return;

        console.log("All showtimes:", allShowtimes);

        // Filter showtimes for this movie
        let movieShowtimes = allShowtimes.filter(
          (showtime) => String(showtime.movieId) === String(movieId)
        );

        console.log("Movie showtimes before date filter:", movieShowtimes);

        // Filter by selected date
        movieShowtimes = movieShowtimes.filter(
          (showtime) => showtime.date === selectedDate
        );

        console.log("Movie showtimes after date filter:", movieShowtimes);

        // If no showtimes for the selected date, use a fallback date for testing
        if (movieShowtimes.length === 0 && selectedDate !== "2025-04-02") {
          console.log("No showtimes for selected date, trying fallback date");
          movieShowtimes = allShowtimes.filter(
            (showtime) =>
              String(showtime.movieId) === String(movieId) &&
              showtime.date === "2025-04-02"
          );
        }

        // Group showtimes by theater
        const theaterMap = new Map();

        movieShowtimes.forEach((showtime) => {
          const screenId = showtime.screenId;
          const theater = screenToTheaterMap[screenId];

          if (!theater) {
            console.warn(`No theater found for screenId: ${screenId}`);
            return;
          }

          const theaterId = theater.id;

          if (!theaterMap.has(theaterId)) {
            theaterMap.set(theaterId, {
              ...theater,
              showtimes: [],
            });
          }

          theaterMap.get(theaterId).showtimes.push(showtime);
        });

        // Convert map to array and sort theaters alphabetically
        const theatersArray = Array.from(theaterMap.values()).sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        console.log("Organized theaters:", theatersArray);
        setTheaters(theatersArray);
      } catch (err) {
        if (isMounted) {
          console.error("Error fetching movie details:", err);
          setError("Failed to load movie details. Please try again later.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [movieId, selectedDate]); // Re-fetch when movieId or selectedDate changes

  return { movie, theaters, isLoading, error };
};

export default useFetchMovieDetails;
