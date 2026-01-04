function logOut(){
    localStorage.removeItem("uid");
    localStorage.removeItem("loggedUser");
    localStorage.removeItem("role");

    location.href = "login.html";

}