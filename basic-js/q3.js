// Create a function to display numbers from 1 to 100
const displayFromOneToHundred = () => {
	for (let i = 1; i <= 100; i++) {
		console.log(i);
	}
};

displayFromOneToHundred();

// Create a function to display today's date in DD/MM/YYYY format
const printTodayDate = () => {
	const today = new Date();

	const date = String(today.getDate()).padStart(2, "0");
	const month = String(today.getMonth() + 1).padStart(2, "0");
	const year = today.getFullYear();

	console.log(`Today date: ${date}/${month}/${year}`);
};
printTodayDate();

// Create a function which accepts a Celsius value as parameter and returns the Fahrenheit value
const celsiusToFahrenheit = (celsius) => {
	return (celsius * 9) / 5 + 32;
};
console.log(
	`The Fahrenheit value of 25 degree celsius: ${celsiusToFahrenheit(25)}`,
);

// Create a function which accepts an array of numbers as parameter and return the average of those numbers.
const getAvg = (array) => {
	const sum = array.reduce((acc, curSum) => acc + curSum, 0);
	return sum / array.length;
};
console.log(
	`The avg of array [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]: ${getAvg([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])}`,
);

// Create a function to reverse a given string.
const getRevString = (v) => {
	const charArray = v.split("");

	let i = 0,
		j = charArray.length - 1,
		temp;
	while (i < j) {
		temp = charArray[i];
		charArray[i] = charArray[j];
		charArray[j] = temp;
		i++;
		j--;
	}

	return charArray.join("");
};
console.log(`The reverse word of alpha: ${getRevString("alpha")}`);
