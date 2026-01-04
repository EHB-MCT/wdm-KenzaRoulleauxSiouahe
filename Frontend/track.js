window.uid = localStorage.getItem("uid");
const pageStartTime = Date.now();

if (uid) {
	/*Page view tracking*/
	fetch("http://localhost:5000/event", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			uid,
			type: "page_view",
			data: { page: globalThis.location.pathname },
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

		//Watchlist actions tracking
		if (target.matches(".add-watchlist-btn")) {
			const movieId = target.dataset.id;
			const movieTitle = target.dataset.title;
			fetch("http://localhost:5000/event", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					uid,
					type: "add_watchlist",
					data: { movieId, movieTitle },
				}),
			});
		}

		if (target.matches(".remove-watchlist-btn")) {
			const movieId = target.dataset.id;
			const movieTitle = target.dataset.title;
			fetch("http://localhost:5000/event", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					uid,
					type: "remove_watchlist",
					data: { movieId, movieTitle },
				}),
			});
		}
	});

	// Mouse hover tracking
	document.addEventListener("mouseover", (e) => {
		const target = e.target;
		fetch("http://localhost:5000/event", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				uid,
				type: "hover",
				data: {
					tag: target.tagName,
					id: target.id || null,
					classes: target.className || null,
					text: target.innerText || null,
				},
			}),
		});
	});

	// Form submition tracking
	document.querySelectorAll("form").forEach((form) => {
		form.addEventListener("submit", (e) => {
			const formData = new FormData(form);
			const formEntries = Object.fromEntries(formData.entries());

			fetch("http://localhost:5000/event", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					uid,
					type: "form_submit",
					data: {
						formId: form.id || null,
						values: formEntries,
					},
				}),
			});
		});
	});

	//Time spent on pages tracking
	globalThis.addEventListener("beforeunload", () => {
		const timeSpentMs = Date.now() - pageStartTime;
		const timeSpentS = Math.round(timeSpentMs / 1000);

		fetch("http://localhost:5000/event", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				uid,
				type: "time_on_page",
				data: {
					page: globalThis.location.pathname,
					timeSpentS,
				},
			}),
		});
	});

	//System, evironement tracking
	fetch("http://localhost:5000/event", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			uid,
			type: "system_info",
			data: {
				userAgent: navigator.userAgent,
				screen: `${screen.width}x${screen.height}`,
				language: navigator.language,
				timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
			},
		}),
	});

	//Heartrate, fearintensity tracking
	window.trackHeartRate = (hr, movieId, intensity = null) => {
		fetch("http://localhost:5000/event", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				uid,
				type: "heart_rate",
				data: { hr, movieId, intensity },
			}),
		});
	};
}
