const uid = localStorage.getItem("uid");

if (uid) {
    fetch("http://localhost:5000/event", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            uid,
            type: "page_view",
            data: {
                page: globalThis/location.pathname,
            },
        }),
    });
}