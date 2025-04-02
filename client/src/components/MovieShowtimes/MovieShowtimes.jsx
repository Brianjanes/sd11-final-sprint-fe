import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { Button } from "../ui/Button/Button";
import { Card, CardContent } from "../ui/Card/Card";
import { Link } from "react-router-dom";
import "./MovieShowtimes.css";

// Default theaters data
const theaters = [
  {
    id: 1,
    name: "Cineplex Avalon Mall",
    address: "48 Kenmount Rd, St. John's, NL",
    distance: "5 min away",
  },
  {
    id: 2,
    name: "Cineplex Village Mall",
    address: "430 Topsail Rd, St. John's, NL",
    distance: "15 min away",
  },
  {
    id: 3,
    name: "Cineplex Sobeys Square",
    address: "70 Kelsey Dr, St. John's, NL",
    distance: "20 min away",
  },
];

// Default movies data with added showtime IDs
const movies = [
  {
    id: 1,
    title: "Dune: Part Two",
    image: "https://via.placeholder.com/80x120",
    rating: "PG-13",
    showtimes: [
      { id: 101, time: "10:30 AM", format: "Standard" },
      { id: 102, time: "1:15 PM", format: "IMAX" },
      { id: 103, time: "4:00 PM", format: "Standard" },
      { id: 104, time: "7:30 PM", format: "IMAX" },
      { id: 105, time: "10:45 PM", format: "Standard" },
    ],
  },
  {
    id: 2,
    title: "Godzilla x Kong: The New Empire",
    image: "https://via.placeholder.com/80x120",
    rating: "PG-13",
    showtimes: [
      { id: 201, time: "11:00 AM", format: "Standard" },
      { id: 202, time: "2:30 PM", format: "3D" },
      { id: 203, time: "5:45 PM", format: "Standard" },
      { id: 204, time: "8:15 PM", format: "3D" },
      { id: 205, time: "11:00 PM", format: "Standard" },
    ],
  },
  {
    id: 3,
    title: "The Fall Guy",
    image: "https://via.placeholder.com/80x120",
    rating: "PG-13",
    showtimes: [
      { id: 301, time: "10:15 AM", format: "Standard" },
      { id: 302, time: "12:45 PM", format: "Standard" },
      { id: 303, time: "3:30 PM", format: "Standard" },
      { id: 304, time: "6:15 PM", format: "Standard" },
      { id: 305, time: "9:00 PM", format: "Standard" },
    ],
  },
];

export function MovieShowtimes() {
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [activeTheater, setActiveTheater] = useState(theaters[0].id);

  // Generate an array of dates for the next 14 days
  const calendarDates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });

  const handleDateSelect = (newDate) => {
    setDate(newDate);
    setShowCalendar(false);
  };

  return (
    <div className="showtimes-container">
      <div className="date-selector">
        <div className="calendar-wrapper">
          <Button
            variant="outline"
            className="calendar-button"
            onClick={() => setShowCalendar(!showCalendar)}
          >
            <CalendarIcon className="calendar-icon" />
            {date.toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </Button>

          {showCalendar && (
            <div className="calendar-dropdown">
              <div className="calendar-grid">
                {calendarDates.map((d, i) => (
                  <button
                    key={i}
                    className={`calendar-day ${
                      date.toDateString() === d.toDateString()
                        ? "calendar-day-active"
                        : ""
                    }`}
                    onClick={() => handleDateSelect(d)}
                  >
                    {d.getDate()}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="theaters-container">
        <div className="theater-tabs">
          {theaters.map((theater) => (
            <button
              key={theater.id}
              className={`theater-tab ${
                activeTheater === theater.id ? "theater-tab-active" : ""
              }`}
              onClick={() => setActiveTheater(theater.id)}
            >
              {theater.name}
            </button>
          ))}
        </div>

        {theaters.map((theater) => (
          <div
            key={theater.id}
            className={`theater-content ${
              activeTheater === theater.id ? "theater-content-active" : ""
            }`}
          >
            <Card className="theater-card">
              <CardContent className="theater-card-content">
                <div className="theater-address">
                  {theater.address} • {theater.distance}
                </div>

                <div className="movies-list">
                  {movies.map((movie) => (
                    <div key={movie.id} className="movie-item">
                      <div className="movie-info-container">
                        <div className="movie-poster-container">
                          <img
                            src={movie.image || "/placeholder.svg"}
                            alt={movie.title}
                            className="movie-poster-small"
                          />
                        </div>
                        <div className="movie-details-small">
                          <h3 className="movie-title-small">{movie.title}</h3>
                          <p className="movie-rating-small">{movie.rating}</p>
                        </div>
                      </div>
                      <div className="showtimes-list">
                        {movie.showtimes.map((showtime) => (
                          <Link
                            key={showtime.id}
                            to={`/showtimes/${showtime.id}/seats`}
                          >
                            <Button variant="outline" className="showtime-button">
                              <div>
                                <div className="showtime-time">
                                  {showtime.time}
                                </div>
                                <div className="showtime-format">
                                  {showtime.format}
                                </div>
                              </div>
                            </Button>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
