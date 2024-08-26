import { CardFormData } from "../../services/Types";
import { cardPaymentSchema } from "../../schemas/paymentSchema";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ZodError } from "zod";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputFieldForm from "./InputFieldForm";
import Row from "react-bootstrap/Row";
import "../../assets/scss/CardPaymentForm.scss";
import { useCart } from "../../hooks/contexts/useCart";

const schema = cardPaymentSchema;

const initialFormData: CardFormData = {
	firstName: "",
	lastName: "",
	cardNumber: "",
	expiration: "",
	cvv: "",
	email: "",
	phoneNumber: "",
	streetName: "",
	streetNumber: "",
	city: "",
	state: "",
	zipCode: "",
	country: "",
};

const formatZodErrors = (error: ZodError) => {
	return error.errors.reduce((acc, curr) => {
		acc[curr.path[0] as keyof CardFormData] = curr.message;
		return acc;
	}, {} as Partial<Record<keyof CardFormData, string>>);
};

type CardPaymentFormProps = {
	handleSubmit: (data: CardFormData) => void;
};

const CardPaymentForm = ({ handleSubmit }: CardPaymentFormProps) => {
	const { cart, totalPrice } = useCart();
	const [formData, setFormData] = useState<CardFormData>(initialFormData);
	const [errors, setErrors] = useState<
		Partial<Record<keyof CardFormData, string>>
	>({});

	const total = totalPrice();

	const totalPlusShipping = () => {
		if (total > 100) {
			return total;
		} else {
			return total + 12;
		}
	};

	const totalAmount = totalPlusShipping();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const result = schema.safeParse(formData);

		if (!result.success) {
			setErrors(formatZodErrors(result.error));
		} else {
			setErrors({});
			handleSubmit(formData);
			setFormData(initialFormData);
		}
	};

	return (
		<Form className="cardPaymentContainer" onSubmit={handleFormSubmit}>
			<div className="p-3">
				<h6 className="text-uppercase ms-1">Your Information</h6>
				<Row>
					<Col md={6}>
						<InputFieldForm
							label="First Name"
							name="firstName"
							value={formData.firstName}
							onChange={handleChange}
							error={errors.firstName}
							placeholder="Enter your first name"
						/>
					</Col>
					<Col md={6}>
						<InputFieldForm
							label="Last Name"
							name="lastName"
							value={formData.lastName}
							onChange={handleChange}
							error={errors.lastName}
							placeholder="Enter your last name"
						/>
					</Col>
				</Row>
				<Row>
					<Col md={6}>
						<InputFieldForm
							label="Email"
							name="email"
							type="email"
							value={formData.email}
							onChange={handleChange}
							error={errors.email}
							placeholder="Enter your email address"
						/>
					</Col>
					<Col md={6}>
						<InputFieldForm
							label="Phone Number"
							name="phoneNumber"
							type="number"
							value={formData.phoneNumber}
							onChange={handleChange}
							error={errors.phoneNumber}
							placeholder="Enter your phone number"
						/>
					</Col>
				</Row>
				<Row>
					<Col md={6}>
						<InputFieldForm
							label="Country"
							name="country"
							value={formData.country}
							onChange={handleChange}
							error={errors.country}
							placeholder="Entry your country"
						/>
					</Col>
					<Col md={6}>
						<InputFieldForm
							label="City"
							name="city"
							value={formData.city}
							onChange={handleChange}
							error={errors.city}
							placeholder="Entry your city"
						/>
					</Col>
				</Row>
				<Row>
					<Col md={6}>
						<InputFieldForm
							label="State / County"
							name="state"
							value={formData.state}
							onChange={handleChange}
							error={errors.state}
							placeholder="Entry your State / County"
						/>
					</Col>
					<Col md={6}>
						<InputFieldForm
							label="Zip Code"
							name="zipCode"
							type="number"
							value={formData.zipCode}
							onChange={handleChange}
							error={errors.zipCode}
							placeholder="Enter your zip code"
						/>
					</Col>
				</Row>
				<Row>
					<Col md={6}>
						<InputFieldForm
							label="Street Name"
							name="streetName"
							value={formData.streetName}
							onChange={handleChange}
							error={errors.streetName}
							placeholder="Enter your street name"
						/>
					</Col>
					<Col md={6}>
						<InputFieldForm
							label="Street Number"
							name="streetNumber"
							type="number"
							value={formData.streetNumber}
							onChange={handleChange}
							error={errors.streetNumber}
							placeholder="Enter your street number"
						/>
					</Col>
				</Row>
				<h6 className="text-uppercase mt-4 ms-1">Card Details</h6>
				<Row>
					<Col md={6}>
						<InputFieldForm
							label="Card Number"
							name="cardNumber"
							type="number"
							value={formData.cardNumber}
							onChange={handleChange}
							error={errors.cardNumber}
							placeholder="Enter your card number"
						/>
					</Col>
					<Col md={3}>
						<InputFieldForm
							label="Expiration"
							name="expiration"
							value={formData.expiration}
							onChange={handleChange}
							error={errors.expiration}
							placeholder="12/24"
						/>
					</Col>
					<Col md={3}>
						<InputFieldForm
							label="CVV"
							name="cvv"
							type="number"
							value={formData.cvv}
							onChange={handleChange}
							error={errors.cvv}
							placeholder="978"
						/>
					</Col>
				</Row>
			</div>
			<div className="buttonContainer">
				<Link to={"/checkout"}>
					<Button className="prevStepButton">Previous step</Button>
				</Link>
				<Button
					type="submit"
					className="confirmOrderButton"
					disabled={cart.length === 0}
				>
					Confirm order for ${totalAmount.toFixed(2)}
				</Button>
			</div>
		</Form>
	);
};

export default CardPaymentForm;
