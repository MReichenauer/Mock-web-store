import "../assets/scss/PaymentForm.scss";
import OrderSummary from "../components/OrderSummary";
import PaymentForm from "../components/forms/paymentForm";
import { useCart } from "../context/CartContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const PaymentPage = () => {
	const { cart, totalPrice } = useCart();
	const total = totalPrice();
	const shipping = 12; // Shipping fee if order value is bellow $100

	return (
		<Container>
			<Row>
				<PaymentForm />

				{cart.length !== 0 && (
					<OrderSummary cart={cart} total={total} shipping={shipping} />
				)}
			</Row>
		</Container>
	);
};

export default PaymentPage;
