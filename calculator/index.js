const calculator = {
	addition: (a, b) => a + b,
	subtraction: (a, b) => a - b,
	multiplication: (a, b) => a * b,
	division: (a, b) => {
		if (b === 0) {
			if (a === 0) {
				return "Indeterminate form: 0 divided by 0"; // undefined
			}
			return "Infinity: division by zero";
		}

		return b / a;
	},
};

const getUserInput = (message) => {
	let value;
	while (true) {
		value = prompt(message);
		if (value === null || value.trim() === "") {
			alert("Invalid input");
			continue;
		}

		return value;
	}
};

const number1 = Number(getUserInput("Enter the first number:"));
const number2 = Number(getUserInput("Enter the second number:"));
const operation = Number(
	getUserInput(
		"Enter the operation (1. addition, 2. subtraction, 3. multiplication, 4. division):",
	),
);

if (isNaN(number1) || isNaN(number2) || isNaN(operation)) {
	throw new Error("Invalid input: Please enter valid numbers and operation.");
}

switch (operation) {
	case 1:
		alert(`Result: ${calculator.addition(number1, number2)}`);
		break;
	case 2:
		alert(`Result: ${calculator.subtraction(number1, number2)}`);
		break;
	case 3:
		alert(`Result: ${calculator.multiplication(number1, number2)}`);
		break;
	case 4:
		alert(`Result: ${calculator.division(number1, number2)}`);
		break;
	default:
		alert("Invalid operation");
}
