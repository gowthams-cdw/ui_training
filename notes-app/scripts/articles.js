import { COLORS, MONTHS } from "./constants.js";
import { createElement, isValidNote } from "./utils.js";

// global state
const notes = JSON.parse(localStorage.getItem("notes")) || {};
const noteId = window.location.hash.substring(1);
const note = notes[noteId];

if (!note) {
	window.location.href = "404.html";
	throw new Error("Note not found"); // stops execution
}

// query selectors
const mainContainer = document.querySelector(".main");

const colorIcon = document.querySelector(".color-icon");

const deleteNoteButton = document.querySelector(".header__actions-delete");
const deleteNoteCloseButton = document.querySelector(".delete-note__close");
const deleteNoteConfirmButton = document.querySelector(".delete-note__btn");
const deleteNoteWrapper = document.querySelector(".delete-note__wrapper");

const editNoteButton = document.querySelector(".header__actions-edit");
const editNoteButtonClose = document.querySelector(".edit-note__close");

const editNoteTitleInput = document.querySelector(".edit-note__input-title");
const editNoteImageInput = document.querySelector(".edit-note__input-img-url");
const editNoteContentInput = document.querySelector(
	".edit-note__input-content",
);
const editNoteSubmitButton = document.querySelector(
	".edit-note__footer-add-btn",
);
const editNoteWrapper = document.querySelector(".edit-note__wrapper");

const editNoteColorBubblegumCrisis = document.querySelector(
	".edit-note__colors.bubblegum-crisis",
);
const editNoteColorEmptiness = document.querySelector(
	".edit-note__colors.emptiness",
);
const editNoteColorBananabread = document.querySelector(
	".edit-note__colors.bananabread",
);
const editNoteColorPineappleperfume = document.querySelector(
	".edit-note__colors.pineappleperfume",
);
const editNoteColorPeachfizz = document.querySelector(
	".edit-note__colors.peachfizz",
);
const closeWrapper = document.querySelector(".close__wrapper");
const closeCloseButton = document.querySelector(".close__close");
const closeConfirmButton = document.querySelector(".close__btn");

// utility function to validate note
const validateNote = (title, content) => {
	if (isValidNote(title, content)) {
		editNoteSubmitButton.disabled = false;
	} else {
		editNoteSubmitButton.disabled = true;
	}
};

// utility function to check unsaved changes
const hasUnsavedChanges = () => {
	return (
		title !== note.title ||
		content !== note.content ||
		img !== note.img ||
		color !== note.color
	);
};

// load initial data
const loadNote = () => {
	const titleEl = createElement({
		tag: "h1",
		className: "main__title",
		text: note.title,
	});

	const dateEl = createElement({
		tag: "p",
		className: "main__date",
		text: note.date,
	});

	const titleContainerEl = createElement({
		tag: "div",
		className: "main__title-container",
		children: [titleEl, dateEl],
	});

	mainContainer.appendChild(titleContainerEl);

	if (note.img) {
		const imgEl = createElement({
			tag: "img",
			className: "main__img",
			attrs: {
				src: note.img,
				alt: "note thumbnail img",
			},
		});

		const figEl = createElement({
			tag: "figure",
			className: "main__img-container",
			children: [imgEl],
		});

		mainContainer.appendChild(figEl);
	}

	const contentEl = createElement({
		tag: "p",
		className: "main__content",
		text: note.content,
	});

	mainContainer.appendChild(contentEl);
};
loadNote();

// function to reset the edit note form
const resetData = () => {
	editNoteTitleInput.value = note.title;
	editNoteContentInput.value = note.content;
	editNoteImageInput.value = note.img;

	// define color elements
	const colorElements = [
		editNoteColorBubblegumCrisis,
		editNoteColorEmptiness,
		editNoteColorBananabread,
		editNoteColorPineappleperfume,
		editNoteColorPeachfizz,
	];
	colorElements.forEach((el) => {
		el.classList.remove("selected");
	});
	switch (note.color) {
		case "bubblegumCrisis":
			editNoteColorBubblegumCrisis.classList.add("selected");
			break;
		case "emptiness":
			editNoteColorEmptiness.classList.add("selected");
			break;
		case "bananaBread":
			editNoteColorBananabread.classList.add("selected");
			break;
		case "pineapplePerfume":
			editNoteColorPineappleperfume.classList.add("selected");
			break;
		case "peachFizz":
			editNoteColorPeachfizz.classList.add("selected");
			break;
		default:
			break;
	}
};

// ===================
// DELETE NOTE SECTION
// ===================

