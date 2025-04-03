// custom hook for fetching movie details

import { useState, useEffect } from "react";
import { movieService, showtimeService } from "../services/api";

export const useFetchMovieDetails = (movieId, selectedDate) => {
  const [movie, setMovie] = useState(null);
  const [theaters, setTheaters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const fetchMovieDetails = async () => {
      try {
        // Fetch movie details
        const movieRes = await movieService.getMovieById(movieId);
        if (isMounted) setMovie(movieRes.data);

        // Fetch all showtimes and filter for this movie
        const stRes = await showtimeService.getAllShowTimes();
        const stData = stRes.data.filter(
          (st) => st.movieId === parseInt(movieId)
        );

        // Filter by selectedDate (expects date as "YYYY-MM-DD")
        const selectedDateString = selectedDate.toISOString().split("T")[0];
        const filteredShowtimes = stData.filter(
          (st) => st.date === selectedDateString
        );
        const showtimesToUse = filteredShowtimes.length
          ? filteredShowtimes
          : stData;

        // Group showtimes by theater
        const theaterMap = new Map();
        showtimesToUse.forEach((st) => {
          if (st.theaterName) {
            if (!theaterMap.has(st.theaterName)) {
              theaterMap.set(st.theaterName, {
                name: st.theaterName,
                address: st.theaterAddress || "Address not provided",
                distance: "2.5 miles",
                showtimes: [],
              });
            }
            theaterMap.get(st.theaterName).showtimes.push({
              id: st.id,
              startTime: st.startTime,
              screenType: st.screenType,
              price: st.price,
            });
          }
        });

        if (isMounted) setTheaters(Array.from(theaterMap.values()));
      } catch (err) {
        console.error("Failed to fetch movie details:", err);
        if (isMounted)
          setError("Failed to load movie details. Please try again later.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (movieId) {
      fetchMovieDetails();
    }

    return () => {
      isMounted = false;
    };
  }, [movieId, selectedDate]);

  return { movie, theaters, loading, error };
};
