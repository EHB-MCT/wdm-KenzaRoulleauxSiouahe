const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", async () => {
	const query = document.getElementById("searchInput").value;

	const response = await fetch("http://localhost:5000/movies?q=" + query);
	const movies = await response.json();

	const resultsDiv = document.getElementById("results");
	resultsDiv.innerHTML = "";

	if (movies.length == 0) {
		resultsDiv.innerHTML = "<p>No movies found.</p>";
		return;
	}

	movies.forEach((movie) => {
		const item = document.createElement("div");
		item.innerHTML = `<strong>${movies.title}</strong> (${movie.year})`;
		resultsDiv.appendChild(item);
	});
});
