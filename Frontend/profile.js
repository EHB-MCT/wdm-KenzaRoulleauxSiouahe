const tabButtons = document.querySelectorAll(".tab-btn");
const sections = document.querySelectorAll(".movies-section");
const email = localStorage.getItem("loggedUser");

if (!email) {
	window.location.href = "login.html";
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
		const res = await fetch(`http://localhost:5000/profile?email=${encodeURIComponent(email)}`);
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
