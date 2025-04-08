import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { showtimeService } from "../services/api";
import LoadingSpinner from "../components/ui/LoadingSpinner/LoadingSpinner";
import "./Tickets.css";

export default function Tickets() {
    const [showtimes, setShowtimes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchShowtimes = async () => {
            try {
                setLoading(true);
                // Assuming showtime API fetches all available showtimes
                const res = await showtimeService.getAllShowTimes();
                setShowtimes(res.data);
            } catch (err) {
                console.error("Error fetching showtimes:", err);
                setError("Failed to load showtimes. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchShowtimes();
    }, []);

    const handleShowtimeClick = (showtimeId) => {
        // Navigate to seat selection with the selected showtimeId
        navigate(`/seat-picker/${showtimeId}`);
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="tickets-page">
            <h1 className="title">Available Showtimes</h1>
            <div className="showtime-list">
                {showtimes.map((showtime) => (
                    <button
                        key={showtime.id}
                        className="showtime-button"
                        onClick={() => handleShowtimeClick(showtime.id)}
                    >
                        {showtime.movieTitle} - {new Date(showtime.startTime).toLocaleString()}
                    </button>
                ))}
            </div>
        </div>
    );
}
