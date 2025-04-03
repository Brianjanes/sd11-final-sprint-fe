// src/services/api.js

import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptor for JWT token if needed
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const movieService = {
  getAllMovies: () => api.get("/movies"),
  getMovieById: (id) => api.get(`/movies/${id}`),
  getNowShowingMovies: () => api.get("/movies/now-showing"),
  getComingSoonMovies: () => api.get("/movies/coming-soon"),
};

export const theaterService = {
  getAllTheaters: () => api.get("/theaters"),
  getTheaterById: (id) => api.get(`/theaters/${id}`),
};

export const showtimeService = {
  getShowtimesByMovie: (movieId) => api.get(`/movies/${movieId}/showtimes`),
  getShowtimesByTheater: (theaterId) => api.get(`/theaters/${theaterId}/showtimes`),
  getAvailableSeats: (showtimeId) => api.get(`/showtimes/${showtimeId}/seats`),

  // NEW line: fetch a single showtime, returning movieTitle & theaterName, etc.
  getShowtimeById: (showtimeId) => api.get(`/showtimes/${showtimeId}`),
};

export const seatService = {
  // GET /api/seats/showtime/{showtimeId}/available
  getSeatsByShowtime: (showtimeId) => api.get(`/seats/showtime/${showtimeId}/available`),
};

export const bookingService = {
  createBooking: (bookingData) => api.post("/bookings", bookingData),
  getBookingById: (id) => api.get(`/bookings/${id}`),
};

export const authService = {
  login: (credentials) => api.post("/auth/login", credentials),
  register: (userData) => api.post("/auth/register", userData),
  getCurrentUser: () => api.get("/auth/me"),
};

export default api;
