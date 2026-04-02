export const formValidationConfig = {
	"first-name": {
		pattern: /^[a-zA-Z]{1,30}$/,
		emptyMsg: "First Name is required",
		invalidMsg: "First Name is not valid",
	},
	"last-name": {
		pattern: /^[a-zA-Z]{1,30}$/,
		emptyMsg: "Last Name is required",
		invalidMsg: "Last Name is not valid",
	},
	email: {
		pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
		emptyMsg: "Email is required",
		invalidMsg: "Email is not valid",
	},
	"contact-number": {
		pattern: /^\d{10}$/,
		emptyMsg: "Contact Number is required",
		invalidMsg: "Contact Number is not valid",
	},
	pincode: {
		pattern: /^\d{6}$/,
		emptyMsg: "Pincode is required",
		invalidMsg: "Pincode is not valid",
	},
	"card-number": {
		pattern: /^\d{16}$/,
		emptyMsg: "Card Number is required",
		invalidMsg: "Card Number is not valid",
	},
	"expiry-year": {
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
	cvv: {
		pattern: /^\d{3,4}$/,
		emptyMsg: "CVV is required",
		invalidMsg: "CVV is not valid",
	},
};

// inputField: document.getElementById("cvv"),
// errorField: document.querySelector(".form__card-cvv-error"),
