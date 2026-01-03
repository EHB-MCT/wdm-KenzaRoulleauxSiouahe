const role = localStorage.getItem("role");

if (role !== "admin") {
	alert("Access denied");
	location.href = "login.html";
}

document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.clear();
    location.href = "login.html";
});