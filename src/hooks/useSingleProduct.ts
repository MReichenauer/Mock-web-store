import { useQuery } from "@tanstack/react-query";
import { ProductDetails } from "../services/Types";
import { getSingleProduct } from "../services/apiCommunication";

export const useSingleProduct = (id: number) => {
	return useQuery<ProductDetails>({
		queryKey: ["singleProduct", id],
		queryFn: () => getSingleProduct(id),
	});
};
