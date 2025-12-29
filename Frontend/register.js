const registerBtn = document.getElementById("registerBtn");

registerBtn.addEventListener("click", async () => {
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;

	if (!email || !password) {
		alert("Please fill in all fields");
		return;
	}
	if (!email.includes("@")) {
		alert("Please enter a valid email address");
		return;
	}
	try {
		const res = await fetch("http://localhost:5000/register", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password }),
		});

		const data = await res.json();

		if (!res.ok) {
			alert(data.message);
			return;
		}

		localStorage.setItem("uid", data.uid);
		localStorage.setItem("email", data.email);
		globalThis.location.href = "profile-setup.html";
	} catch (error) {
		console.error("Error:", error);
		alert("Could not reach backend");
	}
});
