import "../assets/scss/Checkout.scss";
import { CartItem } from "../services/Types";
import { useCart } from "../context/CartContext";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";

const CheckoutPage = () => {
	const {
		cart,
		removeFromCart,
		increaseQuantity,
		decreaseQuantity,
		totalPrice,
	} = useCart();

	return (
		<Container>
			<h2 className="mt-3 mb-3">Review your products below</h2>
			<div className="checkoutCart">
				{cart.length === 0 ? (
					<p>
						Your cart is empty. Please put some products in it so we can earn
						some cash on you!
					</p>
				) : (
					cart.map((item: CartItem) => (
						<div key={item.id} className="mb-3 checkoutCartItem">
							<p className="fs-5">{item.title}</p>
							<Row className="align-items-center">
								<Col xs={3} md={1}>
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
			</div>

			<div className="d-flex">
				<h3 className="mt-4">Total: ${totalPrice()}</h3>
				<div className="ms-auto mt-4 ms-auto">
					<Button variant="success" className="toPaymentButton">
						Continue to payment
					</Button>
				</div>
			</div>
		</Container>
	);
};

export default CheckoutPage;
