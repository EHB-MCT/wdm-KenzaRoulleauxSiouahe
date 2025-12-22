const express = require("express");
const cors = require("cors");

const { MongoClient, ServerApiVersion } = require("mongodb");
const { username, password, cluster, dbName } = require("./config");

//Credentials
const uri = `mongodb+srv://${username}:${password}@${cluster}/${dbName}?retryWrites=true&w=majority&appName=${dbName}`;

//Create new MongoDB client
const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

let usersCollection;
let moviesCollection;

//Connection to DB
async function run() {
	try {
		await client.connect();
		console.log("Connected to MongoDB!");

		const db = client.db(dbName);
		usersCollection = db.collection("users");
		moviesCollection = db.collection("movies");
	} catch (err) {
		console.error("MongoDB connection error:", err);
	}
}
run();

const app = express();

app.use(cors());
app.use(express.json());

//Test route
app.get("/", (req, res) => {
	res.send("Backend is working");
});

//Register route
app.post("/register", async (req, res) => {
	const { username, password } = req.body;
	console.log("Received:", username, password);
	if (!usersCollection) {
		return res.status(500).json({ message: "Database not connected yet" });
	}
	const existingUser = await usersCollection.findOne({ username });

	if (existingUser) {
		return res.status(400).json({ message: "Username already exists. Try another." });
	}
	await usersCollection.insertOne({ username, password });

	res.json({ message: "User registered successfully!" });
});

//Login route
app.post("/login", async (req, res) => {
	const { username, password } = req.body;
	if (!usersCollection) {
		return res.status(500).json({ message: "Database not connected yet" });
	}
	if (!username || !password) {
		return res.status(400).json({ message: "Please provide username and password." });
	}

	//Find user in DB
	const user = await usersCollection.findOne({ username });

	if (!user) {
		return res.status(400).json({ message: "User not found" });
	}

	//Check password
	if (user.password !== password) {
		return res.status(400).json({ message: "Incorrect password" });
	}

	res.json({ message: "Login successful!" });
});

//Movies route
app.get("/movies", async (req, res) => {
	try {
		const searchQuery = req.query.q;

		if (!moviesCollection) {
			return res.status(500).json({ message: "Movies DB not connected" });
		}

		let movies;

		if (!searchQuery || searchQuery.trim() === "") {
			movies = await moviesCollection.find({}).sort({ Year: -1 }).limit(10).toArray();
		} else {
			movies = await moviesCollection
				.find({
					Title: { $regex: searchQuery, $options: "i" },
				})
				.toArray();
		}

		res.json(movies);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error" });
	}
});

const PORT = 5000;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
