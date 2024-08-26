import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import "../../assets/scss/OverviewCard.scss";
import { Container } from "react-bootstrap";
import { useCart } from "../../hooks/contexts/useCart";
import { toast } from "react-toastify";

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
		toast.success(`${title} added to cart`);
	};

	return (
		<Col
			key={id}
			xs={6}
			sm={6}
			md={4}
			lg={3}
			xl={2}
			className="d-flex justify-content-center"
		>
			<Container className="mb-4 p-0 d-flex justify-content-center">
				<Card key={id} className="overviewCardFull">
					<Link to={`/product/${id}`} className="textStyle">
						<Card.Img
							variant="top"
							src={thumbnail}
							className="overviewCardImage"
							alt={title}
						/>
					</Link>

					<Card.Body className="overviewCardBody">
						<Link to={`/product/${id}`} className="textStyle">
							<Card.Title className="overviewCardTitle">{title}</Card.Title>

							<Card.Text className="overviewCardText">
								Price: ${price}
							</Card.Text>
							<Card.Text className="overviewCardText">
								Rating: {rating.toFixed(1)}/5 ⭐
							</Card.Text>
							<Card.Text className="overviewCardText">Stock: {stock}</Card.Text>
						</Link>
					</Card.Body>
					<Card.Footer className="overviewCardFooter">
						<Button
							variant="outline-success"
							className="overviewCardButton"
							onClick={handleAddToCart}
						>
							Add to cart
						</Button>
					</Card.Footer>
				</Card>
			</Container>
		</Col>
	);
};

export default OverviewCard;
