const searchInput = document.getElementById("searchInput");
const resultsDiv = document.getElementById("results");
const moviesContainer = document.getElementById("moviesContainer");
const searchHeader = document.getElementById("searchHeader");
const recommendationTitle = document.getElementById("recommendationTitle");

let watchlistIds = new Set();
let watchedIds = new Set();

if (!localStorage.getItem("uid")) {
	location.href = "login.html";
}

async function loadUserMovieStates() {
	const uid = localStorage.getItem("uid");
	if (!uid) return;

	const [watchlistRes, watchedRes] = await Promise.all([fetch(`http://localhost:5000/watchlist?uid=${uid}`), fetch(`http://localhost:5000/watched?uid=${uid}`)]);

	if (watchlistRes.ok) {
		const watchlist = await watchlistRes.json();
		watchlist.forEach((m) => watchlistIds.add(m.movieId));
	}

	if (watchedRes.ok) {
		const watched = await watchedRes.json();
		watched.forEach((m) => watchedIds.add(m.movieId));
	}
}
function renderHorizontalMovies(movies) {
	moviesContainer.innerHTML = "";

	movies.forEach((movie) => {
		const item = document.createElement("div");
		item.classList.add("movie-card-default");

		item.innerHTML = `
			<img src="http://localhost:5000${movie.Poster}" alt="${movie.Title}" />
			<h4>${movie.Title}</h4>
		`;

		item.addEventListener("click", () => {
			globalThis.location.href = `movie-detail.html?id=${movie._id}`;
		});

		moviesContainer.appendChild(item);
	});
}
globalThis.addEventListener("DOMContentLoaded", async () => {
	await loadUserMovieStates();
	const uid = localStorage.getItem("uid");
	let movies = [];

	if (uid) {
		const recRes = await fetch(`http://localhost:5000/movies/recommended?uid=${uid}`);
		if (recRes.ok) {
			movies = await recRes.json();
		}
	}
	if (!movies || movies.length === 0) {
		const response = await fetch("http://localhost:5000/movies?q=");
		movies = await response.json();
	}
	recommendationTitle.style.display = "block";

	renderHorizontalMovies(movies);
});

searchInput.addEventListener("input", async () => {
	const query = searchInput.value.trim();
	if (query === "") {
		searchHeader.style.display = "block";
		moviesContainer.style.display = "flex";
		recommendationTitle.style.display = "block";

		resultsDiv.style.display = "none";
		resultsDiv.innerHTML = "";
	} else {
		searchHeader.style.display = "none";
		moviesContainer.style.display = "none";
		recommendationTitle.style.display = "none";

		resultsDiv.style.display = "block";
	}

	const response = await fetch("http://localhost:5000/movies?q=" + encodeURIComponent(query));
	const movies = await response.json();

	resultsDiv.innerHTML = "";

	if (movies.length === 0) {
		resultsDiv.innerHTML = "<p>No movies found.</p>";
		return;
	}

	movies.forEach((movie) => {
		const item = document.createElement("div");

		const isInWatchlist = watchlistIds.has(movie._id);
		const isWatched = watchedIds.has(movie._id);

		item.classList.add("movie-card");

		item.addEventListener("click", () => {
			globalThis.location.href = `movie-detail.html?id=${movie._id}`;
		});

		item.innerHTML = `
		<img src="http://localhost:5000${movie.Poster}" alt="${movie.Title}" />
		<div class="movie-info">
			<h3>${movie.Title}</h3>
			<p>Rating: ${movie.Rating || "N/A"}</p>
			<button class="add-watchlist-btn" 
			${isInWatchlist || isWatched ? "disabled" : ""}
>
			${isWatched ? "Watched" : isInWatchlist ? "In Queue" : "Add to Queue"}
		</button>

		</div>
	`;
		if (isWatched) {
			const badge = document.createElement("div");
			badge.classList.add("watched-badge");
			badge.textContent = "WATCHED";
			item.appendChild(badge);
		}
		resultsDiv.appendChild(item);

		item.querySelector(".add-watchlist-btn").addEventListener("click", async (e) => {
			const uid = localStorage.getItem("uid");
			if (!uid) return alert("Not logged in");

			const movieId = e.target.dataset.id;
			const title = e.target.dataset.title;

			try {
				const res = await fetch("http://localhost:5000/watchlist", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ uid, movieId, title }),
				});

				const data = await res.json();
				if (!res.ok) alert(data.message);
				else alert("Added to Want to watch");
			} catch (err) {
				console.error(err);
				alert("Could not add the movie");
			}
		});
	});
});
