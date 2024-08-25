import "../assets/scss/Checkout.scss";
import Button from "react-bootstrap/Button";
import { CartItem } from "../services/Types";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import Stack from "react-bootstrap/Stack";

import trashCanIcon from "../assets/img/svg/trashCan.svg";
import plusCircle from "../assets/img/svg/plusCircle.svg";
import minusCircle from "../assets/img/svg/minusCircle.svg";
import arrowRight from "../assets/img/svg/arrowRight.svg";
import { useCart } from "../hooks/contexts/useCart";

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
			<h2 className="mt-3 mb-3 reviewProductsTitle">
				Review your products below
			</h2>
			<div className="checkoutCart">
				{cart.length === 0 ? (
					<p className="emptyCartMessage">
						Your cart is empty. Please put some products in it so we can earn
						some cash on you!
					</p>
				) : (
					cart.map((item: CartItem) => (
						<div key={item.id} className="mb-3 checkoutCartItem">
							<h3 className="itemTitle">{item.title}</h3>
							<Row className="align-items-center">
								<Col xs={2} md={1}>
									<Image src={item.thumbnail} />
								</Col>
								<Col>
									<Stack gap={2}>
										<div className="mb-1 itemInformation">
											<p className="price">Price: ${item.price}</p>
											<div className="d-flex align-items-center">
												<Button
													className="quantityButton quantityButtonDecrease"
													variant="outline-secondary"
													size="sm"
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
												<p className="mb-0 quantityText">
													Quantity: {item.quantity}
												</p>
												<Button
													className=" quantityButton quantityButtonIncrease"
													variant="outline-secondary"
													size="sm"
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
										</div>
									</Stack>
								</Col>
								<Col xs="1" className="d-flex justify-content-end">
									<Button
										className="removeButton"
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
								</Col>
							</Row>
						</div>
					))
				)}
			</div>

			<div className="d-flex">
				<h3 className="mt-4">Total: ${totalPrice()}</h3>
				<div className="ms-auto mt-4 ms-auto">
					<Link to={"/payment"}>
						<Button
							variant="success"
							className="toPaymentButton"
							disabled={cart.length <= 0}
						>
							Payment{" "}
							<img src={arrowRight} alt="arrow right" width="24" height="24" />
						</Button>
					</Link>
				</div>
			</div>
		</Container>
	);
};

export default CheckoutPage;
