import Pagination from "react-bootstrap/Pagination";

type PaginationProps = {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
};

const PaginationComponent: React.FC<PaginationProps> = ({
	currentPage,
	totalPages,
	onPageChange,
}) => {
	const getPaginationItems = () => {
		const items = [];
		const maxVisiblePages = 5;
		const halfOfPages = Math.floor(maxVisiblePages / 2);

		let startPage = currentPage - halfOfPages;
		let endPage = currentPage + halfOfPages;

		if (startPage < 1) {
			startPage = 1;
			endPage = Math.min(totalPages, maxVisiblePages);
		} else if (endPage > totalPages) {
			endPage = totalPages;
			startPage = Math.max(1, totalPages - maxVisiblePages + 1);
		}

		for (let page = startPage; page <= endPage; page++) {
			items.push(
				<Pagination.Item
					key={page}
					active={page === currentPage}
					onClick={() => onPageChange(page)}
				>
					{page}
				</Pagination.Item>,
			);
		}

		return items;
	};

	return (
		<Pagination className="d-flex justify-content-center my-3">
			<Pagination.First
				onClick={() => onPageChange(1)}
				disabled={currentPage === 1}
			/>
			<Pagination.Prev
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
			/>
			{getPaginationItems()}
			<Pagination.Next
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
			/>
			<Pagination.Last
				onClick={() => onPageChange(totalPages)}
				disabled={currentPage === totalPages}
			/>
		</Pagination>
	);
};

export default PaginationComponent;
