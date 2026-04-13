// imports
import { countryCodes } from "./constants.js";
import { createElement } from "./utils.js";

// query selectors
const aboutUsContainer = document.querySelector(".about-us");
const solutionsContainer = document.querySelector(".solutions");
const locationsContainer = document.querySelector(".locations");

const accordions = document.querySelectorAll(".solution__accordion");

const aboutUsBtn = document.querySelector(".about-us-btn");
const solutionsBtn = document.querySelector(".solutions-btn");
const locationsBtn = document.querySelector(".locations-btn");

// utility function to hide and show containers
const hideContainer = (container) => {
	container.style.display = "none";
};

const showContainer = (container) => {
	container.style.display = "";
};

// utility function to parse json data from file path
const parseJsonData = async (path) => {
	try {
		const response = await fetch(path);
		if (!response.ok) {
			throw new Error(
				`Error fetching data from ${path}: ${response.statusText}`,
			);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error parsing JSON data:", error);
	}
};

// initial states
const loadInitialData = async () => {
	// fetch locations data from data/locations.json file
	const locations = await parseJsonData("data/locations.json");

	// populate the locations
	locations.forEach((location) => {
		const locationElement = createElement({
			tag: "div",
			className: "location",
		});

		// img section
		const figureElement = createElement({
			tag: "figure",
			className: "location__img-container",
		});

		const imgElement = createElement({
			tag: "img",
			attrs: {
				src: `https://flagsapi.com/${countryCodes[location.country]}/flat/64.png`,
				alt: location.country,
			},
			className: "location__img",
		});
		figureElement.appendChild(imgElement);
		locationElement.appendChild(figureElement);

		// name section
		const nameElement = createElement({
			tag: "p",
			text: location.state,
			className: "location__name",
		});
		locationElement.appendChild(nameElement);

		// subname section
		const subnameElement = createElement({
			tag: "p",
			className: "location__subname",
			text: location.city,
		});
		locationElement.appendChild(subnameElement);

		// phone section
		const phoneElement = createElement({
			tag: "p",
			className: "location__phone",
			text: location.contact,
		});
		locationElement.appendChild(phoneElement);

		// append to locations container
		locationsContainer.appendChild(locationElement);
	});

	// select about us section first
	aboutUsBtn.classList.add("selected");
};

// bind event listeners
const bindEventListeners = () => {
	// nav buttons listeners
	aboutUsBtn.addEventListener("click", () => {
		// button change
		solutionsBtn.classList.remove("selected");
		locationsBtn.classList.remove("selected");
		aboutUsBtn.classList.add("selected");

		// containers change
		hideContainer(solutionsContainer);
		hideContainer(locationsContainer);
		showContainer(aboutUsContainer);
	});

	solutionsBtn.addEventListener("click", () => {
		// button change
		aboutUsBtn.classList.remove("selected");
		locationsBtn.classList.remove("selected");
		solutionsBtn.classList.add("selected");

		// containers change
		hideContainer(aboutUsContainer);
		hideContainer(locationsContainer);
		showContainer(solutionsContainer);
	});

	locationsBtn.addEventListener("click", () => {
		// button change
		aboutUsBtn.classList.remove("selected");
		solutionsBtn.classList.remove("selected");
		locationsBtn.classList.add("selected");

		// containers change
		hideContainer(aboutUsContainer);
		hideContainer(solutionsContainer);
		showContainer(locationsContainer);
	});

	// accordion listeners
	accordions.forEach((accordion) => {
		accordion.addEventListener("click", () => {
			accordion.classList.toggle("selected");
		});
	});
};

// hide all containers except the first one
const hideAllContainersExceptFirst = () => {
	hideContainer(solutionsContainer);
	hideContainer(locationsContainer);
};

// init function
const init = async () => {
	await loadInitialData();
	bindEventListeners();
	hideAllContainersExceptFirst();
};
init();
