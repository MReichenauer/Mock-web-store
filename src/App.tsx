import { Route, Routes } from "react-router-dom";
import "../src/assets/scss/App.scss";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentPage from "./pages/PaymentPage";

function App() {
	return (
		<div id="app">
			<NavBar />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/category/:category" element={<CategoryPage />} />
				<Route path="/product/:id" element={<ProductDetailsPage />} />
				<Route path="/checkout" element={<CheckoutPage />} />
				<Route path="/payment" element={<PaymentPage />} />
			</Routes>
		</div>
	);
}

export default App;
