import CardPaymentForm from "./CardPaymentForm";
import { CardFormData, CartItem, InvoiceFormData } from "../../services/Types";
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import Form from "react-bootstrap/Form";
import InvoicePaymentForm from "./InvoicePaymentForm";
import Receipt from "../Receipt";

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
				<Receipt
					products={products}
					personInfo={personInfo}
					totalOrderPrice={totalOrderPrice as number}
					cardNumber={cardNumber}
					cvv={cvv}
					expiration={expiration}
				/>
			)}
		</>
	);
};

export default PaymentForm;
