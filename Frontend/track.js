const uid = localStorage.getItem("uid");
const pageStartTime = Date.now();

if (uid) {
	/*Page view tracking*/
	fetch("http://localhost:5000/event", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			uid,
			type: "page_view",
			data: {
				page: globalThis.location.pathname,
			},
		}),
	});

	/*Click tracking*/
	document.addEventListener("click", (e) => {
		const target = e.target;
		fetch("http://localhost:5000/event", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				uid,
				type: "click",
				data: {
					tag: target.tagName,
					id: target.id || null,
					classes: target.className || null,
					text: target.innerText || null,
				},
			}),
		});
	});

	/*Time spent tracking*/
	globalThis.addEventListener("beforeunload", () => {
		const timeSpentMs = Date.now() - pageStartTime;
		const timeSpentS = Math.round(timeSpentMs / 1000);

		fetch("http://localhost:5000/event", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				uid: localStorage.getItem("uid"),
				type: "time_on_page",
				data: {
					page: globalThis.location.pathname,
					timeSpentS,
				},
			}),
		});
	});
}
