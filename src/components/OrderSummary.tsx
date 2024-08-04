import { CartItem } from "../services/Types";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

type OrderSummaryProps = {
	cart: CartItem[];
	total: number;
	shipping: number;
};

const OrderSummary = ({ cart, total, shipping }: OrderSummaryProps) => {
	const totalWithShipping = total + shipping;
	return (
		<div className="card mt-4 p-3">
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
						<ListGroupItem>
							<p>{item.title}</p>
							<span>Quantity: {item.quantity}</span>
							<p>Price per unit: ${item.price}</p>
						</ListGroupItem>
					</ListGroup>
				))}
			</div>
		</div>
	);
};

export default OrderSummary;
