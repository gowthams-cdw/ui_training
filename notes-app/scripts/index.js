// import constants
import { colors, months } from "./constants.js";
import { isValidNote } from "./utils.js";

// get initial data from local storage
const notes = JSON.parse(localStorage.getItem("notes")) || {};
let iteration = 1;

// utility function to check load more possible
const canLoadMore = () => {
	return Object.keys(notes).length > (iteration - 1) * 10;
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

// load initial data
const loadData = () => {
	const start = (iteration - 1) * 10;
	const end = iteration * 10;

	Object.entries(notes)
		.slice(start, end)
		.forEach(([id, note]) => {
			const articleEl = document.createElement("article");
			articleEl.classList.add("card");
			articleEl.style.backgroundColor = colors[note.color] || "#ffffff";

			const titleEl = document.createElement("h2");
			titleEl.classList.add("card__title");
			titleEl.textContent = note.title;
			articleEl.appendChild(titleEl);

			const dateEl = document.createElement("p");
			dateEl.classList.add("card__date");
			dateEl.textContent = note.date;
			articleEl.appendChild(dateEl);

			if (note.img) {
				const imgContainerEl = document.createElement("figure");
				imgContainerEl.classList.add("card__img-container");

				const imgEl = document.createElement("img");
				imgEl.classList.add("card__img");
				imgEl.src = note.img;
				imgEl.alt = "Anime-Girl-10.jpg";
				imgContainerEl.appendChild(imgEl);
				articleEl.appendChild(imgContainerEl);
			}

			const contentEl = document.createElement("p");
			contentEl.classList.add("card__content");
			contentEl.textContent = note.content;
			articleEl.appendChild(contentEl);

			articleEl.addEventListener("click", () => {
				window.location.href = `articles.html#${id}`;
			});

			mainContainer.appendChild(articleEl);
		});

	// increment iteration for next load
	iteration++;

	// conditionally render load more button
	if (!canLoadMore()) {
		loadMoreButton.style.display = "none";
	}
};
loadData();

// ==================
// DELETE ALL ACTIONS
// ==================

// make delete all disabled if no notes
if (Object.keys(notes).length === 0) {
	deleteAllButton.disabled = true;
}

// open model
const openDeleteAllModel = () => {
	deleteAllWrapper.style.display = "flex";
};
deleteAllButton.addEventListener("click", openDeleteAllModel);

// close model
const closeDeleteAllModel = () => {
	deleteAllWrapper.style.display = "none";
};
deleteAllCloseButton.addEventListener("click", closeDeleteAllModel);
deleteAllWrapper.addEventListener("click", (e) => {
	if (e.target === deleteAllWrapper) {
		closeDeleteAllModel();
	}
});

// delete all
const deleteAllNotes = () => {
	localStorage.removeItem("notes");
};
deleteAllConfirmButton.addEventListener("click", () => {
	console.log("click");
	deleteAllNotes();
	window.location.reload();
});

// load more data
loadMoreButton.addEventListener("click", loadData);

// ====================
// ADD NEW NOTE ACTIONS
// ====================

// open model
const openNewNoteModel = () => {
	newNoteTitleInput.value = "";
	newNoteImageInput.value = "";
	newNoteContentInput.value = "";
	newNoteWrapper.style.display = "flex";
};
newNoteButton.addEventListener("click", openNewNoteModel);

// close model
const closeNewNoteModel = () => {
	newNoteWrapper.style.display = "none";
};
newNoteButtonClose.addEventListener("click", closeNewNoteModel);
newNoteWrapper.addEventListener("click", (e) => {
	if (e.target === newNoteWrapper) {
		closeNewNoteModel();
	}
});

// create new note
const createNewNote = () => {
	// datas
	let title;
	let img;
	let content;
	let color = "bubblegumCrisis";

	const curDate = new Date();
	const date = `${months[curDate.getMonth()]} ${curDate.getDate()}, ${curDate.getFullYear()}`;
	const id = Math.random().toString(36).slice(2, 9);

	newNoteTitleInput.addEventListener("input", (e) => {
		title = e.target.value;

		// on validate, enable or disable submit button
		if (isValidNote(title, content)) {
			newNoteSubmitButton.disabled = false;
		} else {
			newNoteSubmitButton.disabled = true;
		}
	});
	newNoteImageInput.addEventListener("input", (e) => {
		img = e.target.value;
	});
	newNoteContentInput.addEventListener("input", (e) => {
		content = e.target.value;
		console.log(isValidNote(title, content));

		// on validate, enable or disable submit button
		if (isValidNote(title, content)) {
			newNoteSubmitButton.disabled = false;
		} else {
			newNoteSubmitButton.disabled = true;
		}
	});

	// colors change validators
	const colorElements = [
		newNoteColorBubblegumCrisis,
		newNoteColorEmptiness,
		newNoteColorBananabread,
		newNoteColorPineappleperfume,
		newNoteColorPeachfizz,
	];
	newNoteColorBubblegumCrisis.addEventListener("click", () => {
		colorElements.forEach((el) => {
			el.classList.remove("selected");
		});
		newNoteColorBubblegumCrisis.classList.add("selected");
		color = "bubblegumCrisis";
	});
	newNoteColorEmptiness.addEventListener("click", () => {
		colorElements.forEach((el) => {
			el.classList.remove("selected");
		});
		newNoteColorEmptiness.classList.add("selected");
		color = "emptiness";
	});
	newNoteColorBananabread.addEventListener("click", () => {
		colorElements.forEach((el) => {
			el.classList.remove("selected");
		});
		newNoteColorBananabread.classList.add("selected");
		color = "bananaBread";
	});
	newNoteColorPineappleperfume.addEventListener("click", () => {
		colorElements.forEach((el) => {
			el.classList.remove("selected");
		});
		newNoteColorPineappleperfume.classList.add("selected");
		color = "pineapplePerfume";
	});
	newNoteColorPeachfizz.addEventListener("click", () => {
		colorElements.forEach((el) => {
			el.classList.remove("selected");
		});
		newNoteColorPeachfizz.classList.add("selected");
		color = "peachFizz";
	});

	newNoteSubmitButton.addEventListener("click", () => {
		const newNote = {
			title,
			img,
			content,
			color,
			date,
		};

		notes[id] = newNote;

		localStorage.setItem("notes", JSON.stringify(notes));
		window.location.reload();
	});
};
createNewNote();
