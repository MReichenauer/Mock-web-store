import { useQuery } from "@tanstack/react-query";
import { CategoryList } from "../../services/Types";
import { getCategoryList } from "../../services/apiCommunication";

export const useAllCategories = () => {
	return useQuery<CategoryList>({
		queryKey: ["categoryList"],
		queryFn: getCategoryList,
	});
};

export default useAllCategories;
