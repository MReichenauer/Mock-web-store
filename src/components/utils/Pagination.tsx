import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

type PaginationProps = {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	totalPages,
	onPageChange,
}) => {
	const handlePrevPage = () => {
		if (currentPage > 1) {
			onPageChange(currentPage - 1);
		}
	};

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			onPageChange(currentPage + 1);
		}
	};

	return (
		<ButtonGroup className="my-5">
			<Button onClick={handlePrevPage} disabled={currentPage === 1}>
				Previous
			</Button>
			<span>
				{currentPage} / {totalPages}
			</span>
			<Button onClick={handleNextPage} disabled={currentPage === totalPages}>
				Next
			</Button>
		</ButtonGroup>
	);
};

export default Pagination;
