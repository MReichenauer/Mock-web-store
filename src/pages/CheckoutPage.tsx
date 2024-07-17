import { CartItem } from "../services/Types";
import { useCart } from "../context/CartContext";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";

const CheckoutPage = () => {
	const { cart, removeFromCart, increaseQuantity, decreaseQuantity } =
		useCart();

	return (
		<Container>
			{cart.length === 0 ? (
				<p>
					Your cart is empty. Please put some products in it so we can earn some
					cash on you!
				</p>
			) : (
				cart.map((item: CartItem) => (
					<div key={item.id} className="mb-3">
						<p className="fw-bold fs-5">{item.title}</p>
						<Row className="align-items-center">
							<Col xs={3} md={2}>
								<Image fluid src={item.thumbnail} />
							</Col>
							<Col>
								<Stack gap={2}>
									<p className="mb-1">Price: ${item.price}</p>
									<div className="mb-1">
										<div className="d-flex align-items-center">
											<p className="mb-0">Quantity: {item.quantity}</p>
											<Button
												className="ms-3 me-1"
												variant="outline-secondary"
												size="sm"
												onClick={() => decreaseQuantity(item.id)}
												disabled={item.quantity <= 1}
											>
												-
											</Button>

											<Button
												className="ms-1"
												variant="outline-secondary"
												size="sm"
												onClick={() => increaseQuantity(item.id)}
												disabled={item.stock === item.quantity}
											>
												+
											</Button>
										</div>
									</div>
								</Stack>
							</Col>
							<Col xs="1" className="d-flex justify-content-end">
								<Button
									variant="danger"
									size="sm"
									onClick={() => removeFromCart(item.id)}
								>
									X
								</Button>
							</Col>
						</Row>
					</div>
				))
			)}
		</Container>
	);
};

export default CheckoutPage;
