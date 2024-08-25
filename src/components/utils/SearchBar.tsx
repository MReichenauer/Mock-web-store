import "../../assets/scss/SearchBar.scss";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import searchIcon from "../../assets/img/svg/searchIcon.svg";

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
				<InputGroup className="searchForm mb-3 mt-2">
					<Form.Control
						className="searchFormInput"
						placeholder="Search for a product"
						aria-label="Default"
						aria-describedby="inputGroup-sizing-xl"
						value={inputQuery}
						onChange={(e) => setInputQuery(e.target.value)}
					/>
					<Button className="searchButton" type="submit">
						<img src={searchIcon} alt="Search" width="22" height="22"></img>
					</Button>
				</InputGroup>
			</Form>
		</div>
	);
};

export default SearchBar;
