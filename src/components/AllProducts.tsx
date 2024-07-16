import { useSearchParams } from "react-router-dom";
import { useAllProducts } from "../hooks/useAllProducts";
import { ProductOverview } from "../services/Types";
import Container from "react-bootstrap/Container";
import Pagination from "./Pagination";
import OverviewCard from "./cards/OverviewCard";
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
		setSearchParams({ page: String(newPage) });
	};

	if (productsIsLoading) {
		return <p>Loading...</p>;
	}

	if (productsIsError) {
		return <p>Error: {productsError.message}</p>;
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
						<OverviewCard
							key={product.id}
							id={product.id}
							thumbnail={product.thumbnail}
							title={product.title}
							price={product.price}
							rating={product.rating}
							stock={product.stock}
						/>
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
