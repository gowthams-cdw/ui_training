// shape config for easy extensability
export const shapeConfig = {
	circle: {
		name: "Circle",
		color: "#43967d",

		create(el, { size }) {
			el.style.width = size + "rem";
			el.style.height = size + "rem";
			el.style.background = this.color;
			el.style.borderRadius = "50%";
		},

		inputPlaceHolder: "Enter Radius",

		data: [
			{
				label: "RADIUS",
				value: "r",
				calculate: (radius) => `${radius.toFixed(2)} cm`,
			},
			{
				label: "AREA",
				value: "πr²",
				calculate: (radius) => `${(Math.PI * radius ** 2).toFixed(2)} sq cm`,
			},
			{
				label: "PERIMETER",
				value: "2πr",
				calculate: (radius) => `${(2 * Math.PI * radius).toFixed(2)} cm`,
			},
		],
	},

	triangle: {
		name: "Equilateral Triangle",
		color: "#e0e0e0",

		create(el, { size }) {
			const half = size / 2;
			const height = Math.sqrt(3) * half;

			el.style.width = "0";
			el.style.height = "0";
			el.style.borderStyle = "solid";
			el.style.borderWidth = `0 ${half}rem ${height}rem ${half}rem`;
			el.style.borderColor = `transparent transparent ${this.color} transparent`;
		},

		inputPlaceHolder: "Enter Side",

		data: [
			{
				label: "SIDE",
				value: "s",
				calculate: (side) => `${side.toFixed(2)} cm`,
			},
			{
				label: "AREA",
				value: "0.433 * s * s",
				calculate: (side) => `${(0.433 * side * side).toFixed(2)} sq cm`,
			},
			{
				label: "PERIMETER",
				value: "3 * s",
				calculate: (side) => `${(3 * side).toFixed(2)} cm`,
			},
		],
	},

	square: {
		name: "Square",
		color: "#f3afda",

		create(el, { size }) {
			el.style.width = size + "rem";
			el.style.height = size + "rem";
			el.style.background = this.color;
		},

		inputPlaceHolder: "Enter Side",

		data: [
			{
				label: "SIDE",
				value: "s",
				calculate: (side) => `${side.toFixed(2)} cm`,
			},
			{
				label: "AREA",
				value: "s * s",
				calculate: (side) => `${(side * side).toFixed(2)} sq cm`,
			},
			{
				label: "PERIMETER",
				value: "4 * s",
				calculate: (side) => `${(4 * side).toFixed(2)} cm`,
			},
		],
	},

	// hexagon: {
	// 	name: "Regular Hexagon",
	// 	color: "#ffb703",
	//
	// 	create(el, { size }) {
	// 		const width = size;
	// 		const height = size * 0.866;
	//
	// 		el.style.width = width + "rem";
	// 		el.style.height = height + "rem";
	// 		el.style.background = this.color;
	// 		el.style.clipPath =
	// 			"polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)";
	// 	},
	//
	// 	inputPlaceHolder: "Enter Side",
	//
	// 	data: [
	// 		{
	// 			label: "SIDE",
	// 			value: "s",
	// 			calculate: (side) => `${side.toFixed(2)} cm`,
	// 		},
	// 		{
	// 			label: "AREA",
	// 			value: "(3√3/2) * s²",
	// 			calculate: (side) =>
	// 				`${(((3 * Math.sqrt(3)) / 2) * side * side).toFixed(2)} sq cm`,
	// 		},
	// 		{
	// 			label: "PERIMETER",
	// 			value: "6 * s",
	// 			calculate: (side) => `${(6 * side).toFixed(2)} cm`,
	// 		},
	// 	],
	// },
};
