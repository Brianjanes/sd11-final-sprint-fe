import React, { useState } from "react";

function Events() {
  const [filter, setFilter] = useState("all");

  const events = [
    {
      id: 1,
      title: "Galactic Horizons: IMAX Premier",
      date: "April 15, 2025",
      time: "7:00 PM",
      location: "Cineflex IMAX Theater",
      category: "premiere",
      description:
        "Be among the first to experience the breathtaking visuals of 'Galactic Horizons' in stunning IMAX format. Director James Cameron will be present for a Q&A session after the screening.",
      price: "$25.00",
      emoji: "🚀",
    },
    {
      id: 2,
      title: "Retro Movie Night: 80s Classics Marathon",
      date: "April 18, 2025",
      time: "4:00 PM - 11:00 PM",
      location: "Cineflex Vintage Hall",
      category: "special",
      description:
        "Join us for a nostalgic journey through three iconic films of the 80s: 'The Breakfast Club', 'Back to the Future', and 'Ghostbusters'. Themed concessions and 80s music included!",
      price: "$20.00",
      emoji: "🕰️",
    },
    {
      id: 3,
      title: "Kids Film Festival",
      date: "April 20-22, 2025",
      time: "10:00 AM - 5:00 PM",
      location: "Cineflex Family Theater",
      category: "festival",
      description:
        "A three-day festival featuring the best animated and family films from around the world. Special activities for children between screenings.",
      price: "$15.00 per day, $35.00 for festival pass",
      emoji: "🧸",
    },
    {
      id: 4,
      title: "Director's Cut: 'The Silent Echo'",
      date: "April 25, 2025",
      time: "8:00 PM",
      location: "Cineflex Platinum Screen",
      category: "exclusive",
      description:
        "Experience the never-before-seen director's cut of 'The Silent Echo', the critically acclaimed thriller that took the festival circuit by storm. Extended by 25 minutes with enhanced scenes.",
      price: "$22.00",
      emoji: "🎬",
    },
    {
      id: 5,
      title: "Foreign Film Thursday: 'La Vie en Lumière'",
      date: "April 28, 2025",
      time: "6:30 PM",
      location: "Cineflex International Hall",
      category: "foreign",
      description:
        "Award-winning French drama 'La Vie en Lumière' with English subtitles. Wine and cheese reception before the screening.",
      price: "$18.00",
      emoji: "🇫🇷",
    },
    {
      id: 6,
      title: "Midnight Horror Show: 'The Haunting Presence'",
      date: "May 1, 2025",
      time: "11:59 PM",
      location: "Cineflex Shadow Theater",
      category: "special",
      description:
        "Brave souls only! Our midnight showing of the newest psychological horror film 'The Haunting Presence'. Complimentary energy drink to keep you awake - you'll need it!",
      price: "$16.00",
      emoji: "👻",
    },
  ];

  const filteredEvents =
    filter === "all"
      ? events
      : events.filter((event) => event.category === filter);

  // Get unique categories for filter buttons
  const categories = ["all", ...new Set(events.map((event) => event.category))];

  // Random fun facts about movies to display at the bottom
  const funFacts = [
    "The longest film ever made is 'Logistics' (2012), which runs for 857 hours (35 days and 17 hours).",
    "The first film ever to use a toilet flushing sound was Alfred Hitchcock's 'Psycho' (1960).",
    "The Lion King (1994) was originally called 'King of the Jungle' before someone realized lions don't live in jungles.",
    "The sound of the velociraptors in Jurassic Park is actually the sound of turtles mating.",
    "The iconic 'I'll be back' line from Terminator was almost changed to 'I'll come back' because Arnold Schwarzenegger had trouble pronouncing 'I'll'.",
    "The Oscar statuette is officially named the Academy Award of Merit.",
  ];

  // Pick a random fun fact
  const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "2rem 1rem",
        fontFamily: "Arial, sans-serif",
        position: "relative",
        zIndex: 0,
      }}
    >
      <header
        style={{
          textAlign: "center",
          marginBottom: "2.5rem",
          background: "#e50914",
          color: "white",
          padding: "1.5rem",
          borderRadius: "8px",
          position: "relative",
          zIndex: 0,
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            marginBottom: "0.5rem",
          }}
        >
          🎭 Cineflex Events 🎬
        </h1>
        <p style={{ fontSize: "1.1rem" }}>
          Check out our upcoming screenings and special cinema events!
        </p>
      </header>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "2rem",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            style={{
              background: filter === category ? "#e50914" : "#f0f0f0",
              color: filter === category ? "white" : "#333",
              border: "none",
              borderRadius: "25px",
              padding: "0.6rem 1.2rem",
              cursor: "pointer",
              fontWeight: "bold",
              textTransform: category === "all" ? "capitalize" : "uppercase",
              transition: "all 0.2s ease",
            }}
          >
            {category === "all" ? "All Events" : category}
          </button>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            style={{
              background: "white",
              borderRadius: "8px",
              padding: "1.5rem",
              boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
              border: "1px solid #eee",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}
            >
              <div
                style={{
                  fontSize: "2.5rem",
                  lineHeight: "1",
                  marginRight: "0.5rem",
                }}
              >
                {event.emoji}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "inline-block",
                    background: "#f0f0f0",
                    color: "#e50914",
                    padding: "0.2rem 0.6rem",
                    borderRadius: "20px",
                    fontSize: "0.8rem",
                    fontWeight: "bold",
                    marginBottom: "0.5rem",
                    textTransform: "uppercase",
                  }}
                >
                  {event.category}
                </div>
                <h2
                  style={{
                    fontSize: "1.5rem",
                    marginBottom: "0.75rem",
                    color: "#222",
                  }}
                >
                  {event.title}
                </h2>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.75rem",
                    marginBottom: "0.75rem",
                    fontSize: "0.9rem",
                    color: "#555",
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center" }}>
                    <span style={{ marginRight: "0.3rem", fontSize: "1rem" }}>
                      📅
                    </span>
                    <strong>Date:</strong>&nbsp;{event.date}
                  </span>
                  <span style={{ display: "flex", alignItems: "center" }}>
                    <span style={{ marginRight: "0.3rem", fontSize: "1rem" }}>
                      🕒
                    </span>
                    <strong>Time:</strong>&nbsp;{event.time}
                  </span>
                  <span style={{ display: "flex", alignItems: "center" }}>
                    <span style={{ marginRight: "0.3rem", fontSize: "1rem" }}>
                      📍
                    </span>
                    <strong>Location:</strong>&nbsp;{event.location}
                  </span>
                </div>
                <p
                  style={{
                    color: "#444",
                    marginBottom: "1.25rem",
                    lineHeight: "1.5",
                  }}
                >
                  {event.description}
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "1rem",
                  }}
                >
                  <span
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      color: "#e50914",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ marginRight: "0.3rem", fontSize: "1rem" }}>
                      🎟️
                    </span>
                    {event.price}
                  </span>
                  <button
                    style={{
                      background: "#e50914",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      padding: "0.75rem 1.5rem",
                      fontWeight: "bold",
                      cursor: "pointer",
                      transition: "background 0.2s ease, transform 0.1s ease",
                    }}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "3rem",
            color: "#666",
            background: "#f9f9f9",
            borderRadius: "8px",
            marginBottom: "2rem",
          }}
        >
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔍</div>
          <p style={{ fontSize: "1.1rem" }}>
            No events found for this category. Please check back later or try
            another category.
          </p>
        </div>
      )}

      {/* Fun Fact Section */}
      <div
        style={{
          background: "#f8f8f8",
          borderRadius: "8px",
          padding: "1.5rem",
          margin: "2.5rem 0",
          textAlign: "center",
        }}
      >
        <h3 style={{ color: "#333", marginBottom: "0.75rem" }}>
          🍿 Movie Fun Fact 🍿
        </h3>
        <p style={{ color: "#555", fontStyle: "italic" }}>{randomFact}</p>
      </div>

      <footer
        style={{
          marginTop: "2rem",
          textAlign: "center",
          color: "#777",
          borderTop: "1px solid #eee",
          paddingTop: "1.5rem",
        }}
      >
        <p>
          For more information about upcoming events, contact us at{" "}
          <span style={{ color: "#e50914", fontWeight: "bold" }}>
            events@cineflex.com
          </span>
        </p>
        <p>© 2025 Cineflex Cinema. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Events;
