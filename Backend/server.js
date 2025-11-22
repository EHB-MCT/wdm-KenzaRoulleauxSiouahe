const express = require("express");
const cors = require("cors");

const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = "mongodb+srv://kenzaroulleauxsiouahe_db_user:Mc5mMTyPm2XtKcFF@heartappcluster.skpvnfq.mongodb.net/?appName=HeartAppcluster";

const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

async function run() {
	try {
		await client.connect();
		await client.db("admin").command({ ping: 1 });
		console.log("Pinged your deployment. You successfully connected to MongoDB!");
	} finally {
		await client.close();
	}
}
run().catch(console.dir);

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Backend is working");
});

app.post("/register", (req, res) => {
	const { username, password } = req.body;
	console.log("Received:", username, password);
	res.json({ message: "Register request received!" });
});

const PORT = 5000;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
