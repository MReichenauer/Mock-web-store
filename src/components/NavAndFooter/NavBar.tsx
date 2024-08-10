import "../../assets/scss/NavBar.scss";
import { useCart } from "../../context/CartContext";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Cart from "../Cart";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import useAllCategories from "../../hooks/useAllCategories";

const NavBar = () => {
	const {
		data: allCategories,
		isError: isErrorCategories,
		error: errorCategories,
		isSuccess: isSuccessCategories,
	} = useAllCategories();

	const { cart, totalPrice } = useCart();

	const [expanded, setExpanded] = useState(false);
	const [showCart, SetShowCart] = useState(false);

	if (isErrorCategories)
		return <p>Error getting categories: {errorCategories.message}</p>;

	const handleToggle = () => {
		setExpanded(!expanded);
	};

	const handleCartToggle = () => {
		SetShowCart(!showCart);
	};

	return (
		<>
			{isSuccessCategories && (
				<>
					<Navbar expand="lg" expanded={expanded}>
						<Container>
							<Navbar.Brand as={NavLink} to="/">
								Mock Store
							</Navbar.Brand>

							<Navbar.Toggle
								className="me-auto"
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
												to={`/category/${category}`}
												onClick={handleToggle}
											>
												{category}
											</NavDropdown.Item>
										))}
									</NavDropdown>
								</Nav>
							</Navbar.Collapse>
							<Button variant="outline-success" onClick={handleCartToggle}>
								Cart
							</Button>
						</Container>
					</Navbar>
					<Offcanvas show={showCart} onHide={handleCartToggle} placement="end">
						<Offcanvas.Header className="pb-0" closeButton>
							<Offcanvas.Title>Cart</Offcanvas.Title>
						</Offcanvas.Header>
						<Offcanvas.Body className="pb-0">
							<Cart />
						</Offcanvas.Body>
						<div className="cartFooter">
							<h5 className="mt-1">Total: ${totalPrice()}</h5>
							<Link to={"/checkout"}>
								<Button
									onClick={handleCartToggle}
									disabled={cart.length <= 0}
									className="cartCheckoutButton"
								>
									Checkout
								</Button>
							</Link>
						</div>
					</Offcanvas>
				</>
			)}
		</>
	);
};

export default NavBar;
