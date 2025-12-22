const searchInput = document.getElementById("searchInput");
const resultsDiv = document.getElementById("results");

searchInput.addEventListener("input", async () => {
	const query = searchInput.value.trim();

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
    <img src="${movie.Poster}" alt="${movie.Title}" />
    <h3>${movie.Title}</h3>
  `;

		resultsDiv.appendChild(item);
	});
});
