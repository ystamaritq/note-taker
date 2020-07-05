const express = require("express");
const path = require("path");

// creating an express server
const app = express();

// set the initial port
const PORT = process.env.PORT || 8080;

//body Parser Middlware
app.use(express.json());

//handle url encoded data and forms
app.use(express.urlencoded({ extended: false }));

//setting the static folder
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "./public/index.html"));
});

// creating the notes.html route
app.use("/notes", require("./routes/html/notes"));

// if no matching route is found default to index.html
app.get("*", function (req, res) {
	res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, () =>
	console.log(`App listening at http://localhost:${PORT}`)
);
