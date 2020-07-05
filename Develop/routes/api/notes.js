const express = require("express");
const router = express.Router();
const path = require("path");
// to read , write from db.json
const fs = require("fs");
// get a unique id
const uuid = require("uuid");
// path to data file
const dataPath = path.join(__dirname, "./../../db/db.json");

/* read the `db.json` file and return all saved notes as JSON. */
router.get("/", function (req, res) {
	//read the db.json
	fs.readFile(dataPath, (err, data) => {
		if (err) throw err;
		let notes = JSON.parse(data);
		res.json(notes);
	});
});

/* 
- should receive a new note to save on the request body. 
- add it to the `db.json` file. 
- and then return the new note to the client. 
*/
router.post("/", (req, res) => {
	let title = req.body.title;
	let text = req.body.text;

	let note = {
		title,
		text,
	};

	//read the db.json
	fs.readFile(dataPath, (err, data) => {
		if (err) throw err;
		let notes = JSON.parse(data);
		notes.push(note);

		//write the db.json
		fs.writeFile(dataPath, JSON.stringify(notes), function (err) {
			if (err) throw err;
		});

		res.json(note);
	});
});

module.exports = router;
