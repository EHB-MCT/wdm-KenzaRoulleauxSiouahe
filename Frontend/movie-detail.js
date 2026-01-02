const params = new URLSearchParams(globalThis.location.search);
const movieId = params.get("id");
const uid = localStorage.getItem("uid");

const startBtn = document.getElementById("startMovieBtn");
const deleteBtn = document.getElementById("deleteMovieBtn");
const addBtn = document.getElementById("addWatchlistBtn");
const backBtn = document.getElementById("backBtn");

async function loadMovie() {
	try {
		const res = await fetch(`http://localhost:5000/movies/${movieId}`);
		if (!res.ok) throw new Error("Failed to fetch movie");

		const movie = await res.json();
		document.getElementById("moviePoster").src = `http://localhost:5000${movie.Poster}`;
		document.getElementById("movieTitle").textContent = movie.Title;
		document.getElementById("movieInfo").textContent = `
    Duration: ${movie.Duration}
    Genre: ${movie.Subgenre}
    Language: ${movie.Language}
    Year: ${movie.Year}
    Rating: ${movie.Rating}
    `;
		const [watchRes, watchedRes] = await Promise.all([fetch(`http://localhost:5000/watchlist?uid=${uid}`), fetch(`http://localhost:5000/watched?uid=${uid}`)]);

		const watchlist = watchRes.ok ? await watchRes.json() : [];
		const watched = watchedRes.ok ? await watchedRes.json() : [];

		const inWatchlist = watchlist.some((m) => m.movieId === movieId);
		const isWatched = watched.some((m) => m.movieId === movieId);

		applyButtonState(inWatchlist, isWatched);
	} catch (err) {
		console.error("Error loading movie:", err);
	}
}

function applyButtonState(inWatchlist, isWatched) {
	if (isWatched) {
		startBtn?.remove();
		deleteBtn?.remove();
		addBtn?.remove();
		return;
	}

	if (inWatchlist) {
		startBtn.style.display = "block";
		deleteBtn.style.display = "block";
		addBtn?.remove();
		return;
	}

	addBtn.style.display = "block";
	startBtn?.remove();
	deleteBtn?.remove();
}

startBtn?.addEventListener("click", () => {
	localStorage.setItem("currentMovie", movieId);
	globalThis.location.href = "watch-movie.html";
});

addBtn?.addEventListener("click", async () => {
	try {
		const res = await fetch("http://localhost:5000/watchlist", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ uid, movieId }),
		});

		if (!res.ok) throw new Error("Failed to add");
		location.reload();
	} catch (err) {
		console.error(err);
		alert("Could not add movie");
	}
});

deleteBtn?.addEventListener("click", async () => {
	const confirmDelete = confirm("Are you sure you want to remove this movie from your watchlist?");
	if (!confirmDelete) return;

	try {
		const res = await fetch(`https://localhost:5000/watchlist,uid=${uid}&movieId=${movieId}`, { method: "DELETE" });
		if (!res.ok) throw new Error("Failed to delete");
		location.reload();
	} catch (err) {
		console.error(err);
		alert("Could not remove movie");
	}
});

backBtn?.addEventListener("click", async () => {
	globalThis.location.href = "profile.html";
});

loadMovie();
