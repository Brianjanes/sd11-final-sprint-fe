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
  
  // useNavigate to move to the next page (booking or confirmation)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        setLoading(true);
        // Call the backend endpoint: GET /api/seats/showtime/{showtimeId}/available
        const res = await seatService.getSeatsByShowtime(showtimeId);
        console.log("Fetched seats for showtime", showtimeId, ":", res.data);
        setSeats(res.data); // Expecting an array of seat objects
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
      const newSelected = prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId];
      console.log("Toggled seat", seatId, "new selected state:", newSelected);
      return newSelected;
    });
  };

  // For testing: Continue button always enabled.
  const handleContinue = () => {
    console.log("Continue clicked. Selected seats:", selected);
    // Navigate to the booking page, passing selected seats in state (or query parameters)
    navigate("/booking", { state: { showtimeId, seats: selected } });
  };

  if (loading) {
    return <div className="text-center p-4">Loading seats...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4 text-center">{error}</div>;
  }

  return (
    <div className="seat-picker-container">
      <h2>Select Your Seats</h2>
      <p>Showtime ID: {showtimeId}</p>
      <div className="seats-grid">
        {seats.length > 0 ? (
          seats.map((seat) => (
            <button
              key={seat.id}
              className={`seat ${selected.includes(seat.id) ? "selected" : ""}`}
              onClick={() => toggleSeat(seat.id)}
              disabled={!seat.available}
            >
              {seat.rowLetter}
              {seat.seatNumber}
            </button>
          ))
        ) : (
          <p>No seats available.</p>
        )}
      </div>
      <div className="selected-summary">
        <p>
          Selected Seats: {selected.length ? selected.join(", ") : "None"}
        </p>
        {/* For now, the Continue button is always enabled for testing */}
        <Button onClick={handleContinue}>Continue</Button>
      </div>
    </div>
  );
}
