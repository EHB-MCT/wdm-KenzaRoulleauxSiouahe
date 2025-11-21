const heartBtn = document.getElementById("heartBtn");
let tracking = false;

heartBtn.addEventListener("click", () => {
	if (!tracking) {
		console.log("Starting the heart rate measure");
		heartBtn.textContent = "Stop Heart Rate Tracking";
		tracking = true;
	} else {
		console.log("Stopping the heart rate measure");
		heartBtn.textContent = "Start Heart Rate Tracking";
		tracking = false;
	}
});
