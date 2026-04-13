// imports
import { countryCodes } from "./constants.js";
import { createElement } from "./utils.js";

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

		locations.forEach((location) => {
			const locationEl = createElement({
				tag: "div",
				className: "location",
			});

			const figureEl = createElement({
				tag: "figure",
				className: "location__img-container",
			});

			const imgEl = createElement({
				tag: "img",
				className: "location__img",
				attrs: {
					src: `https://flagsapi.com/${countryCodes[location.country]}/flat/64.png`,
					alt: location.country,
				},
			});

			figureEl.appendChild(imgEl);

			const locationNameEl = createElement({
				tag: "p",
				className: "location__name",
				text: location.state,
			});

			const locationSubNameEl = createElement({
				tag: "p",
				className: "location__subname",
				text: location.city,
			});

			const locationPhoneEl = createElement({
				tag: "p",
				className: "location__phone",
				text: location.contact,
			});

			locationEl.appendChild(figureEl);
			locationEl.appendChild(locationNameEl);
			locationEl.appendChild(locationSubNameEl);
			locationEl.appendChild(locationPhoneEl);

			$locationsContainer.append(locationEl);
		});

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
			if (
				$(this).hasClass("selected") &&
				$accordions.filter(".selected").length === 1
			) {
				return;
			}

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
