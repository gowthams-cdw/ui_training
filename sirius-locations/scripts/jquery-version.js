// imports
import { countryCodes } from "./constants.js";

// wait for document to load
$(document).ready(() => {
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
			const $locationElement = $("<div>").addClass("location");

			const $figure = $("<figure>").addClass("location__img-container");
			const $img = $("<img>")
				.attr(
					"src",
					`https://flagsapi.com/${countryCodes[location.country]}/flat/64.png`,
				)
				.attr("alt", location.country)
				.addClass("location__img");

			$figure.append($img);
			$locationElement.append($figure);

			const $name = $("<p>").addClass("location__name").text(location.state);

			const $subname = $("<p>")
				.addClass("location__subname")
				.text(location.city);

			const $phone = $("<p>")
				.addClass("location__phone")
				.text(location.contact);

			$locationElement.append($name, $subname, $phone);

			$locationsContainer.append($locationElement);
		});

		$aboutUsBtn.addClass("selected");
	};

	// bind event listeners
	const bindEventListeners = () => {
		// nav buttons listeners
		$aboutUsBtn.on("click", () => {
			// button change
			$solutionsBtn.removeClass("selected");
			$locationsBtn.removeClass("selected");
			$aboutUsBtn.addClass("selected");

			// containers change
			hideContainer($solutionsContainer);
			hideContainer($locationsContainer);
			showContainer($aboutUsContainer);
		});

		$solutionsBtn.on("click", () => {
			// button change
			$aboutUsBtn.removeClass("selected");
			$locationsBtn.removeClass("selected");
			$solutionsBtn.addClass("selected");

			// containers change
			hideContainer($aboutUsContainer);
			hideContainer($locationsContainer);
			showContainer($solutionsContainer);
		});

		$locationsBtn.on("click", () => {
			// button change
			$aboutUsBtn.removeClass("selected");
			$solutionsBtn.removeClass("selected");
			$locationsBtn.addClass("selected");

			// containers change
			hideContainer($aboutUsContainer);
			hideContainer($solutionsContainer);
			showContainer($locationsContainer);
		});

		// accordion listeners
		$accordions.on("click", function () {
			$(this).toggleClass("selected");
			// $(this).toggleClass("selected").siblings().removeClass("selected");
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
