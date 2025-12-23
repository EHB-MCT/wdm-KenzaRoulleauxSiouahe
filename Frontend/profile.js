const tabButtons = document.querySelectorAll(".tab-btn");
const sections = document.querySelectorAll(".movies-section");

tabButtons.forEach((btn) => {
	btn.addEventListener("click", () => {
		
		tabButtons.forEach((b) => b.classList.remove("active"));
		sections.forEach((s) => s.classList.remove("active"));

		
		btn.classList.add("active");
		document.getElementById(btn.dataset.tab).classList.add("active");
	});
});
