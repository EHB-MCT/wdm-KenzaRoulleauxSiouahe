document.addEventListener("DOMContentLoaded", async () => {
	const summary = JSON.parse(localStorage.getItem("lastMovieSummary"));
	const movieId = summary.movieId;

	const res = await fetch(`http://localhost:5000/movies/${movieId}`);
	const movie = await res.json();

	let heartRates = [];
	try {
		const hrRes = await fetch(`http://localhost:5000/heart-rate/movie?uid=${window.uid}&movieId=${movieId}`);
		if (hrRes.ok) heartRates = await hrRes.json();
	} catch (err) {
		console.error("Failed to fetch heart rate data:", err);
	}
	const bpmValues = heartRates.map((h) => h.data.heartRate);
	const averageBPM = bpmValues.length ? bpmValues.reduce((a, b) => a + b, 0) / bpmValues.length : 0;
	const maxBPM = bpmValues.length ? Math.max(...bpmValues) : 0;
	const minBPM = bpmValues.length ? Math.min(...bpmValues) : 0;

	document.getElementById("summaryTitle").textContent = movie.Title;
	document.getElementById("summaryPoster").src = `http://localhost:5000${movie.Poster}`;
	document.getElementById("bpmSummary").textContent = `
    Average BPM : ${averageBPM.toFixed(1)}
    Highest BPM : ${maxBPM}
    Lowest BPM: ${minBPM}`;

	document.getElementById("submitRatingBtn").addEventListener("click", async () => {
		const fear = Number(document.getElementById("fearRating").value) || 5;
		const story = Number(document.getElementById("storyRating").value) || 5;

		const normalizedBPM = bpmValues.length ? ((averageBPM - 60) / 100) * 10 : 0;

		const scaryScore = (fear * 0.3 + story * 0.2 + normalizedBPM * 0.5).toFixed(1);

		const uid = localStorage.getItem("uid");

		await fetch(`http://localhost:5000/watched`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				uid,
				movieId,
				poster: movie.Poster,
				scaryScore,
				watchedAt: new Date().toLocaleString("en-GB", { timeZone: "Europe/Brussels" }),
			}),
		});
		await fetch(`http://localhost:5000/watchlist?uid=${uid}&movieId=${movieId}`, {
			method: "DELETE",
		}).catch((err) => console.error("Error removing from watchlist:", err));

		localStorage.removeItem("lastMovieSummary");

		globalThis.location.href = "profile.html";
	});
});
