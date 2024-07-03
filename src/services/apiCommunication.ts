import axios from "axios";
import { CategoryList, ProductDetails, ProductsResponse } from "./Types";

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

export const getAllProducts = async (limit: number, skip: number) => {
	const res = await get<ProductsResponse>(
		`/products?limit=${limit}&skip=${skip}&select=title,price,rating,stock,thumbnail`,
	);
	return res;
};

export const getSingleCategory = async (
	limit: number,
	skip: number,
	category: string,
) => {
	const res = await get<ProductsResponse>(
		`/products/category/${category}?limit=${limit}&skip=${skip}&select=title,price,rating,stock,thumbnail`,
	);
	return res;
};

export const getSingleProduct = async (id: number) => {
	const res = await get<ProductDetails>(`products/${id}`);
	return res;
};
