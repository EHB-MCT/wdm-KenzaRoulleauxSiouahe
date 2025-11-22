const registerBtn = document.getElementById("registerBtn");

registerBtn.addEventListener("click", async () =>{
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try{
        const res = await fetch("http://localhost:5000/register", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username, password})
        });
        if (!res.ok){
            alert("Failed to connect to server!")
            return;
        }

        const data = await res.json();
        alert(data.message);
    }
    catch (error) {
        console.error("Error:", error);
        alert("Could not reach backend")
    }
})
