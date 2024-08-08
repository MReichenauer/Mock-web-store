import { useState } from "react";
import "../assets/scss/PaymentForm.scss";
import OrderSummary from "../components/OrderSummary";
import PaymentForm from "../components/forms/paymentForm";
import { useCart } from "../context/CartContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

const PaymentPage = () => {
	const { cart, totalPrice } = useCart();
	const total = totalPrice();
	const shipping = 12; // Shipping fee if order value is bellow $100
	const [showOrderSummary, setShowOrderSummary] = useState(false);

	const toggleOrderSummary = () => {
		setShowOrderSummary(!showOrderSummary);
	};

	return (
		<Container>
			<Row>
				<PaymentForm />
				<Button variant="primary" onClick={toggleOrderSummary}>
					{showOrderSummary ? "Hide order summary" : "Show order summary"}
				</Button>
				{cart.length !== 0 && showOrderSummary && (
					<OrderSummary cart={cart} total={total} shipping={shipping} />
				)}
			</Row>
		</Container>
	);
};

export default PaymentPage;
