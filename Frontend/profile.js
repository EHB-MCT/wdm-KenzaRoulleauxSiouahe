const tabButtons = document.querySelectorAll(".tab-btn");
const sections = document.querySelectorAll(".movies-section");
const email = localStorage.getItem("loggedUser");


tabButtons.forEach((btn) => {
	btn.addEventListener("click", () => {
		
		tabButtons.forEach((b) => b.classList.remove("active"));
		sections.forEach((s) => s.classList.remove("active"));

		
		btn.classList.add("active");
		document.getElementById(btn.dataset.tab).classList.add("active");
	});
});

if (!email) {
	window.location.href = "login.html";
}

async function loadProfile() {
	try {
		const res = await fetch(
			`http://localhost:5000/profile?email=${encodeURIComponent (email)}`
		);
		if (!res.ok){
			throw new Error ("Failed to fetch profile");
		}
		const user = await res.json();

		document.querySelector(".username").textContent = 
		user.displayName || "Unnamed user";

	} catch(Error){
		console.error("Profile load error: Error");
	}
}
loadProfile();