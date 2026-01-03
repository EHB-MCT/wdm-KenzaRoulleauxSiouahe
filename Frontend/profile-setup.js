const saveProfileBtn = document.getElementById("saveProfileBtn");
const loggedUser = localStorage.getItem("loggedUser");
const uid = localStorage.getItem("uid");

if (!loggedUser || !uid) {
	alert("You must be logged in first");
	globalThis.location.href = "login.html";
}

saveProfileBtn.addEventListener("click", async () => {
	const displayName = document.getElementById("displayName").value;
	const fearLevel = document.getElementById("fearLevel").value;
	const avatarFile = document.getElementById("avatar").files[0];

	const selectedGenres = Array.from(document.querySelectorAll(".genres input:checked")).map((el) => el.value);

	if (!displayName) {
		alert("Please choose a display name");
		return;
	}

	const formData = new FormData();
	formData.append("uid", uid);
	formData.append("displayName", displayName);
	formData.append("fearLevel", fearLevel);
	formData.append("favoriteGenres", JSON.stringify(selectedGenres));
	formData.append("avatar", avatarFile);

	try {
		const res = await fetch("http://localhost:5000/profile-setup", {
			method: "POST",
			body: formData,
		});

		const data = await res.json();
		if (!res.ok) {
			alert(data.message);
			return;
		}

		globalThis.location.href = "movie.html";
	} catch (err) {
		console.error(err);
		alert("Could not save profile");
	}
});
