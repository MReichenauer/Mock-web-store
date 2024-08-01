import CardPaymentForm from "./CardPaymentForm";
import { CardFormData, InvoiceFormData } from "../../services/Types";
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import Form from "react-bootstrap/Form";
import InvoicePaymentForm from "./InvoicePaymentForm";

const PaymentForm = () => {
	const { cart, clearCart } = useCart();
	const [paymentMethod, setPaymentMethod] = useState("card");

	const handlePaymentMethodChange = (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		setPaymentMethod(e.target.value);
	};

	const handleCardSubmit = (data: CardFormData) => {
		console.log("User (CARD PAYMENT) info:", data, "User cart:", cart);
		clearCart();
	};

	const handleInvoiceSubmit = (data: InvoiceFormData) => {
		console.log("User (INVOICE PAYMENT) info:", data, "User cart:", cart);
		clearCart();
	};

	return (
		<div>
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
	);
};

export default PaymentForm;
