// src/pages/HomePage.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button/Button";
import { MovieCarousel } from "../components/MovieCarousel/MovieCarousel";
import { FeaturedMovies } from "../components/FeaturedMovies/FeaturedMovies";
import { MovieShowtimes } from "../components/MovieShowtimes/MovieShowtimes";
import { PromoSection } from "../components/PromoSection/PromoSection";
import "./HomePage.css";

function HomePage() {
  const [activeTab, setActiveTab] = useState("now-playing");

  return (
    <div className="page-container">
      <main className="main-content">
        <section className="carousel-section">
          <MovieCarousel />
        </section>

        <section className="featured-section">
          <div className="featured-container">
            <div className="tabs-header">
              <div className="tabs-container">
                <button
                  className={`tab-button ${
                    activeTab === "now-playing" ? "tab-active" : "tab-inactive"
                  }`}
                  onClick={() => setActiveTab("now-playing")}
                >
                  Now Playing
                </button>
                <button
                  className={`tab-button ${
                    activeTab === "coming-soon" ? "tab-active" : "tab-inactive"
                  }`}
                  onClick={() => setActiveTab("coming-soon")}
                >
                  Coming Soon
                </button>
              </div>
              <Link to="/movies" className="view-all-link">
                View All
              </Link>
            </div>
            <div className="featured-movies">
              {activeTab === "now-playing" ? (
                <FeaturedMovies />
              ) : (
                <FeaturedMovies type="coming-soon" />
              )}
            </div>
          </div>
        </section>

        <section className="showtimes-section">
          <div className="section-header">
            <h2 className="section-title">Showtimes Near You</h2>
            <Button variant="outline">Change Location</Button>
          </div>
          <MovieShowtimes />
        </section>

        <section className="promotions-section">
          <h2 className="section-title">Special Offers & Promotions</h2>
          <PromoSection />
        </section>
      </main>
    </div>
  );
}

export default HomePage;
