import axios from "axios";
import { CategoryList } from "./Types";

const BASE_URL: string = import.meta.env.VITE_API_BASE_URL;

const instance = axios.create({
	baseURL: BASE_URL,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
});

const get = async <T>(endpoint: string) => {
	const res = await instance.get<T>(endpoint);
	return res.data;
};

export const getCategoryList = async () => {
	const res = await get<CategoryList>("products/category-list");
	return res;
};
