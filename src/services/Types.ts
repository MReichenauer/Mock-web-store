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
	category?: string;
};

export type ProductDetails = {
	id: number;
	title: string;
	images: string[];
	description: string;
	category: string;
	price: number;
	rating: number;
	stock: number;
	tags: string[];
	brand: string;
	weight: number;
	returnPolicy: string;
	dimensions: {
		width: number;
		height: number;
		depth: number;
	};
	warrantyInformation: string;
	shippingInformation: string;
	reviews: Review[];
};

export type Review = {
	rating: number;
	comment: string;
	date: string;
	reviewerName: string;
	reviewerEmail: string;
};
