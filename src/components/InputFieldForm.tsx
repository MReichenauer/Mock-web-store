import Form from "react-bootstrap/Form";

type InputFieldFormProps = {
	label: string;
	name: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	error?: string;
	placeholder: string;
	type?: string;
};

const InputFieldForm = ({
	label,
	name,
	value,
	onChange,
	error,
	placeholder,
	type = "text",
}: InputFieldFormProps) => (
	<Form.Group className="inputBox mt-2 mb-1">
		<label className="ms-2 mb-1">{label}</label>
		<Form.Control
			type={type}
			placeholder={placeholder}
			name={name}
			value={value}
			onChange={onChange}
			required
		/>
		{error && <p>{error}</p>}
	</Form.Group>
);

export default InputFieldForm;
