function simulateHeartRate(fearLevel, intensity = 0) {
	const baseHR = Math.floor(Math.random() * (100 - 60 + 1)) + 60;
	const fearModifier = fearLevel * 5;
	const genreModifier = intensity;
	const randomNoise = Math.floor(Math.random() * 5);

	let heartRate = baseHR + fearModifier + genreModifier + randomNoise;

	const jumpscareProbability = 0.05 * fearLevel;
	if (Math.random() < jumpscareProbability) {
		const spike = Math.floor(Math.random() * 30) + 20;
		heartRate += spike;
	}
	return heartRate;
}
window.currentBPM = Math.floor(Math.random() * (100 - 60 + 1)) + 60;
setInterval(() => {
	const uid = localStorage.getItem("uid");
	if (!uid) return;

	const fearLevel = Number.parseInt(localStorage.getItem("fearLevel")) || 3;
	const intensity = Math.floor(Math.random() * 10);
	const heartRate = simulateHeartRate(fearLevel, intensity);

	window.currentBPM = heartRate;
	fetch("http://localhost:5000/heart-rate", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			uid,
			heartRate,
			intensity,
		}),
	});
}, 10000);
