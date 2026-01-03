const role = localStorage.getItem("role");

if (role !== "admin") {
	alert("Access denied");
	location.href = "login.html";
}

document.getElementById("logoutBtn").addEventListener("click", () => {
	localStorage.clear();
	location.href = "login.html";
});

document.addEventListener("DOMContentLoaded", () => {
	const usersContainer = document.getElementById("usersContainer");

	async function loadUsers() {
		try {
			const res = await fetch("http://localhost:5000/admin/users");
			const users = await res.json();

			usersContainer.innerHTML = "";
			users.forEach((u) => {
				const div = document.createElement("div");
				div.classList.add("user-card");
				div.innerHTML = `
        <h3>${u.displayName || "Unnamed"} (${u.email})</h3>
        <p>Favorite Genres: ${u.favoriteGenres?.join(", ") || "None"}</p>
        <p>Watchlist: ${u.watchlist?.map((m) => m.title).join(", ") || "Empty"}</p>
        <p>Watched Movies: ${u.watched?.map((m) => m.title).join(", ") || "None"}</p>
      `;
				usersContainer.appendChild(div);
			});
		} catch (err) {
			usersContainer.textContent = "Error loading users";
			console.error(err);
		}
	}

	loadUsers();
});
