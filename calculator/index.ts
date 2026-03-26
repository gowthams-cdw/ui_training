// class definition
class Calculator {
	// result
	private result;

	// class constructor
	constructor() {
		this.result = 0;
	}

	// add method expects one args, and add it to the result
	add(v) {
		if (isNaN(v)) {
			throw new Error("Invalid number.");
		}
		this.result += v;
	}

	// sub method expects one args, and sub it to the result
	sub(v) {
		if (isNaN(v)) {
			throw new Error("Invalid number.");
		}
		this.result -= v;
	}

	// mul method expects one args, and mul it to the result
	mul(v) {
		if (isNaN(v)) {
			throw new Error("Invalid number.");
		}
		this.result *= v;
	}

	// div method expects one args, and div it to the result
	div(v) {
		if (isNaN(v)) {
			throw new Error("Invalid number.");
		}
		this.result /= v;
	}

	// resets the result to 0
	clear() {
		this.result = 0;
	}

	// return the result
	getResult() {
		return this.result;
	}
}

// object creation
const calculator = new Calculator();

// add example
calculator.add(10);
console.log(calculator.getResult()); // 10

// sub example
calculator.sub(8);
console.log(calculator.getResult()); // 2

// mul example
calculator.mul(8);
console.log(calculator.getResult()); // 16

// div example
calculator.div(16);
console.log(calculator.getResult()); // 1
