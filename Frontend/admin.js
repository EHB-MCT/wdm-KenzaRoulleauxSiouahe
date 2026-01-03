document.addEventListener("DOMContentLoaded", async () => {
	const role = localStorage.getItem("role");

	if (role !== "admin") {
		alert("Access denied");
		location.href = "login.html";
	}

	const logoutBtn = document.getElementById("logoutBtn");
	if (logoutBtn) {
		logoutBtn.addEventListener("click", () => {
			localStorage.clear();
			location.href = "login.html";
		});
	}

	const usersContainer = document.getElementById("usersContainer");
	if (!usersContainer) return console.error("No container for users");

	async function loadUsers() {
		try {
			const res = await fetch("http://localhost:5000/admin/users");
			if (!res.ok) throw new Error("Failed to fetch users");

			const users = await res.json();
			usersContainer.innerHTML = ""; // Clear container

			users.forEach((u) => {
				const card = document.createElement("div");
				card.classList.add("admin-user-card");

				card.innerHTML = `
          <div class="card-header">
            <h3>${u.displayName || "Unnamed"}</h3>
            <p>${u.email}</p>
            <button class="toggle-details-btn">Show Details</button>
          </div>
          <div class="card-details" style="display:none;">
            <p><strong>Favorite Genres:</strong> ${u.favoriteGenres?.join(", ") || "None"}</p>
            <p><strong>Watchlist:</strong> ${u.watchlist?.map((m) => m.title).join(", ") || "Empty"}</p>
            <p><strong>Watched Movies:</strong> ${u.watched?.map((m) => m.title).join(", ") || "None"}</p>
            <p><strong>Events:</strong> ${u.events?.map((e) => e.type).join(", ") || "No events"}</p>
            <p><strong>Heart Rates:</strong> ${u.heartRates?.map((h) => h.data.heartRate).join(", ") || "None"}</p>
          </div>
        `;

				const toggleBtn = card.querySelector(".toggle-details-btn");
				const detailsDiv = card.querySelector(".card-details");
				toggleBtn.addEventListener("click", () => {
					if (detailsDiv.style.display === "none") {
						detailsDiv.style.display = "block";
						toggleBtn.textContent = "Hide Details";
					} else {
						detailsDiv.style.display = "none";
						toggleBtn.textContent = "Show Details";
					}
				});

				usersContainer.appendChild(card);
			});
		} catch (err) {
			console.error("Error loading users:", err);
			if (usersContainer) usersContainer.textContent = "Error loading users";
		}
	}

	loadUsers();
});
