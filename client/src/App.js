// src/App.js
import "./styles/App.css";
import Header from "./components/ui/Header/Header";
import Footer from "./components/ui/Footer/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MovieDetailPage from "./pages/MovieDetailPage"; // Existing detail page
import SeatPicker from "./pages/SeatPicker";           // New seat picker page

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <main>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/movies/:id" element={<MovieDetailPage />} />
              <Route path="/showtimes/:showtimeId/seats" element={<SeatPicker />} />
              <Route path="/movies/:id" element={<MovieDetailPage />} />

            </Routes>
          </div>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
