const express = require("express");
const cors = require("cors");

const { MongoClient, ServerApiVersion } = require("mongodb");
const { username, password, cluster, dbName } = require("./config");

const multer = require("multer");
const path = require("node:path");

const { randomUUID } = require("node:crypto");
const { timeStamp } = require("node:console");
const { ObjectId } = require("mongodb");

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
let watchlistCollection;

//Connection to DB
async function run() {
	try {
		await client.connect();
		console.log("Connected to MongoDB!");

		const db = client.db(dbName);
		usersCollection = db.collection("users");
		moviesCollection = db.collection("movies");
		watchlistCollection = db.collection("watchlists");
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
	try {
		const { uid, displayName, fearLevel, favoriteGenres } = req.body;
		const avatarPath = req.file ? `/avatars/${req.file.filename}` : null;

		if (!usersCollection) {
			return res.status(500).json({ message: "Database not connected" });
		}

		const result = await usersCollection.updateOne(
			{ uid },
			{
				$set: {
					displayName,
					fearLevel: Number(fearLevel),
					favoriteGenres: JSON.parse(favoriteGenres),
					...(avatarPath && { avatar: avatarPath }),
				},
			}
		);

		if (result.matchedCount === 0) {
			return res.status(404).json({ message: "User not found" });
		}

		res.json({ message: "Profile setup completed" });
	} catch (err) {
		console.error("Profile setup error:", err);
		res.status(500).json({ message: "Server error" });
	}
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

//Fetch multiple movies route
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

//Fetch One movie route
app.get("/movies/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const { ObjectId } = require("mongodb");
		const movie = await moviesCollection.findOne({ _id: new ObjectId(id) });
		if (!movie) return res.status(404).json({ message: "Movie not found" });
		res.json(movie);
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
		timeStamp: new Date().toLocaleString("en-GB", { timeZone: "Europe/Brussels" }),
	};

	await client.db(dbName).collection("events").insertOne(event);

	res.json({ message: "Event stored" });
});

//Heart rate route
app.post("/heart-rate", async (req, res) => {
	try {
		const { uid, heartRate, intensity, movieId } = req.body;

		if (!uid || !heartRate) {
			return res.status(400).json({ message: "Missing heart rate data" });
		}

		await client
			.db(dbName)
			.collection("heartRates")
			.insertOne({
				uid,
				type: "heart_rate",
				data: {
					heartRate,
					intensity,
					movieId,
				},
				timeStamp: new Date().toLocaleString("en-GB", { timeZone: "Europe/Brussels" }),
			});

		res.json({ message: "Heart rate recorded" });
	} catch (err) {
		console.error("Heart rate error:", err);
		res.status(500).json({ message: "Server error" });
	}
});
app.get("/heart-rate/movie", async (req, res) => {
	const { uid, movieId } = req.query;
	if (!uid || !movieId) return res.status(400).json({ message: "Missing uid or movieId" });

	try {
		const readings = await client.db(dbName).collection("heartRates").find({ uid, "data.movieId": movieId }).sort({ timeStamp: 1 }).toArray();

		res.json(readings);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error" });
	}
});
//Post movies to the watchlist
app.post("/watchlist", async (req, res) => {
	const { uid, movieId, title } = req.body;
	if (!uid || !movieId) return res.status(400).json({ message: "Missing data" });

	try {
		const user = await usersCollection.findOne({ uid });
		if (!user) return res.status(404).json({ message: "User not found" });

		// Prevent duplicates
		const alreadyAdded = user.watchlist?.some((m) => m.movieId === movieId);
		if (alreadyAdded) return res.status(400).json({ message: "Already in watchlist" });

		const { ObjectId } = require("mongodb");
		const movie = await moviesCollection.findOne({ _id: new ObjectId(movieId) });
		if (!movie) return res.status(404).json({ message: "Movie not found" });
		await usersCollection.updateOne({ uid }, { $push: { watchlist: { movieId, title, Poster: movie.Poster, addedAt: new Date() } } });

		res.json({ message: "Movie added to Want to Watch" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Could not add movie" });
	}
});

//Get movies to the watchlist
app.get("/watchlist", async (req, res) => {
	const { uid, poster } = req.query;
	if (!uid) return res.status(400).json({ message: "Missing uid" });

	try {
		const user = await usersCollection.findOne({ uid, poster });
		if (!user) return res.status(400).json({ message: "User not found" });

		res.json(user.watchlist || []);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Could not load watchlist" });
	}
});
//Delete  movies in the watchlist
app.delete("/watchlist", async (req, res) => {
	const { uid, movieId } = req.query;
	if (!uid || !movieId) {
		return res.status(400).json({ message: "Missing data" });
	}

	try {
		await usersCollection.updateOne({ uid }, { $pull: { watchlist: { movieId } } });
		res.json({ message: "Movie removed from watchlist" });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Could not remove movie" });
	}
});

app.post("/watched", async (req, res) => {
	try {
		const { uid, movieId, scaryScore, watchedAt } = req.body;

		if (!uid || !movieId || !scaryScore) {
			return res.status(400).json({ message: "Missing data" });
		}

		// Find the movie in movies collection
		const movieData = await moviesCollection.findOne({ _id: new ObjectId(movieId) });
		if (!movieData) return res.status(404).json({ message: "Movie not found" });

		// Insert into watched collection
		await client
			.db(dbName)
			.collection("watched")
			.insertOne({
				uid,
				movieId,
				poster: movieData.Poster,
				title: movieData.Title,
				scaryScore,
				watchedAt: watchedAt || new Date().toLocaleString("en-GB", { timeZone: "Europe/Brussels" }),
			});

		res.json({ message: "Movie added to watched" });
	} catch (err) {
		console.error("POST /watched error:", err);
		res.status(500).json({ message: "Server error" });
	}
});

app.get("/watched", async (req, res) => {
	try {
		const { uid } = req.query;
		if (!uid) return res.status(400).json({ message: "Missing uid" });

		const watchedMovies = await client.db(dbName).collection("watched").find({ uid }).sort({ watchedAt: -1 }).toArray();

		res.json(watchedMovies);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Could not add to watched" });
	}
});
const PORT = 5000;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
