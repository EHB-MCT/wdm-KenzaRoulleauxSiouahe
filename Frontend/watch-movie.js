const canvas = document.getElementById("heartRateCanvas");
const ctx = canvas.getContext("2d");

canvas.width = canvas.offsetWidth;
canvas.height = 160;

const movieId = localStorage.getItem("currentMovie");
const uid = localStorage.getItem("uid");
const bpmDisplay = document.getElementById("bpmLabel");

async function loadMovieInfo() {
	const res = await fetch(`http://localhost:5000/movies/${movieId}`);
	const movie = await res.json();

	document.getElementById("nowWatching").textContent = `Now watching: ${movie.Title}`;

	document.getElementById("watchPoster").src = `http://localhost:5000${movie.Poster}`;
}

loadMovieInfo();

let x = 0;
let paused = false;
let lastSpikeTime = 0;

function drawECG() {
	if (paused) return;

	const now = Date.now();
	const bpm = window.currentBPM || 70;
	const msPerBeat = 60000 / bpm;

	// Style BPM stroke
	ctx.strokeStyle = "#ffffff";
	ctx.lineWidth = 2;

	//Draw baseline with some tiny noise
	ctx.beginPath();
	ctx.moveTo(x, canvas.height / 2);
	ctx.lineTo(x + 2, canvas.height / 2 + (Math.random() * 2 - 1));
	ctx.stroke();

	// Draw spike at exact beat
	if (now - lastSpikeTime > msPerBeat) {
		lastSpikeTime = now;

		const spikeHeight = 40 + Math.random() * 15;
		ctx.beginPath();
		ctx.moveTo(x, canvas.height / 2);
		ctx.lineTo(x + 2, canvas.height / 2 - spikeHeight);
		ctx.lineTo(x + 4, canvas.height / 2 + spikeHeight / 2);
		ctx.lineTo(x + 6, canvas.height / 2);
		ctx.stroke();
	}

	//Makes the line move right
	x += 2;
	if (x > canvas.width) {
		x = 0;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}
}

// Update BPM display
setInterval(() => {
	if (!bpmDisplay || !window.currentBPM) return;
	bpmDisplay.textContent = `${Math.round(window.currentBPM)} BPM`;
}, 1000);

const interval = setInterval(drawECG, 20);

document.getElementById("pauseBtn").addEventListener("click", () => {
	paused = !paused;
	document.getElementById("pauseBtn").textContent = paused ? "Resume" : "Pause";
});

document.getElementById("finishBtn").addEventListener("click", async () => {
	globalThis.location.href = "profile.html";
});
document.getElementById("stopBtn").addEventListener("click", async () => {
	clearInterval(interval);
	globalThis.location.href = "profile.html";
});
