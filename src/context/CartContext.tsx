import { CartItem } from "../services/Types";
import { createContext, useContext, useState, useEffect } from "react";

type CartContextType = {
	cart: CartItem[];
	addToCart: (item: CartItem) => void;
	removeFromCart: (id: number) => void;
	increaseQuantity: (id: number) => void;
	decreaseQuantity: (id: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [cart, setCart] = useState<CartItem[]>(() => {
		const storedCart = localStorage.getItem("cart");
		if (storedCart) {
			try {
				return JSON.parse(storedCart);
			} catch (error) {
				console.log("Could not get storedCart: ", error);
				return [];
			}
		}
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

	return (
		<CartContext.Provider
			value={{
				cart,
				addToCart,
				removeFromCart,
				increaseQuantity,
				decreaseQuantity,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => {
	const context = useContext(CartContext);
	if (context === undefined) {
		throw new Error("useCart must be used within its provider");
	}
	return context;
};
