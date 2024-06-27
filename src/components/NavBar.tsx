import { useState } from "react";
import { NavLink } from "react-router-dom";
import useAllCategories from "../hooks/useAllCategories";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const NavBar = () => {
	const {
		data: allCategories,
		isError: isErrorCategories,
		error: errorCategories,
		isSuccess: isSuccessCategories,
	} = useAllCategories();

	const [expanded, setExpanded] = useState(false);

	if (isErrorCategories)
		return <p>Error getting categories: {errorCategories.message}</p>;

	const handleToggle = () => {
		setExpanded(!expanded);
	};

	return (
		<>
			{isSuccessCategories && (
				<Navbar expand="lg" expanded={expanded}>
					<Container>
						<Navbar.Brand as={NavLink} to="/">
							Mock Store
						</Navbar.Brand>

						<Navbar.Toggle
							aria-controls="basic-navbar-nav"
							onClick={handleToggle}
						/>

						<Navbar.Collapse>
							<Nav className="me-auto">
								<Nav.Link as={NavLink} to="/" onClick={handleToggle}>
									Home
								</Nav.Link>
								<NavDropdown title="Categories">
									{allCategories.map((category, index) => (
										<NavDropdown.Item
											as={NavLink}
											key={index}
											to={`/${category}`}
											onClick={handleToggle}
										>
											{category}
										</NavDropdown.Item>
									))}
								</NavDropdown>
							</Nav>
						</Navbar.Collapse>
					</Container>
				</Navbar>
			)}
		</>
	);
};

export default NavBar;
