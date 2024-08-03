import CardPaymentForm from "./CardPaymentForm";
import { CardFormData, CartItem, InvoiceFormData } from "../../services/Types";
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import Form from "react-bootstrap/Form";
import InvoicePaymentForm from "./InvoicePaymentForm";
import { Image, ListGroup, ListGroupItem } from "react-bootstrap";

const PaymentForm = () => {
	const { cart, clearCart, totalPrice } = useCart();
	const [products, setProducts] = useState<CartItem[]>([]);
	const [personInfo, setPersonInfo] = useState<
		CardFormData | InvoiceFormData | null
	>(null);
	const [orderDone, setOrderDone] = useState(false);
	const [paymentMethod, setPaymentMethod] = useState("card");
	const [cardNumber, setCardNumber] = useState("");
	const [cvv, setCvv] = useState("");
	const [expiration, setExpiration] = useState("");
	const [totalOrderPrice, setTotalOrderPrice] = useState<number | null>();

	const handlePaymentMethodChange = (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		setPaymentMethod(e.target.value);
	};

	const handleCardSubmit = (data: CardFormData) => {
		console.log("User (CARD PAYMENT) info:", data, "User cart:", cart);
		setProducts(cart);
		setPersonInfo(data);
		setCardNumber(data.cardNumber);
		setCvv(data.cvv);
		setExpiration(data.expiration);
		setTotalOrderPrice(totalPrice);
		setOrderDone(true);
		clearCart();
	};

	const handleInvoiceSubmit = (data: InvoiceFormData) => {
		console.log("User (INVOICE PAYMENT) info:", data, "User cart:", cart);
		setProducts(cart);
		setPersonInfo(data);
		setOrderDone(true);
		setTotalOrderPrice(totalPrice);
		clearCart();
	};

	return (
		<>
			{!orderDone && (
				<div>
					<h1 className="mb-3 h2">Select payment method</h1>
					<Form.Group className="d-flex flex-row mt-0 mb-0 ms-1">
						<Form.Check
							className="me-4"
							type="radio"
							label="Card"
							name="paymentMethod"
							value="card"
							checked={paymentMethod === "card"}
							onChange={handlePaymentMethodChange}
						/>
						<Form.Check
							type="radio"
							label="Invoice"
							name="paymentMethod"
							value="invoice"
							checked={paymentMethod === "invoice"}
							onChange={handlePaymentMethodChange}
						/>
					</Form.Group>

					{paymentMethod === "card" ? (
						<CardPaymentForm handleSubmit={handleCardSubmit} />
					) : (
						<InvoicePaymentForm handleSubmit={handleInvoiceSubmit} />
					)}
				</div>
			)}

			{orderDone && personInfo && (
				<>
					<div>
						<h3>Your order</h3>

						{products.map((item) => (
							<ListGroup key={item.id}>
								<ListGroupItem>
									<div className="d-flex">
										<Image
											className="cartThumbnail"
											src={item.thumbnail}
										></Image>
										<div className="d-flex flex-column">
											<p>{item.title}</p>
											<p>Quantity: {item.quantity}</p>
											<p>Price per unit: ${item.price}</p>
										</div>
									</div>
								</ListGroupItem>
							</ListGroup>
						))}
					</div>

					<div>
						<h4>Order summary</h4>
						<p>Order will be sent within 1-2 workdays</p>
						<p>Total cost of products: {totalOrderPrice}</p>
						<p>
							Shipping: {(totalOrderPrice as number) <= 100 ? "$12" : "Free"}
						</p>
						<ul>
							<li>
								Name: {personInfo?.firstName} {personInfo?.lastName}{" "}
							</li>
							<li>Email: {personInfo?.email}</li>
							<li>Phone: {personInfo?.phoneNumber}</li>
							<li>City: {personInfo?.city}</li>
							<li>Country: {personInfo?.country}</li>
							<li>State/County: {personInfo?.state}</li>
							<li>Street name: {personInfo?.streetName}</li>
							<li>Street number: {personInfo?.streetNumber}</li>
							<li>Zip code: {personInfo?.zipCode}</li>
							{cardNumber && (
								<>
									<h5>Card Details</h5>
									<li>Card number: {cardNumber}</li>
									<li>CVV: {cvv}</li>
									<li>Expiration: {expiration}</li>
								</>
							)}
						</ul>
					</div>
				</>
			)}
		</>
	);
};

export default PaymentForm;
