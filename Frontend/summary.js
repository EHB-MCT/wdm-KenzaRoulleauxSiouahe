document.addEventListener("DOMContentLoaded", async () => {
	const summary = JSON.parse(localStorage.getItem("lastMovieSummary"));
	const movieId = summary.movieId;

	const res = await fetch(`http://localhost:5000/movies/${movieId}`);
	const movie = await res.json();

	document.getElementById("summaryTitle").textContent = movie.Title;
	document.getElementById("summaryPoster").src = `http://localhost:5000${movie.Poster}`;
	document.getElementById("bpmSummary").textContent = `
    Average BPM : ${summary.averageBPM.toFixed(1)}
    Highest BPM : ${summary.maxBPM}
    Lowest BPM: ${summary.minBPM}`;

	document.getElementById("submitRatingBtn").addEventListener("click", async () => {
		const fear = Number(document.getElementById("fearRating").value) || 5;
		const story = Number(document.getElementById("storyRating").value) || 5;

		const scaryScore = (fear * 0.5 + story * 0.5).toFixed(1);

		const uid = localStorage.getItem("uid");

		await fetch(`http://localhost:5000/watched`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				uid,
				movieId,
				scaryScore,
				watchedAt: new Date().toLocaleString("en-GB", { timeZone: "Europe/Brussels" }),
			}),
		});

		localStorage.removeItem("lastMovieSummary");

		globalThis.location.href = "profile.html";
	});
});
