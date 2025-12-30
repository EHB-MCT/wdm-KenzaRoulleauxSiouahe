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
		try {
			const uid = localStorage.getItem("uid");
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
				const img = document.createElement("img");
				img.src = `http://localhost:5000/posters/${movie.movieId}.jpg`;
				img.classList.add("watchlist-poster");

				img.addEventListener("click", () => {
					window.location.href = `movie-detail.html?id=${movie.movieId}`;
				});
				container.appendChild(img);
			});
		} catch (err) {
			console.error("Watchlist error:", err);
		}
	}
	loadWatchList();
});
