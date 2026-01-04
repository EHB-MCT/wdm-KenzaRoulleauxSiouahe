document.addEventListener("DOMContentLoaded", async () => {
	const role = localStorage.getItem("role");

	if (role !== "admin") {
		alert("Access denied");
		location.href = "login.html";
		return;
	}

	const logoutBtn = document.getElementById("logoutBtn");
	if (logoutBtn) {
		logoutBtn.addEventListener("click", () => {
			localStorage.clear();
			location.href = "login.html";
		});
	}

	const usersContainer = document.getElementById("usersContainer");
	if (!usersContainer) {
		console.error("No container for users");
		return;
	}

	function groupEvents(events = []) {
		return {
			pageViews: events.filter((e) => e.type === "page_view"),
			clicks: events.filter((e) => e.type === "click"),
			timeOnPage: events.filter((e) => e.type === "time_on_page"),
		};
	}

	function summarizePages(pageViews) {
		const pages = {};
		pageViews.forEach((e) => {
			const page = e.data?.page;
			if (!page) return;
			pages[page] = (pages[page] || 0) + 1;
		});
		return pages;
	}

	function totalTime(timeEvents) {
		return timeEvents.reduce((sum, e) => sum + (e.data?.timeSpentS || 0), 0);
	}

	function summarizeClicks(clicks) {
		const targets = {};
		clicks.forEach((e) => {
			const key = e.data?.id || e.data?.tag || "unknown";
			targets[key] = (targets[key] || 0) + 1;
		});
		return Object.entries(targets)
			.sort((a, b) => b[1] - a[1])
			.slice(0, 5);
	}

	async function loadUsers() {
		try {
			const res = await fetch("http://localhost:5000/admin/users");
			if (!res.ok) throw new Error("Failed to fetch users");

			const users = await res.json();
			usersContainer.innerHTML = "";

			users.forEach((u) => {
				const grouped = groupEvents(u.events);
				const pageStats = summarizePages(grouped.pageViews);
				const totalSeconds = totalTime(grouped.timeOnPage);
				const topClicks = summarizeClicks(grouped.clicks);

				const card = document.createElement("div");
				card.className = "admin-user-card";

				card.innerHTML = `
          <div class="card-header">
            <h3>${u.displayName || "Unnamed user"}</h3>
            <p>${u.email}</p>
            <button class="toggle-details-btn">Show Details</button>
          </div>

          <div class="card-details" style="display:none;">
            <h4>Profile</h4>
            <p><strong>UID:</strong> ${u.uid}</p>
            <p><strong>Favorite genres:</strong> ${u.favoriteGenres?.join(", ") || "None"}</p>

            <h4>Friends</h4>
            <p><strong>Friends:</strong> ${u.friends?.map((f) => f.displayName).join(", ") || "No friends"}</p>

            <h4>Movies</h4>
            <p><strong>Watchlist:</strong> ${u.watchlist?.length || 0}</p>
            <p><strong>Watched:</strong> ${u.watched?.length || 0}</p>

            <h4>Behavior summary</h4>
            <p><strong>Page views:</strong> ${grouped.pageViews.length}</p>
            <p><strong>Clicks:</strong> ${grouped.clicks.length}</p>
            <p><strong>Total time spent:</strong> ${(totalSeconds / 60).toFixed(1)} minutes</p>

            <h4>Most visited pages</h4>
            <ul>
              ${
								Object.keys(pageStats).length
									? Object.entries(pageStats)
											.map(([page, count]) => `<li>${page}: ${count}</li>`)
											.join("")
									: "<li>No data</li>"
							}
            </ul>

            <h4>Top clicked elements</h4>
            <ul>
              ${topClicks.length ? topClicks.map(([key, count]) => `<li>${key}: ${count}</li>`).join("") : "<li>No data</li>"}
            </ul>

            <button class="toggle-raw-btn">Show raw events</button>
            <pre class="raw-events" style="display:none;">${JSON.stringify(u.events, null, 2)}</pre>
          </div>
        `;

				const toggleDetailsBtn = card.querySelector(".toggle-details-btn");
				const detailsDiv = card.querySelector(".card-details");
				const toggleRawBtn = card.querySelector(".toggle-raw-btn");
				const rawEventsPre = card.querySelector(".raw-events");

				toggleDetailsBtn.onclick = () => {
					const open = detailsDiv.style.display === "block";
					detailsDiv.style.display = open ? "none" : "block";
					toggleDetailsBtn.textContent = open ? "Show Details" : "Hide Details";
				};

				toggleRawBtn.onclick = () => {
					const open = rawEventsPre.style.display === "block";
					rawEventsPre.style.display = open ? "none" : "block";
					toggleRawBtn.textContent = open ? "Show raw events" : "Hide raw events";
				};

				usersContainer.appendChild(card);
			});
		} catch (err) {
			console.error("Admin load error:", err);
			usersContainer.textContent = "Error loading admin data";
		}
	}

	loadUsers();
});
