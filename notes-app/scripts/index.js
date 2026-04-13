// import constants
import { COLORS, MONTHS } from "./constants.js";
import { isValidNote, createElement } from "./utils.js";

// get initial data from local storage
const notes = JSON.parse(localStorage.getItem("notes")) || {};
const sortedNotes = Object.entries(notes)
	.sort(([, a], [, b]) => b.fullDate - a.fullDate)
	.map(([id, note]) => ({ id, ...note }));

let iteration = 1;

// utility function to check load more possible
const canLoadMore = () => {
	return Object.keys(sortedNotes).length > (iteration - 1) * 10;
};

// query selectors
const deleteAllButton = document.querySelector(".header__actions-deleteall");
const deleteAllCloseButton = document.querySelector(".delete-all__close");
const deleteAllConfirmButton = document.querySelector(".delete-all__btn");
const deleteAllWrapper = document.querySelector(".delete-all__wrapper");

const newNoteButton = document.querySelector(".header__actions-new");
const newNoteButtonClose = document.querySelector(".new-note__close");

const newNoteTitleInput = document.querySelector(".new-note__input-title");
const newNoteImageInput = document.querySelector(".new-note__input-img-url");
const newNoteContentInput = document.querySelector(".new-note__input-content");
const newNoteSubmitButton = document.querySelector(".new-note__footer-add-btn");
const newNoteWrapper = document.querySelector(".new-note__wrapper");

const loadMoreButton = document.querySelector(".load-more__btn");

const newNoteColorBubblegumCrisis = document.querySelector(
	".new-note__colors.bubblegum-crisis",
);
const newNoteColorEmptiness = document.querySelector(
	".new-note__colors.emptiness",
);
const newNoteColorBananabread = document.querySelector(
	".new-note__colors.bananabread",
);
const newNoteColorPineappleperfume = document.querySelector(
	".new-note__colors.pineappleperfume",
);
const newNoteColorPeachfizz = document.querySelector(
	".new-note__colors.peachfizz",
);

const mainContainer = document.querySelector(".main");
const emptyStateContainer = document.querySelector(".main__empty");

const closeWrapper = document.querySelector(".close__wrapper");
const closeCloseButton = document.querySelector(".close__close");
const closeConfirmButton = document.querySelector(".close__btn");

// color map
const colorMap = {
	bubblegumCrisis: newNoteColorBubblegumCrisis,
	emptiness: newNoteColorEmptiness,
	bananaBread: newNoteColorBananabread,
	pineapplePerfume: newNoteColorPineappleperfume,
	peachFizz: newNoteColorPeachfizz,
};

// last picked color
const lastPickedColor = sortedNotes[0]?.color || "bubblegumCrisis";
const setSelectedColorUI = (color) => {
	Object.values(colorMap).forEach((el) => {
		el.classList.remove("selected");
	});
	colorMap[color]?.classList.add("selected");
};

// handle color select function
let selectedColorEl = colorMap[lastPickedColor];
const handleColorSelect = (newColor) => {
	// remove previous
	if (selectedColorEl) {
		selectedColorEl.classList.remove("selected");
	}

	// update state
	color = newColor;
	selectedColorEl = colorMap[newColor];

	// add new
	selectedColorEl.classList.add("selected");
};

// hanlde input change
const handleInputChange = () => {
	title = newNoteTitleInput.value;
	content = newNoteContentInput.value;
	img = newNoteImageInput.value;

	validateNote(title, content);
};

// load initial data
const loadData = () => {
	const start = (iteration - 1) * 10;
	const end = iteration * 10;

	Object.entries(sortedNotes)
		.slice(start, end)
		.forEach(([_, note]) => {
			const titleEl = createElement({
				tag: "h2",
				className: "card__title",
				text: note.title,
			});

			const dateEl = createElement({
				tag: "p",
				className: "card__date",
				text: note.date,
			});

			const contentEl = createElement({
				tag: "p",
				className: "card__content",
				text: note.content,
			});

			let imgContainerEl = null;

			if (note.img) {
				const imgEl = createElement({
					tag: "img",
					className: "card__img",
					attrs: {
						src: note.img,
						alt: "note image",
					},
				});

				imgContainerEl = createElement({
					tag: "figure",
					className: "card__img-container",
					children: [imgEl],
				});
			}

			const articleEl = createElement({
				tag: "article",
				className: "card",
				children: [titleEl, dateEl, imgContainerEl, contentEl],
				events: {
					click: () => {
						window.location.href = `articles.html#${note.id}`;
					},
				},
			});

			articleEl.style.backgroundColor = COLORS[note.color] || "#fff";

			mainContainer.appendChild(articleEl);
		});

	// increment iteration for next load
	iteration++;

	// conditionally render load more button
	if (!canLoadMore()) {
		loadMoreButton.style.display = "none";
	}
};

