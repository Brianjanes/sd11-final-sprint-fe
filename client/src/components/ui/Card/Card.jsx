// src/components/ui/Card/Card.jsx
import "./Card.css";

export function Card({ className = "", ...props }) {
  return <div className={`card ${className}`} {...props} />;
}

export function CardContent({ className = "", ...props }) {
  return <div className={`card-content ${className}`} {...props} />;
}
