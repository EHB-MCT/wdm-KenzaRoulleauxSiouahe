const express = require("express");
const cors = require("cors");

const { MongoClient, ServerApiVersion } = require("mongodb");
const { username, password, cluster, dbName } = require("./config");

const multer = require("multer");
const path = require("path");

const { randomUUID } = require("node:crypto");

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

const storage = multer.diskStorage({
	destination: (req, file, cb) => cb(null, path.join(__dirname, "public/avatars")),
	filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const public = multer({ storage });

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

app.use("/posters", express.static(path.join(__dirname, "public/posters")));
app.use("/avatars", express.static(path.join(__dirname, "public/avatars")));
app.use("/public", express.static(path.join(__dirname, "public")));

//Test route
app.get("/", (req, res) => {
	res.send("Backend is working");
});

//Register route
app.post("/register", async (req, res) => {
	const { email, password } = req.body;
	console.log("Received:", email, password);
	if (!usersCollection) {
		return res.status(500).json({ message: "Database not connected yet" });
	}
	if (!email.includes("@")) {
		return res.status(400).json({ message: "Invalid email" });
	}
	const existingUser = await usersCollection.findOne({ email });

	if (existingUser) {
		return res.status(400).json({ message: "Email already exists. Try another." });
	}
	const uid = randomUUID();

	await usersCollection.insertOne({
		uid,
		email,
		password,

		displayName: "",
		fearLevel: null,
		favoriteGenres: [],
		avatar: null,

		watchlist: [],
		watched: [],

		createdAt: new Date(),
	});
	res.json({ message: "User registered successfully!", uid });
});

//Profile-setup route
app.post("/profile-setup", public.single("avatar"), async (req, res) => {
	const { email, displayName, fearLevel, favoriteGenres } = req.body;
	const avatarPath = req.file ? `/avatars/${req.file.filename}` : null;

	if (!usersCollection) {
		return res.status(500).json({ message: "Database not connected" });
	}

	await usersCollection.updateOne(
		{ email },
		{
			$set: {
				displayName,
				fearLevel,
				favoriteGenres: JSON.parse(favoriteGenres),
				avatar: avatarPath,
			},
		}
	);

	res.json({ message: "Profile setup completed" });
});

//Login route
app.post("/login", async (req, res) => {
	const { email, password } = req.body;
	if (!usersCollection) {
		return res.status(500).json({ message: "Database not connected yet" });
	}
	if (!email || !password) {
		return res.status(400).json({ message: "Please provide username and password." });
	}

	//Find user in DB
	const user = await usersCollection.findOne({ email });

	//Check user
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
					Title: { $regex: "^" + searchQuery, $options: "i" },
				})
				.toArray();
		}

		res.json(movies);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error" });
	}
});

//Get profile info
app.get("/profile", async (req, res) => {
	const { uid } = req.query;

	if (!usersCollection) {
		return res.status(500).json({ message: "Database not connected" });
	}
	const user = await usersCollection.findOne({ uid }, { projection: { password: 0 } });
	if (!user) {
		return res.status(404).json({ message: "User not found" });
	}
	res.json(user);
});

//Event route (user behaviour)
app.post("/event", async (req, res) => {
	const { uid, type, data } = req.body;

	if (!uid || !type) {
		return res.status(400).json({ message: "Missing data" });
	}

	const event = {
		uid,
		type,
		data,
		timeStamp: new Date().toLocaleString("en-GB", {timeZone: "Europe/Brussels"}),
	};

	await client.db(dbName).collection("events").insertOne(event);

	res.json({ message: "Event stored" });
});
const PORT = 5000;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
