import "../assets/scss/PaymentForm.scss";
import OrderSummary from "../components/OrderSummary";
import PaymentForm from "../components/forms/paymentForm";
import { useCart } from "../context/CartContext";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const PaymentPage = () => {
	const { cart, totalPrice } = useCart();
	const total = totalPrice();
	const shipping = 12; // Shipping fee if order value is bellow $100

	return (
		<Container>
			<Row>
				<Col md={8}>
					<PaymentForm />
				</Col>

				<Col md={4}>
					<OrderSummary cart={cart} total={total} shipping={shipping} />
				</Col>
			</Row>
		</Container>
	);
};

export default PaymentPage;
