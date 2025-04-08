import React, { useState } from "react";

function IMAX() {
  const [activeTab, setActiveTab] = useState("experience");

  // Current IMAX screenings
  const currentScreenings = [
    {
      id: 1,
      title: "Interstellar: Extended Edition",
      director: "Christopher Nolan",
      duration: "195 min",
      rating: "PG-13",
      description:
        "Experience the cosmic journey in stunning IMAX clarity with 40 minutes of additional footage. This special extended edition brings new depth to the interstellar voyage.",
      showtimes: ["12:30 PM", "4:15 PM", "8:00 PM"],
      dates: ["Mon-Thu", "Fri-Sun"],
    },
    {
      id: 2,
      title: "Avatar: Way of Water",
      director: "James Cameron",
      duration: "192 min",
      rating: "PG-13",
      description:
        "Return to Pandora in breathtaking IMAX 3D. The sequel to the groundbreaking Avatar takes you deeper into the alien world with revolutionary visual effects.",
      showtimes: ["11:00 AM", "3:00 PM", "7:00 PM", "10:30 PM"],
      dates: ["Daily"],
    },
    {
      id: 3,
      title: "Dune: Part Two",
      director: "Denis Villeneuve",
      duration: "166 min",
      rating: "PG-13",
      description:
        "The epic saga continues, formatted specifically for IMAX screens. Experience the vastness of Arrakis as it was meant to be seen.",
      showtimes: ["1:00 PM", "5:00 PM", "9:00 PM"],
      dates: ["Mon-Thu", "Fri-Sun"],
    },
    {
      id: 4,
      title: "Oceans: Our Blue Planet",
      director: "Mark Brownlow",
      duration: "75 min",
      rating: "G",
      description:
        "This IMAX documentary takes you into the depths of Earth's oceans, revealing extraordinary creatures and underwater landscapes in stunning clarity.",
      showtimes: ["10:00 AM", "2:00 PM"],
      dates: ["Sat-Sun only"],
    },
  ];

  // IMAX technology specs
  const techSpecs = [
    {
      name: "Screen Size",
      value: "76 ft × 97 ft (23 m × 30 m)",
      description:
        "Our IMAX screen is nearly 8 stories tall, providing a truly immersive experience that fills your peripheral vision.",
    },
    {
      name: "Projection System",
      value: "Dual 4K Laser Projectors",
      description:
        "Our state-of-the-art IMAX laser system delivers brighter images, deeper contrast, and the widest range of colors available to filmmakers.",
    },
    {
      name: "Sound System",
      value: "12-Channel Surround Sound",
      description:
        "Precision speaker placement and 12 discrete audio channels create a perfect sphere of sound that completely envelops the audience.",
    },
    {
      name: "Seating Capacity",
      value: "385 Premium Reclining Seats",
      description:
        "Our custom-designed stadium seating ensures every seat has an optimal view of the massive screen.",
    },
    {
      name: "Aspect Ratio",
      value: "1.43:1 / 1.9:1",
      description:
        "IMAX utilizes a larger aspect ratio that allows filmmakers to present more of their image than standard theaters.",
    },
  ];

  // Upcoming IMAX releases
  const upcomingReleases = [
    {
      id: 1,
      title: "Mission: Impossible 8",
      releaseDate: "May 23, 2025",
      description:
        "Filmed with IMAX cameras for the most breathtaking action sequences in the franchise's history.",
    },
    {
      id: 2,
      title: "Marvel's The Fantastic Four",
      releaseDate: "June 15, 2025",
      description:
        "Experience Marvel's first family on the giant IMAX screen with expanded aspect ratio for key sequences.",
    },
    {
      id: 3,
      title: "Jurassic World: New Era",
      releaseDate: "July 8, 2025",
      description:
        "The dinosaurs return bigger than ever in IMAX, with select sequences filmed using IMAX-certified cameras.",
    },
    {
      id: 4,
      title: "Everest: Challenge the Summit",
      releaseDate: "August 12, 2025",
      description:
        "This IMAX documentary captures the perilous journey to the world's highest peak like never before.",
    },
  ];

  // Ticket pricing
  const ticketPricing = [
    {
      type: "Adult (13+)",
      standard: "$21.99",
      premium: "$24.99",
      description:
        "Standard shows before 6PM, Premium after 6PM and all day weekends",
    },
    {
      type: "Child (3-12)",
      standard: "$17.99",
      premium: "$19.99",
      description: "Special kids' pricing available for all IMAX showings",
    },
    {
      type: "Senior (65+)",
      standard: "$18.99",
      premium: "$20.99",
      description: "Senior discount applied to all IMAX experiences",
    },
    {
      type: "Student (with ID)",
      standard: "$18.99",
      premium: "$21.99",
      description: "Valid student ID required at ticket check",
    },
    {
      type: "IMAX 3D Surcharge",
      standard: "+$3.00",
      premium: "+$3.00",
      description: "Additional fee for 3D IMAX experiences",
    },
  ];

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "2rem 1.5rem",
        fontFamily: "Arial, sans-serif",
        position: "relative",
        zIndex: 0,
      }}
    >
      {/* Header Section - Matched with Events header style */}
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
          🎞️ Cineflex IMAX® Experience 🎬
        </h1>
        <p style={{ fontSize: "1.1rem" }}>
          The world's most immersive movie experience that puts you in the
          middle of the action
        </p>
      </header>

      {/* Tab Navigation */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: "2rem",
          borderBottom: "1px solid #ddd",
        }}
      >
        <button
          onClick={() => setActiveTab("experience")}
          style={{
            padding: "1rem 1.5rem",
            fontSize: "1rem",
            fontWeight: "bold",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: activeTab === "experience" ? "#e50914" : "#555",
            borderBottom:
              activeTab === "experience" ? "3px solid #e50914" : "none",
          }}
        >
          The IMAX Experience
        </button>
        <button
          onClick={() => setActiveTab("showtimes")}
          style={{
            padding: "1rem 1.5rem",
            fontSize: "1rem",
            fontWeight: "bold",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: activeTab === "showtimes" ? "#e50914" : "#555",
            borderBottom:
              activeTab === "showtimes" ? "3px solid #e50914" : "none",
          }}
        >
          Current Showtimes
        </button>
        <button
          onClick={() => setActiveTab("upcoming")}
          style={{
            padding: "1rem 1.5rem",
            fontSize: "1rem",
            fontWeight: "bold",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: activeTab === "upcoming" ? "#e50914" : "#555",
            borderBottom:
              activeTab === "upcoming" ? "3px solid #e50914" : "none",
          }}
        >
          Coming Soon
        </button>
        <button
          onClick={() => setActiveTab("pricing")}
          style={{
            padding: "1rem 1.5rem",
            fontSize: "1rem",
            fontWeight: "bold",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: activeTab === "pricing" ? "#e50914" : "#555",
            borderBottom:
              activeTab === "pricing" ? "3px solid #e50914" : "none",
          }}
        >
          Ticket Pricing
        </button>
      </div>

      {/* IMAX Experience Tab */}
      {activeTab === "experience" && (
        <div>
          <section style={{ marginBottom: "3rem" }}>
            <h2
              style={{
                fontSize: "2rem",
                color: "#333",
                marginBottom: "1.5rem",
                textAlign: "center",
              }}
            >
              Why Choose IMAX?
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "2rem",
                marginBottom: "2rem",
              }}
            >
              <div
                style={{
                  padding: "1.5rem",
                  backgroundColor: "#f8f8f8",
                  borderRadius: "8px",
                  textAlign: "center",
                }}
              >
                <h3
                  style={{
                    color: "#e50914",
                    marginBottom: "1rem",
                    fontSize: "1.3rem",
                  }}
                >
                  Bigger Screen
                </h3>
                <p style={{ color: "#555", lineHeight: "1.5" }}>
                  Our IMAX screen is significantly larger than standard
                  theaters, filling your peripheral vision for a truly immersive
                  experience.
                </p>
              </div>

              <div
                style={{
                  padding: "1.5rem",
                  backgroundColor: "#f8f8f8",
                  borderRadius: "8px",
                  textAlign: "center",
                }}
              >
                <h3
                  style={{
                    color: "#e50914",
                    marginBottom: "1rem",
                    fontSize: "1.3rem",
                  }}
                >
                  Crystal-Clear Images
                </h3>
                <p style={{ color: "#555", lineHeight: "1.5" }}>
                  IMAX's proprietary dual 4K laser projection system delivers
                  sharper, brighter images with unprecedented clarity.
                </p>
              </div>

              <div
                style={{
                  padding: "1.5rem",
                  backgroundColor: "#f8f8f8",
                  borderRadius: "8px",
                  textAlign: "center",
                }}
              >
                <h3
                  style={{
                    color: "#e50914",
                    marginBottom: "1rem",
                    fontSize: "1.3rem",
                  }}
                >
                  Immersive Sound
                </h3>
                <p style={{ color: "#555", lineHeight: "1.5" }}>
                  Our precision 12-channel sound system delivers audio with
                  stunning clarity and depth that you can feel.
                </p>
              </div>

              <div
                style={{
                  padding: "1.5rem",
                  backgroundColor: "#f8f8f8",
                  borderRadius: "8px",
                  textAlign: "center",
                }}
              >
                <h3
                  style={{
                    color: "#e50914",
                    marginBottom: "1rem",
                    fontSize: "1.3rem",
                  }}
                >
                  Optimal Viewing
                </h3>
                <p style={{ color: "#555", lineHeight: "1.5" }}>
                  Our precisely designed theater architecture ensures every seat
                  provides the optimal viewing experience.
                </p>
              </div>
            </div>
          </section>

          <section style={{ marginBottom: "3rem" }}>
            <h2
              style={{
                fontSize: "2rem",
                color: "#333",
                marginBottom: "1.5rem",
                textAlign: "center",
              }}
            >
              Technical Specifications
            </h2>

            <div
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              {techSpecs.map((spec, index) => (
                <div
                  key={index}
                  style={{
                    padding: "1.5rem",
                    borderBottom:
                      index < techSpecs.length - 1 ? "1px solid #ddd" : "none",
                    backgroundColor: index % 2 === 0 ? "#f8f8f8" : "white",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "0.5rem",
                      flexWrap: "wrap",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "1.2rem",
                        color: "#e50914",
                        margin: 0,
                      }}
                    >
                      {spec.name}
                    </h3>
                    <span
                      style={{
                        fontWeight: "bold",
                        color: "#333",
                      }}
                    >
                      {spec.value}
                    </span>
                  </div>
                  <p
                    style={{
                      margin: 0,
                      color: "#555",
                      lineHeight: "1.5",
                    }}
                  >
                    {spec.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section
            style={{
              padding: "2rem",
              backgroundColor: "#e50914",
              color: "white",
              borderRadius: "8px",
              textAlign: "center",
              marginBottom: "2rem",
            }}
          >
            <h2
              style={{
                fontSize: "1.8rem",
                marginBottom: "1rem",
              }}
            >
              Discover the Ultimate IMAX Experience
            </h2>
            <p
              style={{
                fontSize: "1.1rem",
                marginBottom: "1.5rem",
                maxWidth: "700px",
                margin: "0 auto 1.5rem",
                lineHeight: "1.6",
              }}
            >
              Some films are made to be experienced in IMAX. From blockbusters
              to documentaries, IMAX delivers entertainment at its most
              immersive.
            </p>
            <button
              onClick={() => setActiveTab("showtimes")}
              style={{
                backgroundColor: "white",
                color: "#e50914",
                border: "none",
                borderRadius: "4px",
                padding: "0.75rem 2rem",
                fontSize: "1rem",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              View Current Showtimes
            </button>
          </section>
        </div>
      )}

      {/* Current Showtimes Tab */}
      {activeTab === "showtimes" && (
        <div>
          <h2
            style={{
              fontSize: "2rem",
              color: "#333",
              marginBottom: "1.5rem",
              textAlign: "center",
            }}
          >
            Now Playing in IMAX
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
            }}
          >
            {currentScreenings.map((movie) => (
              <div
                key={movie.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#e50914",
                    color: "white",
                    padding: "1rem 1.5rem",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "1.5rem",
                      margin: 0,
                    }}
                  >
                    {movie.title}
                  </h3>
                </div>

                <div style={{ padding: "1.5rem" }}>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "1rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <span
                      style={{
                        padding: "0.25rem 0.75rem",
                        backgroundColor: "#f0f0f0",
                        borderRadius: "20px",
                        fontSize: "0.9rem",
                        color: "#555",
                      }}
                    >
                      Director: {movie.director}
                    </span>
                    <span
                      style={{
                        padding: "0.25rem 0.75rem",
                        backgroundColor: "#f0f0f0",
                        borderRadius: "20px",
                        fontSize: "0.9rem",
                        color: "#555",
                      }}
                    >
                      Duration: {movie.duration}
                    </span>
                    <span
                      style={{
                        padding: "0.25rem 0.75rem",
                        backgroundColor: "#f0f0f0",
                        borderRadius: "20px",
                        fontSize: "0.9rem",
                        color: "#555",
                      }}
                    >
                      Rating: {movie.rating}
                    </span>
                  </div>

                  <p
                    style={{
                      color: "#555",
                      lineHeight: "1.6",
                      marginBottom: "1.5rem",
                    }}
                  >
                    {movie.description}
                  </p>

                  <div>
                    <h4
                      style={{
                        fontSize: "1.1rem",
                        color: "#333",
                        marginBottom: "0.75rem",
                      }}
                    >
                      Showtimes ({movie.dates.join(", ")})
                    </h4>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "0.75rem",
                      }}
                    >
                      {movie.showtimes.map((time, idx) => (
                        <button
                          key={idx}
                          style={{
                            padding: "0.5rem 1rem",
                            border: "1px solid #e50914",
                            borderRadius: "4px",
                            backgroundColor: "white",
                            color: "#e50914",
                            fontWeight: "bold",
                            cursor: "pointer",
                          }}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              textAlign: "center",
              marginTop: "2rem",
              padding: "1.5rem",
              backgroundColor: "#f8f8f8",
              borderRadius: "8px",
            }}
          >
            <p
              style={{
                fontSize: "1.1rem",
                color: "#555",
                marginBottom: "1rem",
              }}
            >
              IMAX auditorium sells out quickly. Book your tickets in advance to
              secure the best seats.
            </p>
            <button
              style={{
                padding: "0.75rem 2rem",
                backgroundColor: "#e50914",
                color: "white",
                border: "none",
                borderRadius: "4px",
                fontWeight: "bold",
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              Book Tickets Now
            </button>
          </div>
        </div>
      )}

      {/* Upcoming Releases Tab */}
      {activeTab === "upcoming" && (
        <div>
          <h2
            style={{
              fontSize: "2rem",
              color: "#333",
              marginBottom: "1.5rem",
              textAlign: "center",
            }}
          >
            Coming Soon to IMAX
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
              marginBottom: "2rem",
            }}
          >
            {upcomingReleases.map((movie) => (
              <div
                key={movie.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  overflow: "hidden",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#222",
                    color: "white",
                    padding: "3rem 1.5rem",
                    textAlign: "center",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "1.3rem",
                      margin: 0,
                    }}
                  >
                    {movie.title}
                  </h3>
                </div>

                <div
                  style={{
                    padding: "1.5rem",
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      marginBottom: "1rem",
                      textAlign: "center",
                    }}
                  >
                    <span
                      style={{
                        fontWeight: "bold",
                        color: "#e50914",
                        fontSize: "1.1rem",
                      }}
                    >
                      Coming {movie.releaseDate}
                    </span>
                  </div>

                  <p
                    style={{
                      color: "#555",
                      lineHeight: "1.6",
                      flexGrow: 1,
                    }}
                  >
                    {movie.description}
                  </p>

                  <button
                    style={{
                      padding: "0.75rem",
                      marginTop: "1rem",
                      backgroundColor: "#f0f0f0",
                      color: "#333",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    Notify Me
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              padding: "1.5rem",
              backgroundColor: "#f8f8f8",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <h3
              style={{
                fontSize: "1.3rem",
                color: "#333",
                marginBottom: "1rem",
              }}
            >
              Stay Updated on IMAX Releases
            </h3>
            <p style={{ color: "#555", marginBottom: "1.5rem" }}>
              Join our mailing list to get notifications about upcoming IMAX
              films and early access to tickets.
            </p>
            <div
              style={{
                display: "flex",
                maxWidth: "500px",
                margin: "0 auto",
                gap: "0.5rem",
              }}
            >
              <input
                type="email"
                placeholder="Your email address"
                style={{
                  padding: "0.75rem",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                  flexGrow: 1,
                  fontSize: "1rem",
                }}
              />
              <button
                style={{
                  padding: "0.75rem 1.5rem",
                  backgroundColor: "#e50914",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Ticket Pricing Tab */}
      {activeTab === "pricing" && (
        <div>
          <h2
            style={{
              fontSize: "2rem",
              color: "#333",
              marginBottom: "1.5rem",
              textAlign: "center",
            }}
          >
            IMAX Ticket Prices
          </h2>

          <div
            style={{
              marginBottom: "2rem",
              border: "1px solid #ddd",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr",
                backgroundColor: "#e50914",
                color: "white",
                fontWeight: "bold",
                padding: "1rem",
              }}
            >
              <div>Ticket Type</div>
              <div style={{ textAlign: "center" }}>Standard</div>
              <div style={{ textAlign: "center" }}>Premium</div>
            </div>

            {ticketPricing.map((ticket, index) => (
              <div
                key={index}
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr 1fr",
                  padding: "1rem",
                  borderBottom:
                    index < ticketPricing.length - 1
                      ? "1px solid #ddd"
                      : "none",
                  backgroundColor: index % 2 === 0 ? "#f8f8f8" : "white",
                }}
              >
                <div style={{ fontWeight: "bold", color: "#333" }}>
                  {ticket.type}
                </div>
                <div style={{ textAlign: "center", color: "#555" }}>
                  {ticket.standard}
                </div>
                <div style={{ textAlign: "center", color: "#555" }}>
                  {ticket.premium}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <h3
              style={{
                fontSize: "1.3rem",
                color: "#333",
                marginBottom: "1rem",
              }}
            >
              Pricing Notes
            </h3>
            <ul
              style={{
                listStyle: "disc",
                paddingLeft: "1.5rem",
                color: "#555",
                lineHeight: "1.6",
              }}
            >
              {ticketPricing.map((ticket, index) => (
                <li key={index} style={{ marginBottom: "0.5rem" }}>
                  <strong>{ticket.type}:</strong> {ticket.description}
                </li>
              ))}
              <li style={{ marginBottom: "0.5rem" }}>
                <strong>Group Discounts:</strong> Available for groups of 15 or
                more. Contact our box office for details.
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                <strong>Members:</strong> Cineflex members receive a 10%
                discount on all IMAX tickets.
              </li>
            </ul>
          </div>

          <div
            style={{
              padding: "2rem",
              backgroundColor: "#f8f8f8",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <h3
              style={{
                fontSize: "1.3rem",
                color: "#333",
                marginBottom: "1rem",
              }}
            >
              Special IMAX Deals
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "1.5rem",
                marginBottom: "1.5rem",
              }}
            >
              <div
                style={{
                  backgroundColor: "white",
                  padding: "1.5rem",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                }}
              >
                <h4 style={{ color: "#e50914", marginBottom: "0.5rem" }}>
                  IMAX Family Pack
                </h4>
                <p style={{ color: "#555", marginBottom: "0.5rem" }}>
                  2 Adult + 2 Child tickets, includes small popcorns and drinks
                </p>
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    color: "#333",
                  }}
                >
                  $74.99
                </p>
              </div>

              <div
                style={{
                  backgroundColor: "white",
                  padding: "1.5rem",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                }}
              >
                <h4 style={{ color: "#e50914", marginBottom: "0.5rem" }}>
                  IMAX Date Night
                </h4>
                <p style={{ color: "#555", marginBottom: "0.5rem" }}>
                  2 Adult tickets, 1 large popcorn, 2 drinks, and chocolate
                </p>
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    color: "#333",
                  }}
                >
                  $59.99
                </p>
              </div>

              <div
                style={{
                  backgroundColor: "white",
                  padding: "1.5rem",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                }}
              >
                <h4 style={{ color: "#e50914", marginBottom: "0.5rem" }}>
                  IMAX Loyalty Pass
                </h4>
                <p style={{ color: "#555", marginBottom: "0.5rem" }}>
                  Buy 5 IMAX tickets in advance, get your 6th free
                </p>
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    color: "#333",
                  }}
                >
                  Save up to $24.99
                </p>
              </div>
            </div>

            <button
              style={{
                padding: "0.75rem 2rem",
                backgroundColor: "#e50914",
                color: "white",
                border: "none",
                borderRadius: "4px",
                fontWeight: "bold",
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              Book IMAX Tickets
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer
        style={{
          marginTop: "3rem",
          textAlign: "center",
          color: "#777",
          borderTop: "1px solid #eee",
          paddingTop: "1.5rem",
        }}
      >
        <p>IMAX® is a registered trademark of IMAX Corporation.</p>
        <p>
          For assistance with IMAX tickets, please contact our customer service
          at imax@cineflex.com
        </p>
        <p>© 2025 Cineflex Cinema. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default IMAX;
