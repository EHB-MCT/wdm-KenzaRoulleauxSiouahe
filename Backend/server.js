const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
	res.send("Backend is working");
});

app.post("/register", (req, res) => {
	const {username, password} = req.body;
	console.log("Received:", username, password);
	res.json({message: "Register request received!"});
});

const PORT = 5000;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
