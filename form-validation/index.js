// inputs
const inputElements = {
	firstName: document.getElementById("first-name"),
	lastName: document.getElementById("last-name"),
	email: document.getElementById("email"),
	contact: document.getElementById("contact-number"),
	pincode: document.getElementById("pincode"),
	cardNumber: document.getElementById("card-number"),
	expiryYear: document.getElementById("expiry-year"),
	cvv: document.getElementById("cvv"),
};

// error elements
const errorMessageElements = {
	firstName: document.querySelector(".form__first-name-error"),
	lastName: document.querySelector(".form__last-name-error"),
	email: document.querySelector(".form__email-error"),
	contact: document.querySelector(".form__contact-number-error"),
	pincode: document.querySelector(".form__pincode-error"),
	cardNumber: document.querySelector(".form__card-number-error"),
	expiry: document.querySelector(".form__card-expiry-error"),
	cvv: document.querySelector(".form__card-cvv-error"),
};

// regex patterns
const regexPatterns = {
	firstName: /^[a-zA-Z]{1,30}$/,
	lastName: /^[a-zA-Z]{1,30}$/,
	email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
	contactNumber: /^\d{10}$/,
	pincode: /^\d{6}$/,
	cardNumber: /^\d{16}$/,
	expiry: /^\d{4}$/,
	cvv: /^\d{3,4}$/,
};

// generic helper function to validate fields
const validateField = (
	inputElement,
	regexPattern,
	emptyMsg,
	invalidMsg,
	errorMessageElement,
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

	errorMessageElement.textContent = "";
	inputElement.classList.remove("form__input-error");
	return true;
};

// expiry extra check
const validateExpiry = (inputElement, errorMessageElement) => {
	const value = inputElement.value.trim();

	if (!value) {
		errorMessageElement.textContent = "Card Expiry is required";
		inputElement.classList.add("form__input-error");
		return false;
	}

	if (!regexPatterns.expiry.test(value)) {
		errorMessageElement.textContent = "Card Expiry is not valid";
		inputElement.classList.add("form__input-error");
		return false;
	}

	const currentYear = new Date().getFullYear();

	if (parseInt(value) < currentYear) {
		errorMessageElement.textContent = "Card Expiry is not valid";
		inputElement.classList.add("form__input-error");
		return false;
	}

	errorMessageElement.textContent = "";
	inputElement.classList.remove("form__input-error");
	return true;
};

// form
const form = document.querySelector(".form");

// form submit action
form.addEventListener("submit", (e) => {
	e.preventDefault();

	const isFirstNameValid = validateField(
		inputElements.firstName,
		regexPatterns.firstName,
		"First Name is required",
		"First Name is not valid",
		errorMessageElements.firstName,
	);

	const isLastNameValid = validateField(
		inputElements.lastName,
		regexPatterns.firstName,
		"Last Name is required",
		"Last Name is not valid",
		errorMessageElements.lastName,
	);

	const isEmailValid = validateField(
		inputElements.email,
		regexPatterns.email,
		"Email Address is required",
		"Email Address is not valid",
		errorMessageElements.email,
	);

	const isContactValid = validateField(
		inputElements.contact,
		regexPatterns.contactNumber,
		"Contact Number is required",
		"Contact Number is not valid",
		errorMessageElements.contact,
	);

	const isPincodeValid = validateField(
		inputElements.pincode,
		regexPatterns.pincode,
		"PIN Code is required",
		"PIN Code is not valid",
		errorMessageElements.pincode,
	);

	const isCardValid = validateField(
		inputElements.cardNumber,
		regexPatterns.cardNumber,
		"Card Number is required",
		"Card Number is not valid",
		errorMessageElements.cardNumber,
	);

	const isExpiryValid = validateExpiry(
		inputElements.expiryYear,
		errorMessageElements.expiry,
	);

	const isCvvValid = validateField(
		inputElements.cvv,
		regexPatterns.cvv,
		"CVV is required",
		"CVV is not valid",
		errorMessageElements.cvv,
	);

	if (
		isFirstNameValid &&
		isLastNameValid &&
		isEmailValid &&
		isContactValid &&
		isPincodeValid &&
		isCardValid &&
		isExpiryValid &&
		isCvvValid
	) {
		alert("Payment Successful ✅");
		form.reset();
	}
});
