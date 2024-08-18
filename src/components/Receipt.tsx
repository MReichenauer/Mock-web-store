import "../assets/scss/Receipt.scss";
import { CardFormData, CartItem, InvoiceFormData } from "../services/Types";
import { ListGroup, ListGroupItem, Image, Container } from "react-bootstrap";

type ReceiptProps = {
	products: CartItem[];
	personInfo: CardFormData | InvoiceFormData;
	totalOrderPrice: number;
	cardNumber?: string;
	cvv?: string;
	expiration?: string;
};

const Receipt = ({
	products,
	personInfo,
	totalOrderPrice,
	cardNumber,
	cvv,
	expiration,
}: ReceiptProps) => {
	return (
		<Container className="receiptContainer">
			<div>
				<h3 className="receiptTitle">Order Confirmation</h3>
			</div>

			<div className="orderDetails">
				<h4>Details</h4>
				<p>Your Order will be sent within 1-2 workdays</p>
				<p>Total cost of your order is: ${totalOrderPrice}</p>
				<p>Total cost of products: ${totalOrderPrice}</p>
				<p>Shipping: {totalOrderPrice <= 100 ? "$12" : "Free"}</p>
			</div>

			<div className="customerInfo">
				<h4>Customer Information</h4>
				<ul>
					<li>
						Name: {personInfo.firstName} {personInfo.lastName}
					</li>
					<li>Email: {personInfo.email}</li>
					<li>Phone: {personInfo.phoneNumber}</li>
					<li>City: {personInfo.city}</li>
					<li>Country: {personInfo.country}</li>
					<li>State/County: {personInfo.state}</li>
					<li>Street name: {personInfo.streetName}</li>
					<li>Street number: {personInfo.streetNumber}</li>
					<li>Zip code: {personInfo.zipCode}</li>
				</ul>

				{cardNumber && (
					<div className="cardInfo">
						<ul>
							<h4>Card Details</h4>
							<li>Card number: {cardNumber}</li>
							<li>CVV: {cvv}</li>
							<li>Expiration: {expiration}</li>
						</ul>
					</div>
				)}
			</div>
			<div className="productSummary">
				<h4>Products Ordered</h4>
				{products.map((item) => (
					<ListGroup key={item.id}>
						<ListGroupItem className="productList">
							<div className="productItem">
								<Image
									className="cartThumbnail"
									src={item.thumbnail}
									alt={item.title}
								/>
								<div>
									<p className="productTitle">{item.title}</p>
									<p className="">Quantity: {item.quantity}</p>
									<p>Price per unit: ${item.price}</p>
								</div>
							</div>
						</ListGroupItem>
					</ListGroup>
				))}
			</div>
		</Container>
	);
};

export default Receipt;
