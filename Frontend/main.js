const heartBtn = document.getElementById("heartBtn");
let tracking = false;
let startTime = null;

heartBtn.addEventListener("click", () => {
	if (!tracking) {
		startTime = new Date();
		console.log("Starting the heart rate measure at:", startTime.toLocaleTimeString());
		heartBtn.textContent = "Stop Heart Rate Tracking";
		tracking = true;
	} else {
		const endTime = new Date();
		console.log("Stopping the heart rate measure at:", endTime.toLocaleTimeString());
		console.log("Tracking duration:", ((endTime - startTime) / 1000).toFixed(2), "seconds");
		heartBtn.textContent = "Start Heart Rate Tracking";
		tracking = false;
	
	}
});
