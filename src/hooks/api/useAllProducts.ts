import { useQuery } from "@tanstack/react-query";
import { ProductsResponse } from "../../services/Types";
import { getAllProducts } from "../../services/apiCommunication";

export const useAllProducts = (
	limit: number,
	skip: number,
	sortBy: string,
	order: string,
) => {
	return useQuery<ProductsResponse>({
		queryKey: ["allProducts", limit, skip, sortBy, order],
		queryFn: () => getAllProducts(limit, skip, sortBy, order),
	});
};
