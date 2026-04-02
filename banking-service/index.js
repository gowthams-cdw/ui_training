// function that takes a length as argument and generate random number as string with that length
const generateRandomNoStr = (digitLength) => {
	let resultStr = "";
	for (let i = 0; i < digitLength; i++) {
		resultStr += Math.floor(Math.random() * 10).toString();
	}
	return resultStr;
};

// function to create a bank account with pin and initial balance
const createBankAccount = (pin, initialBalance) => {
	if (initialBalance < 0) {
		throw new Error("Initial balance cannot be negative");
	}

	const accountNo = generateRandomNoStr(12);
	const cardNo = generateRandomNoStr(16);
	let balance = initialBalance;

	// deposit money
	const depositMoney = (enteredCardNo, enteredPin, amount) => {
		if (isNaN(amount)) {
			throw new Error("Amount must be a number");
		}

		if (amount <= 0) {
			throw new Error("Deposit amount must be greater than zero");
		}

		if (enteredCardNo !== cardNo || enteredPin !== pin) {
			throw new Error("Invalid card number or pin");
		}

		balance += amount;
		return `
    Deposit successful.
    Current balance: ${balance}
    `;
	};

	// withdraw money
	const withdrawMoney = (enteredCardNo, enteredPin, amount) => {
		if (isNaN(amount)) {
			throw new Error("Amount must be a number");
		}

		if (amount <= 0) {
			throw new Error("Withdraw amount must be greater than zero");
		}

		if (amount > balance) {
			throw new Error("Insufficient balance");
		}

		if (enteredCardNo !== cardNo || enteredPin !== pin) {
			throw new Error("Invalid card number or pin");
		}

		balance -= amount;
		return `
    Withdraw successful.
    Current balance: ${balance}
    `;
	};

	// get summary
	const getSummary = (enteredPin) => {
		if (enteredPin !== pin) {
			throw new Error("Invalid pin");
		}

		return `
    Account Summary:
      Card No: ${cardNo}
      Account No: ${accountNo}
      Current Balance: ${balance}
    `;
	};

	return {
		cardNo,
		accountNo,
		depositMoney,
		withdrawMoney,
		getSummary,
	};
};

// function to get valid user input
const getValidUserInput = (promptMessage) => {
	let userInput;

	while (true) {
		userInput = prompt(promptMessage).trim();

		if (userInput === null || userInput === "") {
			alert("Input cannot be empty. Please try again.");
			continue;
		}

		return userInput.trim();
	}
};

// main function acts as the entry point of the application
const main = () => {
	try {
		// create 5 original accounts
		const accounts = [
			createBankAccount("1234", 1000),
			createBankAccount("5678", 2000),
			createBankAccount("1357", 3000),
			createBankAccount("9876", 4000),
			createBankAccount("9753", 5000),
		];

		alert("5 accounts created!");

		// get user inputs
		while (true) {
			const accountIndex = Number(
				getValidUserInput("Select account (1-5) or 0 to exit:"),
			);

			if (accountIndex === 0) {
				alert("Goodbye!");
				break;
			}

			if (accountIndex !== Math.floor(accountIndex) || isNaN(accountIndex)) {
				alert("Invalid account");
				continue;
			}

			const acc = accounts[accountIndex - 1];

			const choice = getValidUserInput(`
Choose:
1. Deposit
2. Withdraw
3. Summary
`);

			switch (choice) {
				case "1":
					try {
						const cardNo = getValidUserInput("Enter card number:");
						const enteredPin = getValidUserInput("Enter PIN:");
						const amountToDeposit = Number(getValidUserInput("Amount:"));

						const res = acc.depositMoney(cardNo, enteredPin, amountToDeposit);
						alert(res);
					} catch (e) {
						alert(e.message);
					}
					break;

				case "2":
					try {
						const cardNo = getValidUserInput("Enter card number:");
						const enteredPin = getValidUserInput("Enter PIN:");
						const amountToWithdraw = Number(getValidUserInput("Amount:"));

						const res = acc.withdrawMoney(cardNo, enteredPin, amountToWithdraw);
						alert(res);
					} catch (e) {
						alert(e.message);
					}
					break;

				case "3":
					try {
						const enteredPin = getValidUserInput("Enter PIN:");
						const res = acc.getSummary(enteredPin);

						alert(res);
					} catch (e) {
						alert(e.message);
					}
					break;

				default:
					alert("Invalid option");
			}
		}
	} catch (err) {
		alert("Fatal error: " + err.message);
	}
};

// calling main function
main();
