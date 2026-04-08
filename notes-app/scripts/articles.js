import { colors, months } from "./constants.js";

// global state
const notes = JSON.parse(localStorage.getItem("notes")) || {};
const noteId = window.location.hash.substring(1);
const note = notes[noteId];

if (!note) window.location.href = "404.html";

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

// load initial data
const loadNote = () => {
	// load content
	const titleContainerEl = document.createElement("div");
	titleContainerEl.classList.add("main__title-container");

	const titleEl = document.createElement("h1");
	titleEl.classList.add("main__title");
	titleEl.textContent = note.title;
	titleContainerEl.appendChild(titleEl);

	const dateEl = document.createElement("p");
	dateEl.classList.add("main__date");
	dateEl.textContent = note.date;
	titleContainerEl.appendChild(dateEl);
	mainContainer.appendChild(titleContainerEl);

	if (note.img) {
		const figEl = document.createElement("figure");
		figEl.classList.add("main__img-container");

		const imgEl = document.createElement("img");
		imgEl.classList.add("main__img");
		imgEl.src = note.img;
		imgEl.alt = "note thumbnail img";
		figEl.appendChild(imgEl);

		mainContainer.appendChild(figEl);
	}

	const contentEl = document.createElement("p");
	contentEl.classList.add("main__content");
	contentEl.textContent = note.content;
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

// close model
const closeEditNoteModel = () => {
	editNoteWrapper.style.display = "none";
};
editNoteButtonClose.addEventListener("click", closeEditNoteModel);
editNoteWrapper.addEventListener("click", (e) => {
	if (e.target === editNoteWrapper) {
		closeEditNoteModel();
	}
});

// datas
let title = note.title;
let img = note.img;
let content = note.content;
let color = note.color;

const curDate = new Date();
const date = `${months[curDate.getMonth()]} ${curDate.getDate()}, ${curDate.getFullYear()}`;

editNoteTitleInput.addEventListener("input", (e) => {
	title = e.target.value;

	// on validate, enable or disable submit button
	if (isValidNote(title, content)) {
		editNoteSubmitButton.disabled = false;
	} else {
		editNoteSubmitButton.disabled = true;
	}
});
editNoteImageInput.addEventListener("input", (e) => {
	img = e.target.value;
});
editNoteContentInput.addEventListener("input", (e) => {
	content = e.target.value;
	console.log(isValidNote(title, content));

	// on validate, enable or disable submit button
	if (isValidNote(title, content)) {
		editNoteSubmitButton.disabled = false;
	} else {
		editNoteSubmitButton.disabled = true;
	}
});

// colors change validators
const colorElements = [
	editNoteColorBubblegumCrisis,
	editNoteColorEmptiness,
	editNoteColorBananabread,
	editNoteColorPineappleperfume,
	editNoteColorPeachfizz,
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
	};

	notes[noteId] = editNote;

	localStorage.setItem("notes", JSON.stringify(notes));
	window.location.reload();
};
editNoteSubmitButton.addEventListener("click", editNote);

// color-icon
colorIcon.style.backgroundColor = colors[note.color]
