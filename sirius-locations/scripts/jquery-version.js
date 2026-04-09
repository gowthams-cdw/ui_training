// imports
import { countryCodes } from "./constants.js";

// utility function to create location html
const createLocationHTML = (location) => {
	const flagCode = countryCodes[location.country];

	return `
		<div class="location">
			<figure class="location__img-container">
				<img
					src="https://flagsapi.com/${flagCode}/flat/64.png"
					alt="${location.country}"
					class="location__img"
				/>
			</figure>
			<p class="location__name">${location.state}</p>
			<p class="location__subname">${location.city}</p>
			<p class="location__phone">${location.contact}</p>
		</div>
	`;
};

// wait for document to load
$(document).ready(() => {
	// query selectors
	const $aboutUsContainer = $(".about-us");
	const $solutionsContainer = $(".solutions");
	const $locationsContainer = $(".locations");

	const $accordions = $(".solution__accordion");

	const $aboutUsBtn = $(".about-us-btn");
	const $solutionsBtn = $(".solutions-btn");
	const $locationsBtn = $(".locations-btn");

	// utility function to hide and show containers
	const hideContainer = ($el) => $el.hide();
	const showContainer = ($el) => $el.show();

	// tabs navigation utility functions
	const tabs = [
		{ btn: $aboutUsBtn, container: $aboutUsContainer },
		{ btn: $solutionsBtn, container: $solutionsContainer },
		{ btn: $locationsBtn, container: $locationsContainer },
	];
	const handleTabClick = ($activeBtn, $activeContainer) => {
		tabs.forEach(({ btn, container }) => {
			btn.removeClass("selected");
			hideContainer(container);
		});

		$activeBtn.addClass("selected");
		showContainer($activeContainer);
	};

	// utility function to parse json data from file path
	const parseJsonData = async (path) => {
		try {
			const data = await $.getJSON(path);
			return data;
		} catch (error) {
			console.error("Error parsing JSON data:", error);
		}
	};

	// load initial data
	const loadInitialData = async () => {
		const locations = await parseJsonData("data/locations.json");

		const locationsHTML = locations.map(createLocationHTML).join("");
		$locationsContainer.append(locationsHTML);

		$aboutUsBtn.addClass("selected");
	};

	// bind event listeners
	const bindEventListeners = () => {
		// nav buttons listeners
		tabs.forEach(({ btn, container }) => {
			btn.on("click", () => handleTabClick(btn, container));
		});

		// accordion listeners
		$accordions.on("click", function () {
			$(this).toggleClass("selected").siblings().removeClass("selected");
		});
	};

	// hide all containers except the first one
	const hideAllContainersExceptFirst = () => {
		hideContainer($solutionsContainer);
		hideContainer($locationsContainer);
	};

	// init function
	const init = async () => {
		await loadInitialData();
		bindEventListeners();
		hideAllContainersExceptFirst();
	};
	init();
});

// initial size
// 125 lines
