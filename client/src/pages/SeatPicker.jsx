import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button/Button";
import { seatService } from "../services/api";
import "./SeatPicker.css";

export default function SeatPicker() {
  const { showtimeId } = useParams();
  const [seats, setSeats] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        setLoading(true);
        // GET /api/seats/showtime/{showtimeId}/available
        const res = await seatService.getSeatsByShowtime(showtimeId);
        setSeats(res.data);
      } catch (err) {
        console.error("Failed to fetch seats:", err);
        setError("Failed to load seats. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchSeats();
  }, [showtimeId]);

  const toggleSeat = (seatId) => {
    setSelected((prev) => {
      if (prev.includes(seatId)) {
        return prev.filter((id) => id !== seatId);
      } else {
        return [...prev, seatId];
      }
    });
  };

  const handleContinue = () => {
    // Navigate to booking page with showtimeId & selected seats
    navigate("/booking", {
      state: { showtimeId, seats: selected },
    });
  };

  if (loading) {
    return <div className="text-center p-4">Loading seats...</div>;
  }
  if (error) {
    return <div className="text-center p-4 text-red-600">{error}</div>;
  }

  return (
    <div className="seat-picker-container">
      <h2>Select Your Seats</h2>
      <div className="seats-grid">
        {seats.map((seat) => (
          <button
            key={seat.id}
            className={`seat ${selected.includes(seat.id) ? "selected" : ""}`}
            disabled={!seat.available}
            onClick={() => toggleSeat(seat.id)}
          >
            {seat.rowLetter}
            {seat.seatNumber}
          </button>
        ))}
      </div>
      <div className="selected-summary">
        <p>Selected Seats: {selected.length ? selected.join(", ") : "None"}</p>
        <Button onClick={handleContinue} disabled={!selected.length}>
          Continue
        </Button>
      </div>
    </div>
  );
}
