const config = [
	{
		inputField: document.getElementById("first-name"),
		errorField: document.querySelector(".form__first-name-error"),
		pattern: /^[a-zA-Z]{1,30}$/,
		emptyMsg: "First Name is required",
		invalidMsg: "First Name is not valid",
	},
	{
		inputField: document.getElementById("last-name"),
		errorField: document.querySelector(".form__last-name-error"),
		pattern: /^[a-zA-Z]{1,30}$/,
		emptyMsg: "Last Name is required",
		invalidMsg: "Last Name is not valid",
	},
	{
		inputField: document.getElementById("email"),
		errorField: document.querySelector(".form__email-error"),
		pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
		emptyMsg: "Email is required",
		invalidMsg: "Email is not valid",
	},
	{
		inputField: document.getElementById("contact-number"),
		errorField: document.querySelector(".form__contact-number-error"),
		pattern: /^\d{10}$/,
		emptyMsg: "Contact Number is required",
		invalidMsg: "Contact Number is not valid",
	},
	{
		inputField: document.getElementById("pincode"),
		errorField: document.querySelector(".form__pincode-error"),
		pattern: /^\d{6}$/,
		emptyMsg: "Pincode is required",
		invalidMsg: "Pincode is not valid",
	},
	{
		inputField: document.getElementById("card-number"),
		errorField: document.querySelector(".form__card-number-error"),
		pattern: /^\d{16}$/,
		emptyMsg: "Card Number is required",
		invalidMsg: "Card Number is not valid",
	},
	{
		inputField: document.getElementById("expiry-year"),
		errorField: document.querySelector(".form__card-expiry-error"),
		pattern: /^\d{4}$/,
		emptyMsg: "Expiry Year is required",
		invalidMsg: "Expiry Year is not valid",
		extraValidations: [
			// year should be current year or future year
			(value) => {
				const currentYear = new Date().getFullYear();
				return parseInt(value) >= currentYear;
			},
		],
	},
	{
		inputField: document.getElementById("cvv"),
		errorField: document.querySelector(".form__card-cvv-error"),
		pattern: /^\d{3,4}$/,
		emptyMsg: "CVV is required",
		invalidMsg: "CVV is not valid",
	},
];

// generic helper function to validate fields
const validateField = (
	inputElement,
	errorMessageElement,
	regexPattern,
	emptyMsg,
	invalidMsg,
	extraValidations = [],
) => {
	const value = inputElement.value.trim();

	if (!value) {
		errorMessageElement.textContent = emptyMsg;
		inputElement.classList.add("form__input-error");
		return false;
	}

	if (!regexPattern.test(value)) {
		errorMessageElement.textContent = invalidMsg;
		inputElement.classList.add("form__input-error");
		return false;
	}

	const isValid = extraValidations.every((validationFn) => validationFn(value));
	if (!isValid) {
		return false;
	}

	errorMessageElement.textContent = "";
	inputElement.classList.remove("form__input-error");
	return true;
};

// looping
config.forEach(
	({
		inputField,
		errorField,
		pattern,
		emptyMsg,
		invalidMsg,
		extraValidations,
	}) => {
		inputField.addEventListener("input", () =>
			validateField(
				inputField,
				errorField,
				pattern,
				emptyMsg,
				invalidMsg,
				extraValidations,
			),
		);

		inputField.addEventListener("blur", () =>
			validateField(
				inputField,
				errorField,
				pattern,
				emptyMsg,
				invalidMsg,
				extraValidations,
			),
		);
	},
);

// form submit action
const form = document.querySelector(".form");
form.addEventListener("submit", (e) => {
	e.preventDefault();

	let isFormValid = true;
	config.forEach(
		({
			inputField,
			errorField,
			pattern,
			emptyMsg,
			invalidMsg,
			extraValidations,
		}) => {
			const isFieldValid = validateField(
				inputField,
				errorField,
				pattern,
				emptyMsg,
				invalidMsg,
				extraValidations,
			);

			if (!isFieldValid) {
				isFormValid = false;
			}
		},
	);

	if (isFormValid) {
		alert("Payment Successful ✅");
		form.reset();
	}
});
