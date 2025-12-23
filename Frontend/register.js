const registerBtn = document.getElementById("registerBtn");

registerBtn.addEventListener("click", async () => {
	const username = document.getElementById("username").value;
	const password = document.getElementById("password").value;

	if (!username || !password) {
		alert("Please fill in all fields");
		return;
	}

	try {
		const res = await fetch("http://localhost:5000/register", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ username, password }),
		});

		const data = await res.json();

		if (!res.ok) {
			alert(data.message);
			return;
		}

		alert(data.message);
		window.location.href = `profile-setup.html?username=${encodeURIComponent(username)}`;
	} catch (error) {
		console.error("Error:", error);
		alert("Could not reach backend");
	}
});
