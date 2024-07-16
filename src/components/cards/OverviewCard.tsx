import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

type OverviewCardProps = {
	id: number;
	thumbnail: string;
	title: string;
	price: number;
	rating: number;
	stock: number;
};

const OverviewCard: React.FC<OverviewCardProps> = ({
	id,
	thumbnail,
	title,
	price,
	rating,
	stock,
}) => {
	const { addToCart } = useCart();

	const handleAddToCart = () => {
		addToCart({ id, title, price, thumbnail, stock, quantity: 1 });
	};

	return (
		<Col key={id} xs={12} sm={6} md={6} lg={4} xl={3}>
			<Card>
				<Link to={`/product/${id}`}>
					<Card.Img variant="top" src={thumbnail} />
				</Link>
				<Card.Body>
					<Link to={`/product/${id}`}>
						<Card.Title>{title}</Card.Title>
					</Link>
					<Card.Text>Price: ${price}</Card.Text>
					<Card.Text>Rating: {rating.toFixed(1)}/5 ⭐</Card.Text>
					<Card.Text>Stock: {stock}</Card.Text>
					<div className="d-flex justify-content-end">
						<Button variant="success" onClick={handleAddToCart}>
							Add to cart
						</Button>
					</div>
				</Card.Body>
			</Card>
		</Col>
	);
};

export default OverviewCard;
