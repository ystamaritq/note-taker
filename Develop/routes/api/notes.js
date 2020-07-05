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
	let id = uuid.v4();
	let title = req.body.title;
	let text = req.body.text;

	let note = {
		id,
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

/* 
- receive a query parameter containing the id of note to delete. 
- read all notes from the db.json file.
- remove the note with the given id property.
- and then rewrite the notes to the db.json file.
*/
router.delete("/:id", (req, res) => {
	// read the db.json
	fs.readFile(dataPath, (err, data) => {
		if (err) throw err;
		let notes = JSON.parse(data);

		// see if the note with that id exists on the json file
		const noteExists = notes.some((note) => note.id === req.params.id);

		// filter the notes that match with that id
		if (noteExists) {
			notes = notes.filter((note) => note.id !== req.params.id);
			// write the db.json
			fs.writeFile(dataPath, JSON.stringify(notes), function (err) {
				if (err) throw err;
				// response the new json
				res.json(notes);
			});
		} else {
			res.status(400).json({ msg: `Not note with the id of ${req.params.id}` });
		}
	});
});

module.exports = router;
