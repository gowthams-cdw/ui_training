import { shapeConfig } from "./shape.config.js";

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

// keep track of selected element
let selectedShape = null;
let step = 1;
let shapeSize = null;

// set initial states
stepName.innerText = "1. Choose a Shape";
nextBtn.innerText = "NEXT";

// loop through shapes and set up event listeners
Object.entries(shapeConfig).forEach(([key, shape]) => {
	const wrapper = document.createElement("div");
	wrapper.classList.add("shape-wrapper");

	const el = document.createElement("div");
	el.classList.add("shape", key);

	if (key === "triangle") {
		shape.create(el, {
			base: 3.9,
			height: 7.6,
		});
	} else {
		shape.create(el, {
			size: 7.37,
		});
	}

	wrapper.addEventListener("click", () => {
		document
			.querySelectorAll(".shape-wrapper")
			.forEach((w) => w.classList.remove("selected"));

		wrapper.classList.add("selected");
		selectedShape = key;

		showContainer(nextBtn);
	});

	wrapper.appendChild(el);
	shapeContainer.appendChild(wrapper);
});

// next button event listeners
nextBtn.addEventListener("click", () => {
	// get the next step number
	step = (step % 3) + 1;

	// validate the input on step 2
	if (step === 3) {
		const inputValue = inputField.value.trim();

		if (inputValue === "" || inputValue === null || isNaN(Number(inputValue))) {
			alert("Please enter a valid number");
			step = 2;
			return;
		}

		shapeSize = Number(inputValue);
		inputField.value = "";
	}

	// hide all containers
	hideContainer(shapeContainer);
	hideContainer(inputContainer);
	hideContainer(resultContainerShape);
	hideContainer(resultContainer);

	switch (step) {
		case 1:
			mainContainer.classList.remove("result-step");

			// remove selected state from shapes
			selectedShape = null;
			document
				.querySelectorAll(".shape-wrapper")
				.forEach((w) => w.classList.remove("selected"));
			hideContainer(nextBtn);

			showContainer(shapeContainer);
			stepName.innerText = "1. Choose a Shape";
			nextBtn.innerText = "NEXT";

			break;
		case 2:
			mainContainer.classList.add("input-step");

			showContainer(inputContainer);
			stepName.innerText = `2. ${shapeConfig[selectedShape].inputPlaceHolder}`;
			nextBtn.innerText = "CALCULATE";
			break;
		case 3: {
			mainContainer.classList.remove("input-step");
			mainContainer.classList.add("result-step");

			showContainer(resultContainerShape);
			showContainer(resultContainer);

			resultContainerShape.innerHTML = "";

			const resultEl = document.createElement("div");
			resultEl.classList.add("shape", selectedShape);

			if (selectedShape === "triangle") {
				shapeConfig[selectedShape].create(resultEl, {
					base: 4.1,
					height: 7.9,
				});
			} else {
				shapeConfig[selectedShape].create(resultEl, {
					size: 8,
				});
			}

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
});
