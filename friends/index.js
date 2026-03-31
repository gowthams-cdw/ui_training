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

const loadInitialData = async () => {
	const friendsJson = await parseJsonFile("data/friends.json");
	console.log(friendsJson);

	const mainContainer = document.getElementsByClassName("main")[0];
	mainContainer.innerHTML = friendsJson
		.map((friend) => {
			return `
		<article class="card">
			<figure class="card__img-container">
				<img src="${friend.img}" alt="profile" class="card__img" loading="lazy" />
			</figure>
			<div class="card__content">
				<span class="card__content-name">
					${friend.first_name} ${friend.last_name}
				</span>
				<span class="card__content-email">${friend.email}</span>
			</div>
		</article>
		`;
		})
		.join("");
};

loadInitialData();
