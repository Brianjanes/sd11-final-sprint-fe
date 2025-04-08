import React, { useState } from "react";

function VIPComponent() {
  const [selectedTier, setSelectedTier] = useState(null);

  // VIP membership tiers
  const membershipTiers = [
    {
      id: 1,
      name: "Silver",
      price: "$19.99/month",
      benefits: [
        "Priority seating for regular screenings",
        "10% discount on concessions",
        "Free popcorn on your birthday",
        "Monthly VIP-only screenings",
      ],
    },
    {
      id: 2,
      name: "Gold",
      price: "$39.99/month",
      benefits: [
        "All Silver benefits",
        "Reserved premium seating",
        "20% discount on concessions",
        "One free ticket per month",
        "Access to premiere after-parties",
      ],
    },
    {
      id: 3,
      name: "Platinum",
      price: "$69.99/month",
      benefits: [
        "All Gold benefits",
        "Unlimited movies (up to 8/month)",
        "30% discount on concessions",
        "Priority access to special events",
        "VIP parking space",
        "Dedicated concierge service",
      ],
    },
  ];

  // Upcoming exclusive events
  const exclusiveEvents = [
    {
      id: 1,
      title: "Marvel Universe: Preview Night",
      date: "April 20, 2025",
      eligibility: "Gold & Platinum members",
    },
    {
      id: 2,
      title: "Director's Masterclass with Christopher Nolan",
      date: "May 5, 2025",
      eligibility: "Platinum members only",
    },
    {
      id: 3,
      title: "Oscar Contenders Screening Series",
      date: "May 12-19, 2025",
      eligibility: "All VIP members",
    },
  ];

  const handleTierSelect = (tierId) => {
    setSelectedTier(tierId === selectedTier ? null : tierId);
  };

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "2rem 1.5rem",
        fontFamily: "Arial, sans-serif",
        position: "relative",
        zIndex: 0,
      }}
    >
      {/* Header - Matched with other components */}
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
          💎 Cineflex VIP Membership 🌟
        </h1>
        <p style={{ fontSize: "1.1rem" }}>
          Elevate your cinema experience with exclusive benefits and special
          events
        </p>
      </header>

      {/* Membership Tiers */}
      <section style={{ marginBottom: "3rem" }}>
        <h2
          style={{
            fontSize: "1.8rem",
            color: "#333",
            marginBottom: "1.5rem",
            textAlign: "center",
          }}
        >
          Choose Your Membership Level
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          {membershipTiers.map((tier) => (
            <div
              key={tier.id}
              onClick={() => handleTierSelect(tier.id)}
              style={{
                border:
                  selectedTier === tier.id
                    ? "2px solid #e50914"
                    : "1px solid #ddd",
                borderRadius: "8px",
                padding: "1.5rem",
                cursor: "pointer",
                backgroundColor:
                  selectedTier === tier.id ? "rgba(229, 9, 20, 0.05)" : "white",
                transition: "all 0.3s ease",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.5rem",
                    color: "#333",
                    margin: 0,
                    fontWeight: "bold",
                  }}
                >
                  {tier.name} Membership
                </h3>
                <span
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: "bold",
                    color: "#e50914",
                  }}
                >
                  {tier.price}
                </span>
              </div>

              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                }}
              >
                {tier.benefits.map((benefit, index) => (
                  <li
                    key={index}
                    style={{
                      padding: "0.5rem 0",
                      borderBottom:
                        index < tier.benefits.length - 1
                          ? "1px solid #eee"
                          : "none",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        color: "#e50914",
                        marginRight: "10px",
                        fontWeight: "bold",
                      }}
                    >
                      ✓
                    </span>
                    {benefit}
                  </li>
                ))}
              </ul>

              <button
                style={{
                  width: "100%",
                  background: selectedTier === tier.id ? "#e50914" : "#f5f5f5",
                  color: selectedTier === tier.id ? "white" : "#333",
                  border: "none",
                  borderRadius: "4px",
                  padding: "0.75rem",
                  marginTop: "1.5rem",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                {selectedTier === tier.id ? "Selected" : `Select ${tier.name}`}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Exclusive Events */}
      <section style={{ marginBottom: "3rem" }}>
        <h2
          style={{
            fontSize: "1.8rem",
            color: "#333",
            marginBottom: "1.5rem",
            textAlign: "center",
          }}
        >
          Upcoming VIP Exclusive Events
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {exclusiveEvents.map((event) => (
            <div
              key={event.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "6px",
                padding: "1.25rem",
                backgroundColor: "white",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.2rem",
                    color: "#333",
                    margin: 0,
                  }}
                >
                  {event.title}
                </h3>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.9rem",
                      color: "#666",
                    }}
                  >
                    {event.date}
                  </span>
                  <span
                    style={{
                      fontSize: "0.8rem",
                      backgroundColor: "#e50914",
                      color: "white",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    {event.eligibility}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Summary */}
      <section
        style={{
          marginBottom: "3rem",
          backgroundColor: "#f8f8f8",
          padding: "2rem",
          borderRadius: "8px",
        }}
      >
        <h2
          style={{
            fontSize: "1.8rem",
            color: "#333",
            marginBottom: "1.5rem",
            textAlign: "center",
          }}
        >
          VIP Member Benefits
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1.5rem",
          }}
        >
          <div style={{ padding: "0.5rem" }}>
            <h3
              style={{
                fontSize: "1.2rem",
                color: "#e50914",
                marginBottom: "0.75rem",
              }}
            >
              Priority Access
            </h3>
            <p style={{ color: "#555", lineHeight: "1.5" }}>
              Get tickets before they're available to the general public for
              blockbusters and special screenings.
            </p>
          </div>

          <div style={{ padding: "0.5rem" }}>
            <h3
              style={{
                fontSize: "1.2rem",
                color: "#e50914",
                marginBottom: "0.75rem",
              }}
            >
              Exclusive Events
            </h3>
            <p style={{ color: "#555", lineHeight: "1.5" }}>
              Access to member-only screenings, director Q&As, and film industry
              events.
            </p>
          </div>

          <div style={{ padding: "0.5rem" }}>
            <h3
              style={{
                fontSize: "1.2rem",
                color: "#e50914",
                marginBottom: "0.75rem",
              }}
            >
              Concession Discounts
            </h3>
            <p style={{ color: "#555", lineHeight: "1.5" }}>
              Save on food and drinks with exclusive VIP discounts at all
              concession stands.
            </p>
          </div>

          <div style={{ padding: "0.5rem" }}>
            <h3
              style={{
                fontSize: "1.2rem",
                color: "#e50914",
                marginBottom: "0.75rem",
              }}
            >
              Premium Seating
            </h3>
            <p style={{ color: "#555", lineHeight: "1.5" }}>
              The best seats in the house are reserved for our VIP members with
              extra comfort.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ marginBottom: "3rem" }}>
        <h2
          style={{
            fontSize: "1.8rem",
            color: "#333",
            marginBottom: "1.5rem",
            textAlign: "center",
          }}
        >
          Frequently Asked Questions
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <div
            style={{ borderBottom: "1px solid #eee", paddingBottom: "1rem" }}
          >
            <h3
              style={{
                fontSize: "1.1rem",
                color: "#333",
                marginBottom: "0.5rem",
              }}
            >
              How do I use my VIP membership benefits?
            </h3>
            <p style={{ color: "#666", lineHeight: "1.5" }}>
              Simply show your digital membership card at the theater. Your
              benefits will be applied automatically.
            </p>
          </div>

          <div
            style={{ borderBottom: "1px solid #eee", paddingBottom: "1rem" }}
          >
            <h3
              style={{
                fontSize: "1.1rem",
                color: "#333",
                marginBottom: "0.5rem",
              }}
            >
              Can I upgrade my membership later?
            </h3>
            <p style={{ color: "#666", lineHeight: "1.5" }}>
              Yes, you can upgrade at any time. The price difference will be
              prorated for your current billing cycle.
            </p>
          </div>

          <div
            style={{ borderBottom: "1px solid #eee", paddingBottom: "1rem" }}
          >
            <h3
              style={{
                fontSize: "1.1rem",
                color: "#333",
                marginBottom: "0.5rem",
              }}
            >
              Is there a limit to how many movies I can see?
            </h3>
            <p style={{ color: "#666", lineHeight: "1.5" }}>
              Platinum members can enjoy up to 8 movies per month. Additional
              tickets can be purchased at a member discount.
            </p>
          </div>

          <div>
            <h3
              style={{
                fontSize: "1.1rem",
                color: "#333",
                marginBottom: "0.5rem",
              }}
            >
              How do I cancel my membership?
            </h3>
            <p style={{ color: "#666", lineHeight: "1.5" }}>
              You can cancel anytime through your account settings or by
              contacting our customer service team.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          textAlign: "center",
          backgroundColor: "#e50914",
          color: "white",
          padding: "2rem",
          borderRadius: "8px",
          marginBottom: "2rem",
        }}
      >
        <h2
          style={{
            fontSize: "1.8rem",
            marginBottom: "1rem",
          }}
        >
          Ready to Join Cineflex VIP?
        </h2>
        <p
          style={{
            marginBottom: "1.5rem",
            maxWidth: "600px",
            margin: "0 auto 1.5rem",
          }}
        >
          Become a member today and start enjoying exclusive benefits and
          premium cinema experiences.
        </p>
        <button
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
          Sign Up Now
        </button>
      </section>

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          color: "#777",
          borderTop: "1px solid #eee",
          paddingTop: "1.5rem",
        }}
      >
        <p>
          For more information about our VIP program, contact us at
          vip@cineflex.com
        </p>
        <p>© 2025 Cineflex Cinema. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default VIPComponent;
