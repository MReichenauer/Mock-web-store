import { useSearchParams } from "react-router-dom";
import { useAllProducts } from "../hooks/useAllProducts";
import { ProductOverview } from "../services/Types";
import Container from "react-bootstrap/Container";
import OverviewCard from "../components/cards/OverviewCard";
import Row from "react-bootstrap/Row";
import { useState } from "react";
import SortProducts from "../components/utils/SortProducts";
import useScrollToTop from "../hooks/utils/useScrollToTop";
import PaginationComponent from "../components/utils/PaginationComponent";
import Loading from "../components/utils/Loading";

const HomePage = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const page = Number(searchParams.get("page") || 1);
	const limit = 18;
	const skip = (page - 1) * limit;
	const [sortBy, setSortBy] = useState("id");
	const [order, setOrder] = useState("asc");

	const {
		data: productsData,
		isError: productsIsError,
		error: productsError,
		isSuccess: productsIsSuccess,
		isLoading: productsIsLoading,
	} = useAllProducts(limit, skip, sortBy, order);

	useScrollToTop(page);

	const handlePageChange = (newPage: number) => {
		setSearchParams({ page: String(newPage) });
	};

	const handleSortChange = (sortAfter: string, sortOrder: string) => {
		setSortBy(sortAfter);
		setOrder(sortOrder);
	};

	if (productsIsLoading) {
		return <Loading />;
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
				<SortProducts
					sortBy={sortBy}
					order={order}
					onSortChange={handleSortChange}
				/>
			</Row>
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
			<PaginationComponent
				currentPage={page}
				totalPages={totalPages}
				onPageChange={handlePageChange}
			/>
		</Container>
	);
};

export default HomePage;
