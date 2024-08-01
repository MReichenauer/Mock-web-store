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
	thumbnail: string;
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

export type CartItem = {
	id: number;
	title: string;
	price: number;
	quantity: number;
	thumbnail: string;
	stock: number;
};

export type CardFormData = {
	firstName: string;
	lastName: string;
	cardNumber: string;
	expiration: string;
	cvv: string;
	email: string;
	phoneNumber: string;
	streetName: string;
	streetNumber: string;
	city: string;
	state: string;
	zipCode: string;
	country: string;
};

export type InvoiceFormData = {
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	streetName: string;
	streetNumber: string;
	city: string;
	state: string;
	zipCode: string;
	country: string;
};
