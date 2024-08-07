import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import OverviewCard from "../components/cards/OverviewCard";
import Pagination from "../components/Pagination";
import { useProductsBySearch } from "../hooks/useProductsBySearch";
import { ProductOverview } from "../services/Types";
import SortProducts from "../components/SortProducts";

const SearchResultsPage = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const searchQuery = searchParams.get("query") || "";
	const page = Number(searchParams.get("page") || 0);
	const limit = 8;
	const skip = (page - 1) * limit;
	const [sortBy, setSortBy] = useState("id");
	const [order, setOrder] = useState("asc");

	const { data, isLoading, isError } = useProductsBySearch(
		limit,
		skip,
		searchQuery,
		sortBy,
		order,
	);

	const handlePageChange = (newPage: number) => {
		setSearchParams({ query: searchQuery, page: String(newPage) });
	};

	const handleSortChange = (sortAfter: string, sortOrder: string) => {
		setSortBy(sortAfter);
		setOrder(sortOrder);
	};

	useEffect(() => {
		setTimeout(() => {
			window.scroll({
				top: 0,
				left: 0,
				behavior: "smooth",
			});
		}, 0);
		console.log("New page");
	}, [page]);

	if (isLoading) return <p>Loading...</p>;
	if (isError) return <p>Error getting data...</p>;

	const totalPages = data ? Math.ceil(data.total / limit) : 0;

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
				{data &&
					data.products.map((product: ProductOverview) => (
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

			{totalPages > 1 && (
				<Pagination
					currentPage={page}
					totalPages={totalPages}
					onPageChange={handlePageChange}
				/>
			)}
		</Container>
	);
};

export default SearchResultsPage;
