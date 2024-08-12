import { useParams } from "react-router-dom";
import { useSingleProduct } from "../hooks/useSingleProduct";
import Container from "react-bootstrap/Container";
import DetailCard from "../components/cards/DetailCard";
import useScrollToTop from "../hooks/utils/useScrollToTop";

const ProductDetailsPage = () => {
	const { id } = useParams();
	const productId = Number(id);

	const {
		data: productData,
		isError: productIsError,
		error: productError,
		isLoading: productIsLoading,
	} = useSingleProduct(productId);

	useScrollToTop(id as string);

	if (productIsLoading) {
		return <p>Loading...</p>;
	}

	if (productIsError) {
		return <p>Error: {productError.message}</p>;
	}

	if (!productData) {
		return;
	}

	return (
		<Container>
			<DetailCard data={productData} />
		</Container>
	);
};

export default ProductDetailsPage;
