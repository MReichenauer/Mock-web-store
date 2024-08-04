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
		<Container className="receiptContainer z-2">
			<div>
				<h3>Your payment was successful!</h3>
			</div>
			<div className="orderDetails">
				<h4>Order details</h4>
				<p>Order will be sent within 1-2 workdays</p>
				<p>Total cost of products: ${totalOrderPrice}</p>
				<p>Shipping: {totalOrderPrice <= 100 ? "$12" : "Free"}</p>
				<h4>Your information</h4>
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
					{cardNumber && (
						<div>
							<h5>Card Details</h5>
							<li>Card number: {cardNumber}</li>
							<li>CVV: {cvv}</li>
							<li>Expiration: {expiration}</li>
						</div>
					)}
				</ul>
			</div>
			<div>
				<h4>Products</h4>
				{products.map((item) => (
					<ListGroup key={item.id}>
						<ListGroupItem>
							<div className="d-flex">
								<Image className="cartThumbnail" src={item.thumbnail} />
								<div className="d-flex flex-column ">
									<p className="mb-1 mt-1">{item.title}</p>
									<p className="mb-1">Quantity: {item.quantity}</p>
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
