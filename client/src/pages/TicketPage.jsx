import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "../components/ui/Button/Button";
import "./TicketPage.css"; // We'll create this CSS below

export default function TicketPage() {
  const { state } = useLocation();

  // Data from BookingPage
  const bookingId = state?.bookingId;
  const bookingTime = state?.bookingTime;
  const ticketNumber = state?.ticketNumber;
  const bookedSeatIds = state?.bookedSeatIds;
  const price = state?.price;
  const movieTitle = state?.movieTitle;
  const theaterName = state?.theaterName;
  const showtimeId = state?.showtimeId;

  if (!bookingId) {
    return (
      <div className="text-center p-4">
        <h2>No Ticket Found</h2>
        <p>Please make a booking first.</p>
        <Link to="/">
          <Button>Go Home</Button>
        </Link>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="ticket-page">
      <h2>Your Ticket</h2>
      <div className="ticket-container">
        <div className="ticket-header">
          <h3 className="movie-title">{movieTitle}</h3>
          <p className="theater-name">{theaterName}</p>
        </div>
        <div className="ticket-info">
          <p><strong>Booking ID:</strong> {bookingId}</p>
          <p><strong>Ticket #:</strong> {ticketNumber}</p>
          <p><strong>Seats:</strong> {bookedSeatIds?.join(", ")}</p>
          <p><strong>Showtime ID:</strong> {showtimeId}</p>
          <p><strong>Booked At:</strong> {bookingTime}</p>
          <p><strong>Price:</strong> {price}</p>
        </div>
        <div className="ticket-footer">
          <p>Enjoy the show! love u bb</p>
        </div>
      </div>
      <div className="ticket-actions">
        <Button onClick={handlePrint}>Print Ticket</Button>
        <Link to="/">
          <Button variant="outline">Back Home</Button>
        </Link>
      </div>
    </div>
  );
}
