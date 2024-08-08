import "../../assets/scss/SearchBar.scss";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const SearchBar = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const [inputQuery, setInputQuery] = useState(searchParams.get("query") || "");

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		navigate(`/search?query=${inputQuery}&page=1`);
		setInputQuery("");
	};

	return (
		<div className="searchContainer">
			<Form onSubmit={handleSearch}>
				<InputGroup className="mb-3 mt-2">
					<Form.Control
						placeholder="Search"
						aria-label="Default"
						aria-describedby="inputGroup-sizing-xl"
						value={inputQuery}
						onChange={(e) => setInputQuery(e.target.value)}
					/>
					<Button variant="primary" type="submit">
						Search
					</Button>
				</InputGroup>
			</Form>
		</div>
	);
};

export default SearchBar;
