import "../../assets/scss/DetailCard.scss";
import { Button, Container } from "react-bootstrap";
import { ProductDetails, Review } from "../../services/Types";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";

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
		<>
			<Row className="mb-4 mt-5">
				<Col md={12} lg={6}>
					<Carousel interval={null} variant={"dark"}>
						{data.images.map((img: string, index: number) => (
							<Carousel.Item key={index}>
								<Image
									src={img}
									alt={`${data.title}`}
									className="detailCardImage"
								/>
							</Carousel.Item>
						))}
					</Carousel>
				</Col>
				<Col md={12} lg={6}>
					<Card className="detailCard">
						<Card.Body>
							<div className="d-flex flex-column align-items-center mb-3">
								<Card.Title className="detailCardTitle">
									{data.title}
								</Card.Title>
								<Container className="detailCardText">
									<Card.Text>{data.description}</Card.Text>
								</Container>
								<Button
									onClick={handleAddToCart}
									variant="success"
									className="ms-auto detailCardButton"
								>
									Add to cart
								</Button>
							</div>
							<ListGroup>
								<ListGroup.Item className="detailCardListItem">
									Price: ${data.price}
								</ListGroup.Item>
								<ListGroup.Item className="detailCardListItem">
									Category:{" "}
									<Link to={`/category/${data.category}`}>{data.category}</Link>
								</ListGroup.Item>
								<ListGroup.Item className="detailCardListItem">
									Brand: {data.brand}
								</ListGroup.Item>
								<ListGroup.Item className="detailCardListItem">
									Stock: {data.stock}
								</ListGroup.Item>
								<ListGroup.Item className="detailCardListItem">
									Dimensions: {data.dimensions.width} x {data.dimensions.height}{" "}
									x {data.dimensions.depth} cm
								</ListGroup.Item>
								<ListGroup.Item className="detailCardListItem">
									Warranty: {data.warrantyInformation}
								</ListGroup.Item>
								<ListGroup.Item className="detailCardListItem">
									Shipping: {data.shippingInformation}
								</ListGroup.Item>
								<ListGroup.Item className="detailCardListItem">
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
						<Card className="mb-3 detailCardReview" key={index}>
							<Card.Body>
								<Card.Title className="detailCardReviewTitle">
									{review.reviewerName}
								</Card.Title>
								<Card.Text className="detailCardReviewText">
									{review.comment}
								</Card.Text>
								<Card.Subtitle className="detailCardReviewSub">
									Rating: {review.rating}/5⭐
								</Card.Subtitle>
								<Card.Footer className="px-0 pb-0 detailCardReviewFooter">
									Posted: {new Date(review.date).toLocaleDateString()}
								</Card.Footer>
							</Card.Body>
						</Card>
					))}
				</Col>
			</Row>
		</>
	);
};

export default DetailCard;
