// FILE: src/App.js

import "./styles/App.css";
import Header from "./components/ui/Header/Header";
import Footer from "./components/ui/Footer/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MovieDetailPage from "./pages/MovieDetailPage/MovieDetailPage";
import SeatPicker from "./pages/SeatPicker/SeatPicker";
import BookingPage from "./pages/BookingPage/BookingPage";
import TicketPage from "./pages/TicketPage/TicketPage";
import Admin from "./pages/Admin/Admin";
// New pages:
import Movies from "./pages/Movies/Movies";
import Theatres from "./pages/Theatres";
import Events from "./pages/Events";
import VIP from "./pages/VIP";
import IMAX from "./pages/IMAX";
import Tickets from "./pages/Tickets";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Header />
          <main>
            <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/movies/:id" element={<MovieDetailPage />} />
                <Route
                  path="/showtimes/:showtimeId/seats"
                  element={<SeatPicker />}
                />
                {/* New Routes */}
                <Route path="/movies" element={<Movies />} />
                <Route path="/theatres" element={<Theatres />} />
                <Route path="/events" element={<Events />} />
                <Route path="/vip" element={<VIP />} />
                <Route path="/imax" element={<IMAX />} />
                <Route path="/tickets" element={<Tickets />} />
                <Route path="/booking" element={<BookingPage />} />
                <Route path="/ticket" element={<TicketPage />} />
                {/* Admin (protected) */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <Admin />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </div>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
