// wait for the dom to load
$(document).ready(() => {
	// query selectors
	const $video = $(".video__container-video");
	const $videoPlayButton = $(".video__container-play");
	const $title = $(".content__details-title");
	const $description = $(".content__details-desc");
	const $commentsContainer = $(".content__comments");
	const $upcomingList = $(".upcoming__list");
	const $videoContainer = $(".video__container");

	// play - pause functionality
	$videoContainer.on("click", () => {
		if ($video[0].paused) {
			$video[0].play();
			$videoPlayButton.removeClass("fa-play").addClass("fa-pause");
		} else {
			$video[0].pause();
			$videoPlayButton.removeClass("fa-pause").addClass("fa-play");
		}
	});

	// load initial video data
	const loadVideoData = async () => {
		try {
			const response = await fetch("data/video.json");

			if (!response.ok) throw new Error("Failed to fetch video data");

			const data = await response.json();

			$video.attr("src", data.videoUrl);
			$video.attr(
				"poster",
				"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfZRwBm1p7ugENWtIBvaZIj9B4Y9x84ccqbg&s",
			);

			$title.text(data.title);
			$description.text(data.description);

			renderComments(data.comments);
		} catch (error) {
			console.error("Video Data Error:", error);
		}
	};

	// load posters data
	const loadPosters = async () => {
		try {
			const response = await fetch("data/posters.json");

			if (!response.ok) throw new Error("Failed to fetch posters");

			const data = await response.json();

			renderPosters(data);
		} catch (error) {
			console.error("Poster Error:", error);
		}
	};

	// render comments
	const renderComments = (comments) => {
		// loop comments and render each comment
		$.each(comments, (_, comment) => {
			const commentEl = $(`
				<div class="comment">
					<figure class="comment__profile">
						<img src="${comment.image}" alt="${comment.name}">
					</figure>
					<div class="comment_details">
						<h3 class="comment__title">${comment.name}</h3>
						<p class="comment__desc">${comment.comment}</p>
					</div>
				</div>
			`);

			$commentsContainer.append(commentEl);
		});
	};

	// render posters
	const renderPosters = (posters) => {
		// loop each posters and render each poster
		$.each(posters, (_, poster) => {
			const posterEl = $(`
				<figure class="upcoming__list-item">
					<img src="${poster.imageUrl}" alt="${poster.title}">
				</figure>
			`);

			$upcomingList.append(posterEl);
		});
	};

	// initial data loading
	loadVideoData();
	loadPosters();
});
