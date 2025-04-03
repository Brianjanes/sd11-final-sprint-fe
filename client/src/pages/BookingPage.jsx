import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { bookingService, showtimeService } from "../services/api";
import { Button } from "../components/ui/Button/Button";

export default function BookingPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  // We passed these from SeatPicker: { showtimeId, seats }
  const showtimeId = state?.showtimeId;
  const selectedSeats = state?.seats;

  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // We'll store these from the showtime fetch
  const [movieTitle, setMovieTitle] = useState("");
  const [theaterName, setTheaterName] = useState("");
  const [price, setPrice] = useState("Paid with Hopes & Dreams");

  useEffect(() => {
    if (!showtimeId || !selectedSeats) {
      setError("No showtime or seats selected. Please go back.");
      return;
    }

    // 1) Fetch showtime details to get movieTitle & theaterName
    showtimeService
      .getShowtimeById(showtimeId)
      .then((res) => {
        const data = res.data;
        setMovieTitle(data.movieTitle || "Unknown Movie");
        setTheaterName(data.theaterName || "Unknown Theater");
        // If you want to use actual price from showtime, do:
        // setPrice(`$${data.price} (Hopes & Dreams)`);
      })
      .catch((err) => {
        console.error("Failed to fetch showtime details:", err);
        setError("Unable to fetch showtime info. Please try again.");
      });
  }, [showtimeId, selectedSeats]);

  const handlePurchase = async () => {
    if (!showtimeId || !selectedSeats.length) {
      setError("No valid seats to purchase.");
      return;
    }
    try {
      setIsSubmitting(true);
      const bookingData = {
        showTimeId: showtimeId,
        seatIds: selectedSeats,
      };
      const response = await bookingService.createBooking(bookingData);

      // On success, navigate to the ticket page
      navigate("/ticket", {
        state: {
          bookingId: response.data.bookingId,
          bookingTime: response.data.bookingTime,
          ticketNumber: response.data.ticketNumber,
          bookedSeatIds: response.data.bookedSeatIds,
          price,
          movieTitle,
          theaterName,
          showtimeId,
        },
      });
    } catch (err) {
      console.error("Failed to create booking:", err);
      setError("Booking failed. Maybe seats are already taken?");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  if (!showtimeId || !selectedSeats) {
    return <div className="p-4 text-center">Loading booking details...</div>;
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2>Review Your Booking</h2>
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "1rem",
          marginBottom: "1rem",
        }}
      >
        <p><strong>Movie:</strong> {movieTitle}</p>
        <p><strong>Theater:</strong> {theaterName}</p>
        <p><strong>Showtime ID:</strong> {showtimeId}</p>
        <p><strong>Seats:</strong> {selectedSeats.join(", ")}</p>
        <p><strong>Price:</strong> {price}</p>
      </div>
      <Button onClick={handlePurchase} disabled={isSubmitting}>
        {isSubmitting ? "Purchasing..." : "Purchase"}
      </Button>
    </div>
  );
}
