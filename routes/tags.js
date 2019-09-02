const express = require("express");
const router = express.Router();
const db = require("../db");
const bodyParser = require("body-parser");

router.use(bodyParser.json());

/* Get method to fetch all tags */
router.get("/", (req, res, next) => {
  const sql = "Select * FROM tag";
  db.query(sql, function(err, rows, fields) {
    if (err) {
      res.status(500).send({ error: "The API sent back an error" });
    } else {
      res.json(rows);
    }
  });
});

/* Get method to fetch a single tag */
router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  const sql = `SELECT * FROM tag WHERE id = ${id}`;
  db.query(sql, function(err, row, fields) {
    if (err) {
      res.status(500).send({ error: "The API sent back an error" });
    } else if (row[0] === undefined) {
      res.status(404).send({ error: "Element not found." });
    } else {
      res.json(row[0]);
    }
  });
});

/* Post method to create a single tag */
router.post("/", (req, res, next) => {
  const name = req.body.name;
  const sql = `INSERT INTO tag (name) VALUES ("${name}")`;
  db.query(sql, function(err, result) {
    if (err) {
      res.status(500).send({ error: "The API returned an error" });
    } else {
      res.json({ status: true, id: result.insertId });
    }
  });
});

router.post("/link", (req, res, next) => {
  const post_id = req.body.post_id;
  const tag_id = req.body.tag_id;

  const sql = `INSERT INTO postTag (post_id, tag_id) VALUES ("${post_id}", "${tag_id}")`;
  db.query(sql, function(err, result) {
    if (err) {
      res.status(500).send({ error: "The API returned an error" });
    } else {
      res.json({ status: true, id: result.insertId });
    }
  });
});

router.delete("/link", (req, res, next) => {
  const post_id = req.body.post_id;
  const tag_id = req.body.tag_id;

  const sql = `DELETE FROM postTag WHERE post_id = ${post_id} and tag_id = ${tag_id}`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send({ error: "The API returned an error" });
    } else if (result.affectedRows === 0) {
      res.status(404).send({ error: "Element not found." });
    } else {
      res.json({ status: true });
    }
  });
});

module.exports = router;
