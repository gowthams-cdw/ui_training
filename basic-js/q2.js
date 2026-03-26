// A Cricket Team has 11 players. Create a list with the names of all players.
const indiaSquad2026 = [
	"Rinku Singh",
	"Abhishek Sharma",
	"Ishan Kishan",
	"Suryakumar Yadav (C)",
	"Tilak Varma",
	"Shivam Dube",
	"Hardik Pandya",
	"Axar Patel",
	"Jasprit Bumrah",
	"Arshdeep Singh",
	"Varun Chakaravarthy",
];
console.log("Initial 11: " + JSON.stringify(indiaSquad2026));

// Unfortunately, the first player had an injury. Remove him from the list of players.
indiaSquad2026.shift();
console.log(
	"Initial 11(After removal of Rinku): " + JSON.stringify(indiaSquad2026),
);

// Now, find out the number of players
console.log("Length of team: " + indiaSquad2026.length);

// Add another player to the above list of players to make the count 11.
indiaSquad2026.unshift("Sanju Samson");
console.log("Modified 11: " + JSON.stringify(indiaSquad2026));

// The cricket board has decided to take photographs of all players and so they would need the players list in sorted format.
indiaSquad2026.sort();
console.log("Sorted 11: " + JSON.stringify(indiaSquad2026));

// Display all the Players name and assign a random jersey number. For example. MS Dhoni-7
const squadWithRandomJersyNo = indiaSquad2026.reduce((acc, member) => {
	acc[member] = Math.round(Math.random() * 1000);
	return acc;
}, {});
console.log(
	"Squad members with jersy no: " + JSON.stringify(squadWithRandomJersyNo),
);

// The cricket board wants to print the names of all players in uppercase and store it in a different location for printing jerseys. Do not modify the existing players list.
const uppercaseMemberNames = indiaSquad2026.map((member) => member.toUpperCase())
console.log("11 with uppercase name: " + JSON.stringify(uppercaseMemberNames));
