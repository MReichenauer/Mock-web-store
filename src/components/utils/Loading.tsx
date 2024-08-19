import Spinner from "react-bootstrap/Spinner";
import "../../assets/scss/Loading.scss";

const Loading = () => {
	return (
		<div className="loadingSpinner">
			<Spinner
				animation="border"
				role="status"
				aria-label="Loading spinner"
				className="mb-5"
			>
				<span className="visually-hidden">Loading...</span>
			</Spinner>
		</div>
	);
};

export default Loading;
