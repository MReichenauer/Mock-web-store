import "../assets/scss/NotFoundPage.scss";
import { Link } from "react-router-dom";
const NotFoundPage = () => {
	return (
		<div className="notFoundContainer">
			<div className="notFoundContentContainer">
				<h1>This page dose not exist!</h1>
				<p>
					Click <Link to={"/"}>Here</Link> to be redirected to Mock Store
				</p>
			</div>
		</div>
	);
};

export default NotFoundPage;
