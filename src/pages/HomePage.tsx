import Container from "react-bootstrap/Container";
import AllProducts from "../components/AllProducts";

const HomePage = () => {
	return (
		<Container>
			<h1>Welcome</h1>
			<AllProducts />
		</Container>
	);
};

export default HomePage;
