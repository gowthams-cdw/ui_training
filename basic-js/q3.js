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
const convertFromCelsiusToFahrenheit = (celsius) => {
	return (celsius * 9) / 5 + 32;
};
const celsiusValue = 25;
console.log(
	`The Fahrenheit value of ${celsiusValue} degree celsius: ${convertFromCelsiusToFahrenheit(celsiusValue)}`,
);

// Create a function which accepts an array of numbers as parameter and return the average of those numbers.
const getAverage = (array) => {
	const arraySum = array.reduce((accSum, curSum) => accSum + curSum, 0);
	return arraySum / array.length;
};
const arrayToCalculateAverage = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(
	`The avg of array ${arrayToCalculateAverage}: ${getAverage(arrayToCalculateAverage)}`,
);

// Create a function to reverse a given string.
const getReverseOfString = (v) => v.split("").reverse().join("");
const stringToReverse = "wake up, neo";
console.log(
	`The reverse of word ${stringToReverse}: ${getReverseOfString(stringToReverse)}`,
);
