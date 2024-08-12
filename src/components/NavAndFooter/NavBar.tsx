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
import cartIcon from "../../assets/img/svg/cartIcon.svg";
import SearchBar from "../utils/SearchBar";

const NavBar = () => {
	const { data, isError, error, isSuccess } = useAllCategories();

	const { cart, totalPrice } = useCart();

	const [expanded, setExpanded] = useState(false);
	const [showCart, SetShowCart] = useState(false);

	if (isError) return <p>Error getting categories: {error.message}</p>;

	const handleToggle = () => {
		setExpanded(!expanded);
	};

	const handleCartToggle = () => {
		SetShowCart(!showCart);
	};

	return (
		<>
			{isSuccess && (
				<>
					<Navbar expand="lg" expanded={expanded} className="navbarFull">
						<Container>
							<Navbar.Brand as={NavLink} to="/" className="navbarBrand">
								Mock Store
							</Navbar.Brand>
							<Nav className="navbarRight">
								<Button
									variant="outline-success"
									onClick={handleCartToggle}
									className="cartButton"
								>
									<img src={cartIcon} alt="Cart" width="22" height="22"></img>
									<span className="cartCount">{cart.length}</span>
								</Button>
							</Nav>
							<Navbar.Toggle
								className="navbarToggle"
								aria-controls="basic-navbar-nav"
								onClick={handleToggle}
							/>

							<Navbar.Collapse className="justify-content-between">
								<Nav className="navbarLeft">
									<NavDropdown title="Categories">
										<div className="dropdownItemsContainer" role="menu">
											{data.map((category, index) => (
												<NavDropdown.Item
													as={NavLink}
													key={index}
													to={`/category/${category}`}
													onClick={handleToggle}
													className="dropdownItem"
												>
													{category}
												</NavDropdown.Item>
											))}
										</div>
									</NavDropdown>
									<div className="searchBarContainer">
										<SearchBar />
									</div>
								</Nav>
							</Navbar.Collapse>
						</Container>

						<Offcanvas
							show={showCart}
							onHide={handleCartToggle}
							placement="end"
						>
							<Offcanvas.Header className="pb-0" closeButton>
								<Offcanvas.Title>
									<img src={cartIcon} alt="Cart" width="26" height="26"></img>
								</Offcanvas.Title>
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
					</Navbar>
				</>
			)}
		</>
	);
};

export default NavBar;
