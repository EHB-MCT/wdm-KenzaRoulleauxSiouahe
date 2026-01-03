const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", async () => {
	const email = document.getElementById("username").value;
	const password = document.getElementById("password").value;
	const adminCodeValue = document.getElementById("adminCode").value || null;

	try {
		const res = await fetch("http://localhost:5000/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password, adminCode: adminCodeValue }),
		});
		const data = await res.json();

		if (!res.ok) {
			alert(data.message);
			return;
		}

		localStorage.clear();

		localStorage.setItem("uid", data.uid);
		localStorage.setItem("loggedUser", email);
		localStorage.setItem("role", data.role || "user");

		if (data.role == "admin") {
			location.href = "admin.html";
		} else {
			location.href = "movie.html";
		}
	} catch (error) {
		console.error("Error:", error);
		alert("Could not reach backend");
	}
});
