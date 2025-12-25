const saveProfileBtn = document.getElementById("saveProfileBtn");
const loggedUser = localStorage.getItem("loggedUser");

if (!loggedUser) {
	window.location.href = "login.html";
}

saveProfileBtn.addEventListener("click", async () => {
	const displayName = document.getElementById("displayName").value;
	const fearLevel = document.getElementById("fearLevel").value;

	const selectedGenres = Array.from(document.querySelectorAll(".genres input:checked")).map((el) => el.value);

	if (!displayName) {
		alert("Please choose a display name");
		return;
	}

	try {
		const res = await fetch("http://localhost:5000/profile-setup", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email: loggedUser,
				displayName,
				fearLevel,
				favoriteGenres: selectedGenres,
			}),
		});

		const data = await res.json();
		if (!res.ok) {
			alert(data.message);
			return;
		}

		window.location.href = "movie.html";
	} catch (err) {
		console.error(err);
		alert("Could not save profile");
	}
});
