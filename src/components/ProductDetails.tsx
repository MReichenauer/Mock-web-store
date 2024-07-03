import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { useSingleProduct } from "../hooks/useSingleProduct";

import DetailCard from "./cards/DetailCard";

const ProductDetails = () => {
	const { id } = useParams();
	const productId = Number(id);

	const {
		data: productData,
		isError: productIsError,
		error: productError,
		isLoading: productIsLoading,
	} = useSingleProduct(productId);

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

export default ProductDetails;
