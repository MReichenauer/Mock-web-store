import { useQuery } from "@tanstack/react-query";
import { ProductsResponse } from "../../services/Types";
import { getSingleCategory } from "../../services/apiCommunication";

export const useSingleCategory = (
	limit: number,
	skip: number,
	category: string,
	sortBy: string,
	order: string,
) => {
	return useQuery<ProductsResponse>({
		queryKey: ["singleCategory", limit, skip, category, sortBy, order],
		queryFn: () => getSingleCategory(limit, skip, category, sortBy, order),
	});
};
