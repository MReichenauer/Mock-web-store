import { useParams, useSearchParams } from "react-router-dom";
import { ProductOverview } from "../services/Types";
import Pagination from "./Pagination";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import OverviewCard from "./cards/OverviewCard";
import { useSingleCategory } from "../hooks/useSingleCategory";

const ProductsByCategory = () => {
	const { category } = useParams();
	const [searchParams, setSearchParams] = useSearchParams();
	const page = Number(searchParams.get("page") || 1);
	const limit = 8;
	const skip = (page - 1) * limit;

	if (!category) {
		return;
	}

	const {
		data: categoryData,
		isError: categoryIsError,
		error: categoryError,
		isSuccess: categoryIsSuccess,
		isLoading: categoryIsLoading,
	} = useSingleCategory(limit, skip, category);

	const handlePageChange = (newPage: number) => {
		setSearchParams({ page: String(newPage) });
	};

	if (categoryIsLoading) {
		return <p>Loading...</p>;
	}

	if (categoryIsError) {
		return <p>Error loading products: {categoryError.message}</p>;
	}

	if (!categoryData) {
		return;
	}

	// Total products divided by the limit = total pages
	const totalPages = Math.ceil(categoryData.total / limit);

	return (
		<Container>
			<h2>Category: {category}</h2>
			<Row>
				{categoryIsSuccess &&
					categoryData.products.map((product: ProductOverview) => (
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

export default ProductsByCategory;
