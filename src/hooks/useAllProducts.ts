import { useQuery } from "@tanstack/react-query";
import { ProductsResponse } from "../services/Types";
import { getAllProducts } from "../services/apiCommunication";

export const useAllProducts = (limit: number, skip: number) => {
	return useQuery<ProductsResponse>({
		queryKey: ["allProducts", limit, skip],
		queryFn: () => getAllProducts(limit, skip),
	});
};
