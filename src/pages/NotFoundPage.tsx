import { Container } from "react-bootstrap";
import notfound from "../assets/img/svg/404 error with a landscape-bro.svg";
import { Link } from "react-router-dom";
const NotFoundPage = () => {
	return (
		<Container>
			<img src={notfound}></img>
			<h1>This page dose not exist!</h1>
			<h2>
				Click <Link to={"/"}>Here</Link> to be redirected to Mock Store
			</h2>
		</Container>
	);
};

export default NotFoundPage;
