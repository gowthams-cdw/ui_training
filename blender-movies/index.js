// query selectors
const video = document.querySelector(".video__container-video");
const videoPlayButton = document.querySelector(".video__container-play");
const title = document.querySelector(".content__details-title");
const description = document.querySelector(".content__details-desc");
const commentsContainer = document.querySelector(".content__comments");
const upcomingList = document.querySelector(".upcoming__list");

// play - pause functionality
videoPlayButton.addEventListener("click", () => {
	if (video.paused) {
		video.play();
		videoPlayButton.classList.replace("fa-play", "fa-pause");
	} else {
		video.pause();
		videoPlayButton.classList.replace("fa-pause", "fa-play");
	}
});

// load initial video data
const loadVideoData = async () => {
	try {
		const response = await fetch("data/video.json");

		if (!response.ok) {
			throw new Error("Failed to fetch video data");
		}

		const data = await response.json();

		video.src = data.videoUrl;
		video.poster =
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfZRwBm1p7ugENWtIBvaZIj9B4Y9x84ccqbg&s";
		title.textContent = data.title;
		description.textContent = data.description;

		renderComments(data.comments);
	} catch (error) {
		console.error("Video Data Error:", error);
	}
};

// load initial posters data
const loadPosters = async () => {
	try {
		const response = await fetch("data/posters.json");

		if (!response.ok) {
			throw new Error("Failed to fetch posters");
		}

		const data = await response.json();

		renderPosters(data);
	} catch (error) {
		console.error("Poster Error:", error);
	}
};

// render comments
const renderComments = (comments) => {
	// loop comments and render it
	comments.forEach((comment) => {
		const commentEl = document.createElement("div");
		commentEl.classList.add("comment");

		const figureEl = document.createElement("figure");
		figureEl.classList.add("comment__profile");

		const imgEl = document.createElement("img");
		imgEl.src = comment.image;
		imgEl.alt = comment.name;
		figureEl.appendChild(imgEl);

		const detailsEl = document.createElement("div");
		detailsEl.classList.add("comment_details");

		const titleEl = document.createElement("h3");
		titleEl.classList.add("comment__title");
		titleEl.textContent = comment.name;
		detailsEl.appendChild(titleEl);

		const descEl = document.createElement("p");
		descEl.classList.add("comment__desc");
		descEl.textContent = comment.comment;
		detailsEl.appendChild(descEl);

		commentEl.appendChild(figureEl);
		commentEl.appendChild(detailsEl);

		commentsContainer.appendChild(commentEl);
	});
};

// render posters
const renderPosters = (posters) => {
	upcomingList.innerHTML = "";

	// loop posters and create each poster element
	posters.forEach((poster) => {
		const posterEl = document.createElement("figure");
		posterEl.classList.add("upcoming__list-item");

		const imgEl = document.createElement("img");
		imgEl.src = poster.imageUrl;
		imgEl.alt = poster.title;

		posterEl.appendChild(imgEl);
		upcomingList.appendChild(posterEl);
	});
};

// initial data loading
loadVideoData();
loadPosters();
