const params = new URLSearchParams(globalThis.location.search);
const movieId = params.get("id");

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
	} catch (err) {
		console.error("Error loading movie:", err);
	}
}
document.getElementById("startMovieBtn").addEventListener("click", () => {
	localStorage.setItem("currentMovie", movieId);
});
loadMovie();
document.getElementById("deleteMovieBtn").addEventListener("click", async () => {
	const uid = localStorage.getItem("uid");
	const confirmDelete = confirm("Are you sure you want to remove this movie from your watchlist?");
	if (!confirmDelete) return;

	try {
		const res = await fetch(`http://localhost:5000/watchlist?uid=${uid}&movieId=${movieId}`, {
			method: "DELETE",
		});
		const data = await res.json();
		if (!res.ok) {
			alert(data.message || "Could not remove movie");
			return;
		}
		console.log("Movie removed from watchlist");
		globalThis.location.href = "profile.html";
	} catch (err) {
		console.error(err);
		alert("Error removing movie");
	}
});
document.getElementById("backBtn").addEventListener("click", () => {
	globalThis.location.href = "profile.html";
});

document.getElementById("startMovieBtn").addEventListener("click", () => {
	const movieId = localStorage.getItem("currentMovie");
	if (!movieId) return;

	globalThis.location.href = "watch-movie.html";
});
