import "../assets/scss/Cart.scss";
import { useCart } from "../context/CartContext";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
const Cart = () => {
	const { cart, removeFromCart, increaseQuantity, decreaseQuantity } =
		useCart();

	return (
		<>
			{cart.length === 0 ? (
				<p>Your cart is empty.</p>
			) : (
				cart.map((item) => (
					<Card key={item.id} className="mb-3">
						<Card.Body>
							<Card.Title>
								<div className="d-flex">
									<Image className="cartThumbnail" src={item.thumbnail}></Image>
									<div className="ms-2">{item.title}</div>
									<Button
										className="ms-auto removeButton"
										variant="danger"
										size="sm"
										onClick={() => removeFromCart(item.id)}
									>
										<strong>X</strong>
									</Button>
								</div>
							</Card.Title>
							<Card.Text>Price: ${item.price}</Card.Text>

							<div className="d-flex justify-content-around">
								<Button
									variant="outline-secondary"
									onClick={() => decreaseQuantity(item.id)}
									disabled={item.quantity <= 1}
								>
									-
								</Button>
								<Card.Text>Quantity: {item.quantity}</Card.Text>
								<Button
									variant="outline-secondary"
									onClick={() => increaseQuantity(item.id)}
									disabled={item.stock === item.quantity}
								>
									+
								</Button>
							</div>
						</Card.Body>
					</Card>
				))
			)}
		</>
	);
};

export default Cart;
