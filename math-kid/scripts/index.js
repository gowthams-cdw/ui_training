import { shapeConfig } from "./shape.config.js";

// session storage
const STORAGE_KEY = "shapeAppState";

const storage = {
	save: (state) => sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state)),
	load: () => JSON.parse(sessionStorage.getItem(STORAGE_KEY)),
	clear: () => sessionStorage.removeItem(STORAGE_KEY),
};

// app state
let appState = {
	step: 1,
	selectedShape: null,
	shapeSize: null,
};

// utility function to show/hide a container
const hideContainer = (container) => {
	container.style.display = "none";
};

const showContainer = (container) => {
	container.style.display = "";
};

// elements
const mainContainer = document.querySelector(".main");
const stepName = document.querySelector(".main__step-name");
const shapeContainer = document.querySelector(".interaction__shape-container");
const inputContainer = document.querySelector(".interaction__input-container");
const inputField = document.querySelector(".interaction__input");
const resultContainerShape = document.querySelector(".resultContainer__shape");
const resultContainer = document.querySelector(".resultContainer");
const nextBtn = document.querySelector(".main__next-step-btn");

// hide initial containers
hideContainer(inputContainer);
hideContainer(resultContainerShape);
hideContainer(resultContainer);
hideContainer(nextBtn);

// set initial states
stepName.innerText = "1. Choose a Shape";
nextBtn.innerText = "NEXT";

// loop through shapes and set up event listeners
Object.entries(shapeConfig).forEach(([key, shape]) => {
	const wrapper = document.createElement("div");
	wrapper.classList.add("shape-wrapper");

	const el = document.createElement("div");
	el.classList.add(shape.className);
	el.classList.add("shape", key);

	wrapper.addEventListener("click", () => {
		document
			.querySelectorAll(".shape-wrapper")
			.forEach((w) => w.classList.remove("selected"));

		wrapper.classList.add("selected");
		appState.selectedShape = key;
		storage.save(appState);

		showContainer(nextBtn);
	});

	wrapper.appendChild(el);
	shapeContainer.appendChild(wrapper);
});

// input on change event listener
inputField.addEventListener("input", (e) => {
	appState.shapeSize = e.target.value;
	storage.save(appState);
});

// handle function to submit on enter
const handleKeyDown = (e) => {
	if (e.key === "Enter") {
		nextBtn.click();
	}
};

// next button event listeners
nextBtn.addEventListener("click", () => {
	// get the next step number
	appState.step = (appState.step % 3) + 1;

	// validate the input on step 2
	if (appState.step === 3) {
		const inputValue = inputField.value.trim();

		if (inputValue === "" || inputValue === null || isNaN(Number(inputValue))) {
			alert("Please enter a valid number");
			appState.step = 2;
			return;
		}

		appState.shapeSize = Number(inputValue);
		inputField.value = "";
	}

	// reset store
	if (appState.step === 1) {
		appState = { step: 1, selectedShape: null, shapeSize: null };
		storage.clear();
	}

	storage.save(appState);

	// render the ui
	render();
});

const render = () => {
	const { step, selectedShape, shapeSize } = appState;

	// hide all containers
	hideContainer(shapeContainer);
	hideContainer(inputContainer);
	hideContainer(resultContainerShape);
	hideContainer(resultContainer);

	switch (step) {
		case 1:
			mainContainer.classList.remove("result-step");

			// remove selected state from shapes
			document
				.querySelectorAll(".shape-wrapper")
				.forEach((w) => w.classList.remove("selected"));

			if (selectedShape) {
				const el = document.querySelector(`.${selectedShape}`)?.parentElement;
				if (el) {
					el.classList.add("selected");
					showContainer(nextBtn);
				}
			} else {
				hideContainer(nextBtn);
			}

			showContainer(shapeContainer);
			stepName.innerText = "1. Choose a Shape";
			nextBtn.innerText = "NEXT";

			break;
		case 2:
			mainContainer.classList.add("input-step");
			showContainer(nextBtn);

			// to make things work on enter key press
			document.removeEventListener("keydown", handleKeyDown);
			document.addEventListener("keydown", handleKeyDown);

			showContainer(inputContainer);
			inputField.value = appState.shapeSize || "";
			stepName.innerText = `2. ${shapeConfig[selectedShape].inputPlaceHolder}`;
			nextBtn.innerText = "CALCULATE";
			break;
		case 3: {
			document.removeEventListener("keydown", handleKeyDown);
			mainContainer.classList.remove("input-step");
			mainContainer.classList.add("result-step");

			showContainer(nextBtn);
			showContainer(resultContainerShape);
			showContainer(resultContainer);

			resultContainerShape.innerHTML = "";

			const resultEl = document.createElement("div");
			resultEl.classList.add(shapeConfig[selectedShape].className);
			resultEl.classList.add("shape", selectedShape);

			resultContainerShape.appendChild(resultEl);

			stepName.innerText = `${shapeConfig[selectedShape].name}`;

			// clear previous results
			resultContainer.innerHTML = "";

			// get current shape config
			const shapeData = shapeConfig[selectedShape].data;

			// loop through data and render results
			shapeData.forEach((item) => {
				const resultDiv = document.createElement("div");
				resultDiv.classList.add("result");

				const propertyName = document.createElement("div");
				propertyName.classList.add("result__propertyName");
				propertyName.innerText = item.label;

				const formula = document.createElement("div");
				formula.classList.add("result__formula");
				formula.innerText = item.value;

				const value = document.createElement("div");
				value.classList.add("result__value");
				value.innerText = item.calculate(shapeSize);

				resultDiv.appendChild(propertyName);
				resultDiv.appendChild(formula);
				resultDiv.appendChild(value);

				resultContainer.appendChild(resultDiv);
			});

			nextBtn.innerText = "START AGAIN";
			break;
		}
		default:
			break;
	}
};

// init function
const init = () => {
	const saved = storage.load();
	if (saved) appState = saved;

	render();
};

init();
