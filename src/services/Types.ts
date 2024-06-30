export type CategoryList = string[];

export type ProductOverview = {
	id: number;
	title: string;
	price: number;
	rating: number;
	stock: number;
	thumbnail: string;
};

export type ProductsResponse = {
	products: ProductOverview[];
	total: number;
	skip: number;
	limit: number;
};
