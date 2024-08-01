import { z } from "zod";

export const cardPaymentSchema = z.object({
	firstName: z.string().min(2, "First name needs to be at least 2 characters"),
	lastName: z.string().min(2, "Last name needs to be at least 2 characters"),
	cardNumber: z.string().length(16, "Card number needs to be 16 digits"),
	expiration: z
		.string()
		.includes("/")
		.min(5, "Expiration needs to be in MM/YY format"),
	cvv: z.string().length(3, "CVV needs to be 3 digits"),
	streetName: z.string().min(3, "Street name is required(min 3 characters)"),
	streetNumber: z.string().min(1, "Street number is required"),
	city: z.string().min(2, "City is required(min 2 characters)"),
	state: z.string().min(2, "State / Country is required(min 2 characters)"),
	zipCode: z.string().length(5, "Zip code needs to be 5 digits"),
	phoneNumber: z
		.string()
		.min(
			6,
			"Phone number needs to be between 6 - 17 digits (including land code)",
		)
		.max(
			17,
			"Phone number needs to be between 6 - 17 digits (including land code)",
		),
	country: z.string().min(3, "Country is required(min 3 characters)"),
	email: z.string().email("Invalid email address"),
});

export const invoicePaymentSchema = z.object({
	firstName: z.string().min(2, "First name needs to be at least 2 characters"),
	lastName: z.string().min(2, "Last name needs to be at least 2 characters"),
	streetName: z.string().min(3, "Street name is required(min 3 characters)"),
	streetNumber: z.string().min(1, "Street number is required"),
	city: z.string().min(2, "City is required(min 2 characters)"),
	state: z.string().min(2, "State / Country is required(min 2 characters)"),
	zipCode: z.string().length(5, "Zip code needs to be 5 digits"),
	email: z.string().email("Invalid email address"),
});
