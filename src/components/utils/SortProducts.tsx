import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useEffect, useState } from "react";
import "../../assets/scss/SortProducts.scss";
import Button from "react-bootstrap/Button";

type SortProductsProps = {
	sortBy: string;
	order: string;
	onSortChange: (sortAfter: string, sortOrder: string) => void;
};

const SortProducts: React.FC<SortProductsProps> = ({
	sortBy,
	order,
	onSortChange,
}) => {
	const [sortTitle, setSortTitle] = useState("");

	useEffect(() => {
		const getSortTitle = () => {
			if (sortBy === "title" && order === "asc") return "Title A - Z";
			if (sortBy === "title" && order === "desc") return "Title Z - A";
			if (sortBy === "price" && order === "asc") return "Price Low - High";
			if (sortBy === "price" && order === "desc") return "Price High - Low";
			if (sortBy === "rating" && order === "asc") return "Rating Low - High";
			if (sortBy === "rating" && order === "desc") return "Rating High - Low";
			return "Sort by";
		};

		setSortTitle(getSortTitle());
	}, [sortBy, order]);
	return (
		<div className="d-flex">
			<DropdownButton
				aria-label="Sort products dropdown menu"
				id="dropdown-basic-button"
				title={sortTitle}
			>
				<Dropdown.Item
					onClick={() => {
						onSortChange("title", "asc");
					}}
				>
					Title A - Z
				</Dropdown.Item>
				<Dropdown.Item
					onClick={() => {
						onSortChange("title", "desc");
					}}
				>
					Title Z - A
				</Dropdown.Item>
				<Dropdown.Item
					onClick={() => {
						onSortChange("price", "asc");
					}}
				>
					Price Low - High
				</Dropdown.Item>
				<Dropdown.Item
					onClick={() => {
						onSortChange("price", "desc");
					}}
				>
					Price High - Low
				</Dropdown.Item>
				<Dropdown.Item
					onClick={() => {
						onSortChange("rating", "asc");
					}}
				>
					Rating Low - High
				</Dropdown.Item>
				<Dropdown.Item
					onClick={() => {
						onSortChange("rating", "desc");
					}}
				>
					Rating High - Low
				</Dropdown.Item>
			</DropdownButton>

			<Button
				variant="none"
				className="resetButton"
				onClick={() => {
					onSortChange("id", "asc");
				}}
			>
				Reset
			</Button>
		</div>
	);
};

export default SortProducts;
