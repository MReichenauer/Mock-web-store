import { useSearchParams } from "react-router-dom";
import { useAllProducts } from "../hooks/useAllProducts";
import { ProductOverview } from "../services/Types";
import Pagination from "./Pagination";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const AllProducts = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const page = Number(searchParams.get("page") || 1);
	const limit = 8;
	const skip = (page - 1) * limit;

	const {
		data: productsData,
		isError: productsIsError,
		error: productsError,
		isSuccess: productsIsSuccess,
		isLoading: productsIsLoading,
	} = useAllProducts(limit, skip);

	const handlePageChange = (newPage: number) => {
		setSearchParams({ page: newPage.toString() });
	};

	if (productsIsLoading) {
		return <p>Loading...</p>;
	}

	if (productsIsError) {
		return <p>Error loading products: {productsError.message}</p>;
	}

	if (!productsData) {
		return;
	}

	// Total products divided by the limit = total pages
	const totalPages = Math.ceil(productsData.total / limit);

	return (
		<Container>
			<Row>
				{productsIsSuccess &&
					productsData.products.map((product: ProductOverview) => (
						<Col key={product.id} xs={12} sm={6} md={6} lg={4} xl={3}>
							<Card>
								<Card.Img variant="top" src={product.thumbnail} />
								<Card.Body>
									<Card.Title>{product.title}</Card.Title>
									<Card.Text>Price: ${product.price}</Card.Text>
									<Card.Text>
										Rating: {product.rating.toFixed(1)}/5 ⭐
									</Card.Text>
									<Card.Text>Stock: {product.stock}</Card.Text>

									<div className="d-flex justify-content-end">
										<Button>Buy</Button>
									</div>
								</Card.Body>
							</Card>
						</Col>
					))}
			</Row>
			<Pagination
				currentPage={page}
				totalPages={totalPages}
				onPageChange={handlePageChange}
			/>
		</Container>
	);
};

export default AllProducts;
