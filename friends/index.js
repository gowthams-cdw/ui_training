// function that takes a json filename as input, and parses the json and return it
const parseJsonFile = async (fileName) => {
	try {
		const response = await fetch(fileName);
		if (!response.ok) {
			throw new Error(`Failed to fetch JSON file: ${response.statusText}`);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		throw new Error(`Failed to parse JSON file: ${error.message}`);
	}
};

// function that loads the initial data from the friends.json file and renders it to the page
const loadFriendsData = async () => {
	const friendsJson = await parseJsonFile("data/friends.json");

	const cardsContainer = document.getElementById("cards-container");
	friendsJson.forEach((friend) => {
		const article = document.createElement("article");
		article.className = "card";

		const figure = document.createElement("figure");
		figure.className = "card__img-container";

		const img = document.createElement("img");
		img.src = friend.img;
		img.alt = "profile";
		img.className = "card__img";
		img.loading = "lazy";
		figure.appendChild(img);

		const contentDiv = document.createElement("div");
		contentDiv.className = "card__content";

		const nameSpan = document.createElement("span");
		nameSpan.className = "card__content-name";
		nameSpan.textContent = `${friend.first_name} ${friend.last_name}`;

		const emailSpan = document.createElement("a");
		emailSpan.className = "card__content-email";
		emailSpan.textContent = friend.email;
		emailSpan.href = `mailto:${friend.email}`;

		contentDiv.appendChild(nameSpan);
		contentDiv.appendChild(emailSpan);

		article.appendChild(figure);
		article.appendChild(contentDiv);

		cardsContainer.appendChild(article);
	});
};

loadFriendsData();
