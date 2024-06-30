import React from "react";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

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
	return (
		<Col key={id} xs={12} sm={6} md={6} lg={4} xl={3}>
			<Card>
				<Card.Img variant="top" src={thumbnail} />
				<Card.Body>
					<Card.Title>{title}</Card.Title>
					<Card.Text>Price: ${price}</Card.Text>
					<Card.Text>Rating: {rating.toFixed(1)}/5 ⭐</Card.Text>
					<Card.Text>Stock: {stock}</Card.Text>
					<div className="d-flex justify-content-end">
						<Button>Buy</Button>
					</div>
				</Card.Body>
			</Card>
		</Col>
	);
};

export default OverviewCard;
