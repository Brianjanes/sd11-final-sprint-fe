import "./styles/App.css";
import Header from "./components/ui/Header/Header";
import Footer from "./components/ui/Footer/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MovieDetailPage from "./pages/MovieDetailPage";
import SeatPicker from "./pages/SeatPicker";
import BookingPage from "./pages/BookingPage";
import TicketPage from "./pages/TicketPage";
import Admin from "./pages/Admin/Admin";
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

                {/* NEW ROUTES */}
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
