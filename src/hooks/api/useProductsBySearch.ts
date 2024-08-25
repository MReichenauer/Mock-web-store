import { useQuery } from "@tanstack/react-query";
import { ProductsResponse } from "../../services/Types";
import { getProductsBySearch } from "../../services/apiCommunication";

export const useProductsBySearch = (
	limit: number,
	skip: number,
	query: string,
	sortBy: string,
	order: string,
) => {
	return useQuery<ProductsResponse>({
		queryKey: ["productsBySearch", limit, skip, query, sortBy, order],
		queryFn: () => getProductsBySearch(limit, skip, query, sortBy, order),
	});
};
