import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminLink = () => {
  const { openLoginModal } = useAuth();
  const token = localStorage.getItem("token");

  const handleClick = (e) => {
    if (!token) {
      e.preventDefault();
      openLoginModal();
    }
  };

  return (
    <Link to="/admin" className="footer-link" onClick={handleClick}>
      Admin
    </Link>
  );
};

export default AdminLink;
