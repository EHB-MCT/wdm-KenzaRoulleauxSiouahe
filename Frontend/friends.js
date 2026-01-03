const searchInput = document.getElementById("friendSearch");
const resultsDiv = document.getElementById("searchResults");
const friendsList = document.getElementById("friendsList");

if (!window.uid) {
	alert("Not logged in");
	location.href = "login.html";
}

searchInput.addEventListener("input", async () => {
	const q = searchInput.value.trim();
	if (!q) {
		resultsDiv.innerHTML = "";
		return;
	}

	const res = await fetch(`http://localhost:5000/users/search?q=${q}&uid=${window.uid}`);
	const users = await res.json();

	resultsDiv.innerHTML = "";
	users.forEach((u) => {
		const div = document.createElement("div");
		div.className = "search-user";
		div.innerHTML = `
      <img src="${u.avatar || "default.png"}" />
      <span>${u.displayName}</span>
      <button data-uid="${u.uid}">Add</button>
    `;

		div.querySelector("button").onclick = () => addFriend(u.uid);
		resultsDiv.appendChild(div);
	});
});

async function addFriend(friendUid) {
	await fetch("http://localhost:5000/friends/add", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ uid, friendUid }),
	});

	searchInput.value = "";
	resultsDiv.innerHTML = "";
	loadFriends();
}
async function loadFriends() {
	const res = await fetch(`http://localhost:5000/friends?uid=${window.uid}`);
	const friends = await res.json();

	friendsList.innerHTML = "";

	friends.forEach((f) => {
		const card = document.createElement("div");
		card.className = "friend-card";

		card.innerHTML = `
      <div class="header">
        <img src="${f.avatar || "default.png"}" />
        <h3>${f.displayName}</h3>
      </div>

      <div class="tabs">
        <button class="tab-btn">Watchlist</button>
        <button class="tab-btn">Watched</button>
      </div>

      <div class="movies">
        ${f.watchlist.map((m) => `<div class="movie" data-id="${m.movieId}">${m.title}</div>`).join("")}
      </div>
    `;

		card.querySelectorAll(".movie").forEach((el) => {
			el.onclick = () => addMovieToMyWatchlist(el.dataset.id);
		});

		friendsList.appendChild(card);
	});
}

loadFriends();
async function addMovieToMyWatchlist(movieId) {
	await fetch("http://localhost:5000/watchlist", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ uid, movieId }),
	});

	alert("Added to your watchlist");
}