// ==================
// DELETE ALL ACTIONS
// ==================

// make delete all disabled if no notes
if (Object.keys(notes).length === 0) {
	deleteAllButton.disabled = true;
	emptyStateContainer.style.display = "block";
}

// open model
const openDeleteAllModel = () => {
	deleteAllWrapper.style.display = "flex";
};

// close model
const closeDeleteAllModel = () => {
	deleteAllWrapper.style.display = "none";
};

// delete all
const deleteAllNotes = () => {
	localStorage.removeItem("notes");
};

// ===================
// confirm close model
// ===================
const openCloseModel = () => {
	closeWrapper.style.display = "flex";
};
const closeCloseModel = () => {
	closeWrapper.style.display = "none";
};
const forceCloseNewNoteModel = () => {
	closeCloseModel();
	newNoteWrapper.style.display = "none";

	newNoteTitleInput.value = "";
	newNoteContentInput.value = "";
	newNoteImageInput.value = "";
};

// ====================
// ADD NEW NOTE ACTIONS
// ====================

// open model
const openNewNoteModel = () => {
	newNoteTitleInput.value = "";
	newNoteImageInput.value = "";
	newNoteContentInput.value = "";
	newNoteWrapper.style.display = "flex";
	newNoteSubmitButton.disabled = true;

	color = lastPickedColor;
	setSelectedColorUI(lastPickedColor);
	handleColorSelect(lastPickedColor);
};

// close model
const closeNewNoteModel = () => {
	if (hasUnsavedChanges()) {
		openCloseModel();
	} else {
		newNoteWrapper.style.display = "none";
	}
};

// utility function to validate note
const validateNote = (title, content) => {
	if (isValidNote(title, content)) {
		newNoteSubmitButton.disabled = false;
	} else {
		newNoteSubmitButton.disabled = true;
	}
};

// utility function to check unchanged data
const hasUnsavedChanges = () => {
	return (
		newNoteTitleInput.value.trim() !== "" ||
		newNoteContentInput.value.trim() !== "" ||
		newNoteImageInput.value.trim() !== ""
	);
};

// create new note
// datas
let title;
let img;
let content;
let color = lastPickedColor;
const bindEvents = () => {
	deleteAllButton.addEventListener("click", openDeleteAllModel);
	deleteAllCloseButton.addEventListener("click", closeDeleteAllModel);
	deleteAllWrapper.addEventListener("click", (e) => {
		if (e.target === deleteAllWrapper) {
			closeDeleteAllModel();
		}
	});
	deleteAllConfirmButton.addEventListener("click", () => {
		deleteAllNotes();
		window.location.reload();
	});

	// load more data
	loadMoreButton.addEventListener("click", loadData);

	newNoteButton.addEventListener("click", openNewNoteModel);

	newNoteButtonClose.addEventListener("click", closeNewNoteModel);
	newNoteWrapper.addEventListener("click", (e) => {
		if (e.target === newNoteWrapper) {
			closeNewNoteModel();
		}
	});

	// input change events
	newNoteTitleInput.addEventListener("input", handleInputChange);
	newNoteContentInput.addEventListener("input", handleInputChange);
	newNoteImageInput.addEventListener("input", handleInputChange);

	// colors change validators
	Object.entries(colorMap).forEach(([key, el]) => {
		el.addEventListener("click", () => handleColorSelect(key));
	});

	newNoteSubmitButton.addEventListener("click", () => {
		const curDate = new Date();
		const date = `${MONTHS[curDate.getMonth()]} ${curDate.getDate()}, ${curDate.getFullYear()}`;
		const id = Math.random().toString(36).slice(2, 9);

		const newNote = {
			title,
			img,
			content,
			color,
			date,
			fullDate: curDate.getTime(),
		};

		notes[id] = newNote;

		localStorage.setItem("notes", JSON.stringify(notes));
		window.location.reload();
	});

	// confirm close modal events
	closeCloseButton.addEventListener("click", closeCloseModel);
	closeWrapper.addEventListener("click", (e) => {
		if (e.target === closeWrapper) {
			closeCloseModel();
		}
	});
	closeConfirmButton.addEventListener("click", forceCloseNewNoteModel);
};

const init = () => {
	loadData();
	bindEvents();
};
init();

// initial lines
// 350
// 333
