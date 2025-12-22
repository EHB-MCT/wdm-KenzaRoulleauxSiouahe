const searchInput = document.getElementById("searchInput");
const resultsDiv = document.getElementById("results");
const moviesContainer = document.getElementById("moviesContainer");
const searchHeader = document.getElementById("searchHeader");

globalThis.addEventListener("DOMContentLoaded", async () => {
	const response = await fetch("http://localhost:5000/movies?q=");
	const movies = await response.json();
	movies.forEach((movie) => {
		const item = document.createElement("div");
		item.classList.add("movie-card-default");

		item.innerHTML = `
      <img src="http://localhost:5000${movie.Poster}" alt="${movie.Title}" />
      <h4>${movie.Title}</h4>
    `;

		moviesContainer.appendChild(item);
	});
});

searchInput.addEventListener("input", async () => {
	const query = searchInput.value.trim();
	if (query === "") {
		searchHeader.style.display = "block";
		moviesContainer.style.display = "flex";

		resultsDiv.style.display = "none";
		resultsDiv.innerHTML = "";
	} else {
		searchHeader.style.display = "none";
		moviesContainer.style.display = "none";

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
		item.classList.add("movie-card");

		item.innerHTML = `
		<img src="http://localhost:5000${movie.Poster}" alt="${movie.Title}" />
		<div class="movie-info">
			<h3>${movie.Title}</h3>
			<p>Year: ${movie.Year}</p>
			<p>Duration: ${movie.Duration || "N/A"}</p>
			<p>Country: ${movie.Country || "N/A"}</p>
		</div>
	`;

		resultsDiv.appendChild(item);
	});
});
