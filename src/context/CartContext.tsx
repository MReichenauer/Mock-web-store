import { CartItem } from "../services/Types";
import { createContext, useState, useEffect } from "react";

type CartContextType = {
	cart: CartItem[];
	addToCart: (item: CartItem) => void;
	removeFromCart: (id: number) => void;
	increaseQuantity: (id: number) => void;
	decreaseQuantity: (id: number) => void;
	totalPrice: () => number;
	clearCart: () => void;
};

export const CartContext = createContext<CartContextType | undefined>(
	undefined,
);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [cart, setCart] = useState<CartItem[]>(() => {
		const storedCart = localStorage.getItem("cart");
		if (storedCart) {
			try {
				return JSON.parse(storedCart) as CartItem[];
			} catch (error) {
				console.log("Could not get storedCart: ", error);
				return [];
			}
		}
		return [];
	});

	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(cart));
	}, [cart]);

	const addToCart = (item: CartItem) => {
		setCart((prevCart) => {
			const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
			if (existingItem) {
				return prevCart.map((cartItem) =>
					cartItem.id === item.id
						? { ...cartItem, quantity: cartItem.quantity + 1 }
						: cartItem,
				);
			}
			return [...prevCart, { ...item, quantity: 1 }];
		});
	};

	const removeFromCart = (id: number) => {
		setCart((prevCart) => prevCart.filter((item) => item.id !== id));
	};

	const increaseQuantity = (id: number) => {
		setCart((prevCart) =>
			prevCart.map((item) =>
				item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
			),
		);
	};

	const decreaseQuantity = (id: number) => {
		setCart((prevCart) =>
			prevCart.map((item) =>
				item.id === id && item.quantity > 1
					? { ...item, quantity: item.quantity - 1 }
					: item,
			),
		);
	};

	const totalPrice = () => {
		return parseFloat(
			cart
				.reduce((total, item) => total + item.price * item.quantity, 0)
				.toFixed(2),
		);
	};

	const clearCart = () => {
		setCart([]);
	};

	return (
		<CartContext.Provider
			value={{
				cart,
				addToCart,
				removeFromCart,
				increaseQuantity,
				decreaseQuantity,
				totalPrice,
				clearCart,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};
