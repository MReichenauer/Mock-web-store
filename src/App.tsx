import { Route, Routes } from "react-router-dom";
import "../src/assets/scss/App.scss";
import NavBar from "./components/Nav&Cart&receipt&OrderSummary/NavBar";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentPage from "./pages/PaymentPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import NotFoundPage from "./pages/NotFoundPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
	return (
		<div id="app">
			<NavBar />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="*" element={<NotFoundPage />} />

				<Route path="/category/:category" element={<CategoryPage />} />
				<Route path="/product/:id" element={<ProductDetailsPage />} />
				<Route path="/checkout" element={<CheckoutPage />} />
				<Route path="/payment" element={<PaymentPage />} />
				<Route path="/search" element={<SearchResultsPage />} />
			</Routes>
			<ToastContainer
				// position="top-right"
				// autoClose={2000}  // close automatically after 3 seconds instead of the default 5 seconds
				// autoClose={false}  // don't close automatically
				// pauseOnFocusLoss={false}  // continue autoclose even if window isn't in focus
				closeOnClick // close on click
				theme="colored"
				limit={5}
				stacked
			/>
		</div>
	);
}

export default App;
