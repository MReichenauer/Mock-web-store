import { Route, Routes } from "react-router-dom";
import "../src/assets/scss/App.scss";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";

function App() {
	return (
		<div id="app">
			<NavBar />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/category/:category" element={<CategoryPage />} />
			</Routes>
		</div>
	);
}

export default App;
