import { formValidationConfig } from "./config/form-validation.config.js";

// generic helper function to validate fields
const validateField = (fieldName) => {
	const inputElement = document.getElementById(fieldName);
	const errorMessageElement = inputElement.nextElementSibling;

	const value = inputElement.value.trim();

	if (!value) {
		errorMessageElement.textContent =
			formValidationConfig[fieldName]["emptyMsg"];
		inputElement.classList.add("form__input-error");
		return false;
	}

	const pattern = new RegExp(formValidationConfig[fieldName]["pattern"]);
	if (!pattern.test(value)) {
		errorMessageElement.textContent =
			formValidationConfig[fieldName]["invalidMsg"];
		inputElement.classList.add("form__input-error");
		return false;
	}

	if (formValidationConfig[fieldName]["extraValidations"]) {
		const isValid = formValidationConfig[fieldName]["extraValidations"].every(
			(validationFn) => validationFn(value),
		);
		if (!isValid) {
			return false;
		}
	}

	errorMessageElement.textContent = "";
	inputElement.classList.remove("form__input-error");
	return true;
};

// looping
Object.keys(formValidationConfig).forEach((field) => {
	const inputElement = document.getElementById(field);
	inputElement.addEventListener("input", () => validateField(field));
	inputElement.addEventListener("blur", () => validateField(field));
});

// form submit action
const form = document.querySelector(".form");
form.addEventListener("submit", (e) => {
	e.preventDefault();

	let isFormValid = true;
	Object.keys(formValidationConfig).forEach((field) => {
		const isFieldValid = validateField(field);

		if (!isFieldValid) {
			isFormValid = false;
		}
	});

	if (isFormValid) {
		alert("Payment Successful ✅");
		form.reset();
	}
});
