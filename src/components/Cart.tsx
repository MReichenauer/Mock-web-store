import "../assets/scss/Cart.scss";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";
import trashCanIcon from "../assets/img/svg/trashCan.svg";
import plusCircle from "../assets/img/svg/plusCircle.svg";
import minusCircle from "../assets/img/svg/minusCircle.svg";
import { useCart } from "../hooks/useCart";
const Cart = () => {
	const { cart, removeFromCart, increaseQuantity, decreaseQuantity } =
		useCart();

	return (
		<>
			{cart.length === 0 ? (
				<p className="emptyCartMessage">Your cart is empty.</p>
			) : (
				cart.map((item) => (
					<Card key={item.id} className="mb-3 cartCard">
						<Card.Body className="cartBody">
							<Card.Title className="cartTitle">
								<div className="d-flex align-items-center">
									<Link to={`/product/${item.id}`}>
										<Image
											className="cartThumbnail"
											src={item.thumbnail}
											alt={item.title}
										></Image>
									</Link>
									<Link to={`/product/${item.id}`} className="cartTitle">
										<div className="ms-1">{item.title}</div>
									</Link>
								</div>
								<div className="ms-auto mt-4">
									<Button
										className="removeButton "
										size="sm"
										onClick={() => removeFromCart(item.id)}
										aria-label="remove item"
									>
										<img
											src={trashCanIcon}
											alt="Remove"
											width="22"
											height="22"
										/>
									</Button>
								</div>
							</Card.Title>
							<Card.Text className="cartPrice mb-1">
								Price per unit: ${item.price}
							</Card.Text>

							<div className="d-flex justify-content-around align-items-center">
								<Button
									className="quantityButton quantityButtonDecrease"
									onClick={() => decreaseQuantity(item.id)}
									disabled={item.quantity <= 1}
									aria-label="decrease quantity"
								>
									<img
										src={minusCircle}
										alt="Decrease quantity"
										width="22"
										height="22"
									/>
								</Button>
								<Card.Text className="mb-0 cartQuantity">
									Quantity: {item.quantity}
								</Card.Text>
								<Button
									className="quantityButton quantityButtonIncrease"
									onClick={() => increaseQuantity(item.id)}
									disabled={item.stock === item.quantity}
									aria-label="increase quantity"
								>
									<img
										src={plusCircle}
										alt="Increase quantity"
										width="22"
										height="22"
									/>
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
