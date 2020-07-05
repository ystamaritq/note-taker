const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
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

module.exports = router;
