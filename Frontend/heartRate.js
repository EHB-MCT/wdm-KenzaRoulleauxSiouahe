function simulateHeartRate(fearLevel, intensity = 0) {
	const baseHR = 70;
	const fearModifier = fearLevel * 5;
	const genreModifier = intensity;
	const randomNoise = Math.floor(Math.random() * 5);

	return baseHR + fearModifier + genreModifier + randomNoise;
}

setInterval(() => {
	const uid = localStorage.getItem("uid");
	if (!uid) return;

	const fearLevel = Number.parseInt(localStorage.getItem("fearLevel")) || 3;
	const intensity = Math.floor(Math.random() * 10);
	const heartRate = simulateHeartRate(fearLevel, intensity);

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
