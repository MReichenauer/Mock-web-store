import { Form, InputGroup } from "react-bootstrap";
import "../assets/scss/SearchBar.scss";

const SearchBar = () => {
	return (
		<div className="searchContainer">
			<div>
				<InputGroup className="mb-3 mt-2">
					<Form.Control
						placeholder="Search"
						aria-label="Default"
						aria-describedby="inputGroup-sizing-xl"
					/>
				</InputGroup>
			</div>
		</div>
	);
};

export default SearchBar;
