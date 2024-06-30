import { Route, Routes } from "react-router-dom";
import "../src/assets/scss/App.scss";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";

function App() {
	return (
		<div id="app">
			<NavBar />
			<Routes>
				<Route path="/" element={<HomePage />} />
			</Routes>
		</div>
	);
}

export default App;
