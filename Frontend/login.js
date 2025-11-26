const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", async () => {
	const username = document.getElementById("username").value;
	const password = document.getElementById("password").value;

	try {
		const res = await fetch("http://localhost:5000/login", {
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
        window.location.href = "main.html";
	} catch (error) {
		console.error("Error:", error);
		alert("Could not reach backend");
	}
});
