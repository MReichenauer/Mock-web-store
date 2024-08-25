import { useSingleCategory } from "../hooks/api/useSingleCategory";
import { useParams, useSearchParams } from "react-router-dom";
import { ProductOverview } from "../services/Types";
import Container from "react-bootstrap/Container";
import OverviewCard from "../components/cards/OverviewCard";
import Row from "react-bootstrap/Row";
import { useState } from "react";
import SortProducts from "../components/utils/SortProducts";
import useScrollToTop from "../hooks/utils/useScrollToTop";
import PaginationComponent from "../components/utils/PaginationComponent";
import Loading from "../components/utils/Loading";
import "../assets/scss/CategoryPage.scss";

const CategoryPage = () => {
	const { category } = useParams();
	const [searchParams, setSearchParams] = useSearchParams();
	const page = Number(searchParams.get("page") || 1);
	const limit = 18;
	const skip = (page - 1) * limit;
	const [sortBy, setSortBy] = useState("id");
	const [order, setOrder] = useState("asc");

	useScrollToTop(page);

	const {
		data: categoryData,
		isError: categoryIsError,
		error: categoryError,
		isSuccess: categoryIsSuccess,
		isLoading: categoryIsLoading,
	} = useSingleCategory(limit, skip, category || "", sortBy, order);

	const handlePageChange = (newPage: number) => {
		setSearchParams({ page: String(newPage) });
	};

	const handleSortChange = (sortAfter: string, sortOrder: string) => {
		setSortBy(sortAfter);
		setOrder(sortOrder);
	};

	if (categoryIsLoading) {
		return <Loading />;
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
		<Container className="categoryContainer">
			{category && (
				<h1 className="h2 selectedCategoryTitle">
					{category.charAt(0).toUpperCase() + category.slice(1)}
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

export default CategoryPage;
