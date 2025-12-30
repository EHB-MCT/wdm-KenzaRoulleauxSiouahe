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
