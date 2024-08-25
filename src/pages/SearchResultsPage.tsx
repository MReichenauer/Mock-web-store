import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import OverviewCard from "../components/cards/OverviewCard";
import { useProductsBySearch } from "../hooks/api/useProductsBySearch";
import { ProductOverview } from "../services/Types";
import SortProducts from "../components/utils/SortProducts";
import useScrollToTop from "../hooks/utils/useScrollToTop";
import PaginationComponent from "../components/utils/PaginationComponent";
import Loading from "../components/utils/Loading";
import "../assets/scss/SearchResultsPage.scss";

const SearchResultsPage = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const searchQuery = searchParams.get("query") || "";
	const page = Number(searchParams.get("page") || 0);
	const limit = 18;
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

	useScrollToTop(page);

	if (isLoading) return <Loading />;
	if (isError || !data) return <p>Error getting data...</p>;

	const totalPages = data ? Math.ceil(data.total / limit) : 0;

	if (data.products.length === 0) {
		return (
			<Container>
				<h1 className="h2 searchQueryTitle">
					No product names match:{" "}
					{searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1)}{" "}
				</h1>
				<p>
					Try searching for something else or go thru a category you are
					interested in
				</p>
			</Container>
		);
	}

	return (
		<Container>
			{searchQuery && (
				<h1 className="h2 searchQueryTitle">
					Products matching:{" "}
					{searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1)}
				</h1>
			)}
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
				<PaginationComponent
					currentPage={page}
					totalPages={totalPages}
					onPageChange={handlePageChange}
				/>
			)}
		</Container>
	);
};

export default SearchResultsPage;
