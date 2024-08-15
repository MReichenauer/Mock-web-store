import { CartItem } from "../services/Types";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import "../assets/scss/OrderSummary.scss";
import { Container } from "react-bootstrap";

type OrderSummaryProps = {
	cart: CartItem[];
	total: number;
	shipping: number;
};

const OrderSummary = ({ cart, total, shipping }: OrderSummaryProps) => {
	const totalWithShipping = total + shipping;
	return (
		<Container className="orderSummaryContainer mt-4 p-3">
			<h2>Order summary</h2>

			{total > 100 ? (
				<div>
					<h2>Total cost: ${total}</h2>
					<span>Free shipping</span>
				</div>
			) : (
				<div>
					<h3 className="mb-2">Total cost: ${totalWithShipping.toFixed(2)}</h3>
					<p className="mb-0">Products: ${total}</p>
					<p>Shipping: ${shipping}</p>
				</div>
			)}

			<div>
				{cart.map((item: CartItem) => (
					<ListGroup key={item.id}>
						<ListGroupItem className="productList">
							<p className="productTitle">{item.title}</p>
							<span className="productText">Quantity: {item.quantity}</span>
							<p className="productText">Price per unit: ${item.price}</p>
						</ListGroupItem>
					</ListGroup>
				))}
			</div>
		</Container>
	);
};

export default OrderSummary;
