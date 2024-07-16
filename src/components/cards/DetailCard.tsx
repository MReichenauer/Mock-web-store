import { Button } from "react-bootstrap";
import { ProductDetails, Review } from "../../services/Types";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

type DetailCardProps = {
	data: ProductDetails;
};

const DetailCard: React.FC<DetailCardProps> = ({ data }) => {
	const { addToCart } = useCart();

	const handleAddToCart = () => {
		addToCart({
			id: data.id,
			title: data.title,
			price: data.price,
			thumbnail: data.thumbnail,
			stock: data.stock,
			quantity: 1,
		});
	};

	return (
		<div>
			<Row>
				<Col md={6}>
					<Carousel interval={null} variant={"dark"}>
						{data.images.map((img: string, index: number) => (
							<Carousel.Item key={index}>
								<Image src={img} alt={`${data.title}`} thumbnail />
							</Carousel.Item>
						))}
					</Carousel>
				</Col>
				<Col md={6}>
					<Card>
						<Card.Body>
							<div className="d-flex align-items-center">
								<Card.Title>{data.title}</Card.Title>
								<Button
									onClick={handleAddToCart}
									variant="success"
									className="ms-auto"
								>
									Add to cart
								</Button>
							</div>
							<Card.Text>{data.description}</Card.Text>
							<ListGroup variant="flush">
								<ListGroup.Item>Price: ${data.price}</ListGroup.Item>
								<ListGroup.Item>
									Category:{" "}
									<Link to={`/category/${data.category}`}>{data.category}</Link>
								</ListGroup.Item>
								<ListGroup.Item>Brand: {data.brand}</ListGroup.Item>
								<ListGroup.Item>Stock: {data.stock}</ListGroup.Item>
								<ListGroup.Item>
									Dimensions: {data.dimensions.width} x {data.dimensions.height}{" "}
									x {data.dimensions.depth} cm
								</ListGroup.Item>
								<ListGroup.Item>
									Warranty: {data.warrantyInformation}
								</ListGroup.Item>
								<ListGroup.Item>
									Shipping: {data.shippingInformation}
								</ListGroup.Item>
								<ListGroup.Item>
									Return Policy: {data.returnPolicy}
								</ListGroup.Item>
							</ListGroup>
						</Card.Body>
					</Card>
				</Col>
			</Row>
			<Row>
				<Col>
					<h1 className="h3">Reviews</h1>
					{data.reviews.map((review: Review, index: number) => (
						<Card className="mb-3" key={index}>
							<Card.Body>
								<Card.Title>{review.reviewerName}</Card.Title>
								<Card.Text>{review.comment}</Card.Text>
								<Card.Subtitle>Rating: {review.rating}/5⭐</Card.Subtitle>
								<Card.Footer className="px-0 pb-0">
									Posted: {new Date(review.date).toLocaleDateString()}
								</Card.Footer>
							</Card.Body>
						</Card>
					))}
				</Col>
			</Row>
		</div>
	);
};

export default DetailCard;
