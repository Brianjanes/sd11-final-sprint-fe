// custom hook for fetching movies

import { useState, useEffect } from "react";
import { movieService } from "../services/api";

export const useFetchMovies = (type = "all") => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const fetchMovies = async () => {
      try {
        let response;

        switch (type) {
          case "now-playing":
            response = await movieService.getAllMovies();
            const allMovies = response.data;
            const today = new Date();
            const nowPlaying = allMovies.filter(
              (m) => new Date(m.releaseDate) <= today
            );
            if (isMounted) setMovies(nowPlaying);
            break;
          case "upcoming":
            response = await movieService.getComingSoonMovies();
            if (isMounted) setMovies(response.data);
            break;
          default:
            response = await movieService.getAllMovies();
            if (isMounted) setMovies(response.data);
        }
      } catch (err) {
        console.error("Error fetching movies:", err);
        if (isMounted) setError(`Failed to load ${type} movies`);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchMovies();

    return () => {
      isMounted = false;
    };
  }, [type]);

  return { movies, loading, error };
};
