import { useState } from "react";
import { Button } from "../../components/ui/Button/Button";
import { Card, CardContent } from "../../components/ui/Card/Card";
import "./Admin.css";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("movies");

  return (
    <div className="admin-container">
      <div className="admin-content">
        <div className="admin-header">
          <h1 className="admin-title">Admin Dashboard</h1>
          <Button
            variant="outline"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
          >
            Logout
          </Button>
        </div>

        <div className="admin-panel">
          <div className="admin-tabs">
            <nav className="admin-nav">
              <button
                className={`tab-button ${
                  activeTab === "movies" ? "active" : ""
                }`}
                onClick={() => setActiveTab("movies")}
              >
                Movies
              </button>
              <button
                className={`tab-button ${
                  activeTab === "showtimes" ? "active" : ""
                }`}
                onClick={() => setActiveTab("showtimes")}
              >
                Showtimes
              </button>
            </nav>
          </div>

          <div className="admin-panel-content">
            {activeTab === "movies" && (
              <div>
                <div className="section-header">
                  <h2 className="section-title">Manage Movies</h2>
                  <Button>Add New Movie</Button>
                </div>
                <div className="content-grid">
                  <Card>
                    <CardContent>
                      <p className="empty-state">No movies added yet</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === "showtimes" && (
              <div>
                <div className="section-header">
                  <h2 className="section-title">Manage Showtimes</h2>
                  <Button>Add New Showtime</Button>
                </div>
                <div className="content-grid">
                  <Card>
                    <CardContent>
                      <p className="empty-state">No showtimes added yet</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
