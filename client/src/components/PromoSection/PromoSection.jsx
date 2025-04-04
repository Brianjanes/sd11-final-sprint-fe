import { Link } from "react-router-dom";
import { Button } from "../ui/Button/Button";
import { Card, CardContent } from "../ui/Card/Card";
import "./PromoSection.css";

// Default promotions data
const promotions = [
  {
    id: 1,
    title: "Tuesday Discount",
    description: "All movies just $8.99 every Tuesday for members",
    image: "/placeholder.svg",
    link: "/promotions/tuesday",
  },
  {
    id: 2,
    title: "Family Package",
    description:
      "2 adult tickets, 2 kids tickets, 2 popcorns & 2 drinks for $49.99",
    image: "/placeholder.svg",
    link: "/promotions/family",
  },
  {
    id: 3,
    title: "Premium Experience",
    description:
      "Upgrade to VIP seating with in-seat service for just $10 more",
    image: "/placeholder.svg",
    link: "/promotions/premium",
  },
];

export function PromoSection() {
  return (
    <div className="promo-grid">
      {promotions.map((promo) => (
        <Card key={promo.id} className="promo-card">
          <div className="promo-image-container">
            <img
              src={promo.image || "/placeholder.svg"}
              alt={promo.title}
              className="promo-image"
            />
          </div>
          <CardContent className="promo-content">
            <h3 className="promo-title">{promo.title}</h3>
            <p className="promo-description">{promo.description}</p>
            <Button className="promo-button">Learn More</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
