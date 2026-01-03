const role = localStorage.getItem("role");

if (role !== "admin") {
	alert("Access denied");
	location.href = "login.html";
}
