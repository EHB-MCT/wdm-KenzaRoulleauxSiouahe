document.addEventListener("DOMContentLoaded", () => {
	const tabButtons = document.querySelectorAll(".tab-btn");
	const sections = document.querySelectorAll(".movies-section");
	const email = localStorage.getItem("loggedUser");

	if (!email) {
		globalThis.location.href = "login.html";
	}

	tabButtons.forEach((btn) => {
		btn.addEventListener("click", () => {
			tabButtons.forEach((b) => b.classList.remove("active"));
			sections.forEach((s) => s.classList.remove("active"));

			btn.classList.add("active");
			document.getElementById(btn.dataset.tab).classList.add("active");
		});
	});

	async function loadProfile() {
		try {
			const res = await fetch(`http://localhost:5000/profile?uid=${localStorage.getItem("uid")}`);
			if (!res.ok) {
				throw new Error("Failed to fetch profile");
			}
			const user = await res.json();

			document.querySelector(".username").textContent = user.displayName || "Unnamed user";

			if (user.avatar) {
				document.querySelector(".profile-pic").src = `http://localhost:5000${user.avatar}`;
			} else {
				document.querySelector(".profile-pic").src = "http://localhost:5000/avatars/default-avatar.jpg";
			}
		} catch (error) {
			console.error("Profile load error:", error);
		}
	}
	loadProfile();

	async function loadWatchList() {
		const uid = localStorage.getItem("uid");
		if (!uid) return;

		try {
			const res = await fetch(`http://localhost:5000/watchlist?uid=${uid}`);
			if (!res.ok) throw new Error("Failed to load watchlist");

			const watchlist = await res.json();
			const container = document.getElementById("toWatchList");
			container.innerHTML = "";

			if (watchlist.length === 0) {
				container.innerHTML = "<p>No movies in your watchlist yet.</p>";
				return;
			}
			watchlist.forEach((movie) => {
				const item = document.createElement("div");
				item.classList.add("movie-card");

				item.innerHTML = `
			<h4> ${movie.title}</h4>
			<button class= "start-movie-btn" data-id="${movie.movieId}">
			Start Watching
			</button>
			`;
				container.appendChild(item);
			});
		} catch (err) {
			console.error("Watchlist error:", err);
		}
	}
	loadWatchList();
});