// open model
const openDeleteModel = () => {
	deleteNoteWrapper.style.display = "flex";
};
deleteNoteButton.addEventListener("click", openDeleteModel);

// close model
const closeDeleteModel = () => {
	deleteNoteWrapper.style.display = "none";
};
deleteNoteCloseButton.addEventListener("click", closeDeleteModel);
deleteNoteWrapper.addEventListener("click", (e) => {
	if (e.target === deleteNoteWrapper) {
		closeDeleteModel();
	}
});

// delete all
const deleteNote = () => {
	const notes = JSON.parse(localStorage.getItem("notes"));

	const hash = window.location.hash;
	const noteId = hash.substring(1); // Remove the '#' from the hash

	delete notes[noteId];
	localStorage.setItem("notes", JSON.stringify(notes));
};
deleteNoteConfirmButton.addEventListener("click", () => {
	deleteNote();
	window.location.href = "/";
});

// ====================
// EDIT NOTE ACTIONS
// ====================

// open model
const openEditNoteModel = () => {
	resetData();
	editNoteWrapper.style.display = "flex";
};
editNoteButton.addEventListener("click", openEditNoteModel);

// =============
// confirm close
// =============
const openCloseModel = () => {
	closeWrapper.style.display = "flex";
};

const closeCloseModel = () => {
	closeWrapper.style.display = "none";
};

// close model
const closeEditNoteModel = () => {
	if (hasUnsavedChanges()) {
		openCloseModel();
	} else {
		editNoteWrapper.style.display = "none";
	}
};
editNoteButtonClose.addEventListener("click", closeEditNoteModel);
editNoteWrapper.addEventListener("click", (e) => {
	if (e.target === editNoteWrapper) {
		closeEditNoteModel();
	}
});
const forceCloseEditNoteModel = () => {
	closeCloseModel();
	editNoteWrapper.style.display = "none";

	// reset state back to original note
	title = note.title;
	content = note.content;
	img = note.img;
	color = note.color;
};
closeCloseButton.addEventListener("click", closeCloseModel);

closeWrapper.addEventListener("click", (e) => {
	if (e.target === closeWrapper) {
		closeCloseModel();
	}
});

closeConfirmButton.addEventListener("click", forceCloseEditNoteModel);

// datas
let title = note.title;
let img = note.img;
let content = note.content;
let color = note.color;

const curDate = new Date();
const date = `${MONTHS[curDate.getMonth()]} ${curDate.getDate()}, ${curDate.getFullYear()}`;

editNoteTitleInput.addEventListener("input", (e) => {
	title = e.target.value;
	validateNote(title, content);
});
editNoteImageInput.addEventListener("input", (e) => {
	img = e.target.value;
});
editNoteContentInput.addEventListener("input", (e) => {
	content = e.target.value;
	validateNote(title, content);
});

// colors change validators
const colorElements = [
	editNoteColorBananabread,
	editNoteColorBubblegumCrisis,
	editNoteColorEmptiness,
	editNoteColorPeachfizz,
	editNoteColorPineappleperfume,
];
editNoteColorBubblegumCrisis.addEventListener("click", () => {
	colorElements.forEach((el) => {
		el.classList.remove("selected");
	});
	editNoteColorBubblegumCrisis.classList.add("selected");
	color = "bubblegumCrisis";
});
editNoteColorEmptiness.addEventListener("click", () => {
	colorElements.forEach((el) => {
		el.classList.remove("selected");
	});
	editNoteColorEmptiness.classList.add("selected");
	color = "emptiness";
});
editNoteColorBananabread.addEventListener("click", () => {
	colorElements.forEach((el) => {
		el.classList.remove("selected");
	});
	editNoteColorBananabread.classList.add("selected");
	color = "bananaBread";
});
editNoteColorPineappleperfume.addEventListener("click", () => {
	colorElements.forEach((el) => {
		el.classList.remove("selected");
	});
	editNoteColorPineappleperfume.classList.add("selected");
	color = "pineapplePerfume";
});
editNoteColorPeachfizz.addEventListener("click", () => {
	colorElements.forEach((el) => {
		el.classList.remove("selected");
	});
	editNoteColorPeachfizz.classList.add("selected");
	color = "peachFizz";
});

// edit note
const editNote = () => {
	const editNote = {
		title,
		img,
		content,
		color,
		date,
		fullDate: curDate.getTime(),
	};

	notes[noteId] = editNote;

	localStorage.setItem("notes", JSON.stringify(notes));
	window.location.reload();
};
editNoteSubmitButton.addEventListener("click", editNote);

// color-icon
colorIcon.style.backgroundColor = COLORS[note.color];
