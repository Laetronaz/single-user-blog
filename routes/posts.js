const express = require("express");
const router = express.Router();
const db = require("../db");
const bodyParser = require("body-parser");

router.use(bodyParser.json());

/* Get method to fetch all posts */
router.get("/", (req, res, next) => {
  const sql = "Select * FROM post WHERE active = 1";
  db.query(sql, function(err, rows, fields) {
    if (err) {
      res.status(500).send({ error: "The API sent back an error" });
    } else {
      res.json(rows);
    }
  });
});

/* Get method to fetch a single post */
router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  const sql = `SELECT * FROM category WHERE id = ${id}`;
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

/* Post method to create a single post */
router.post("/", (req, res, next) => {
  const title = req.body.title;
  const body = req.body.body;
  const category_id = req.body.category_id;

  const sql = `INSERT INTO post (title, body, category_id, created_at, last_updated, active) VALUES ("${title}", "${body}", ${category_id}, NOW(), NOW(), 1)`;
  db.query(sql, function(err, result) {
    if (err) {
      res.status(500).send({ error: "The API returned an error" });
    } else {
      res.json({ status: true, id: result.insertId });
    }
  });
});

/* Put method to update a single post */
router.put("/:id", function(req, res, next) {
  const id = req.params.id;
  const title = req.body.title;
  const body = req.body.body;
  const category_id = req.body.category_id;

  const sql = `UPDATE post SET title="${title}", body="${body}", category_id=${category_id}, last_updated = NOW() WHERE id = ${id}`;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).send({ error: "The API returned an error" });
    } else if (result.affectedRows === 0) {
      res.status(404).send({ error: "Element not found." });
    } else {
      res.json({ status: true, id: id });
    }
  });
});

router.put("/toggle/:id", function(req, res, next) {
  const id = req.params.id;

  const sql = `UPDATE post SET active = !active WHERE id = ${id}`;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).send({ error: "The API returned an error" });
    } else if (result.affectedRows === 0) {
      res.status(404).send({ error: "Element not found." });
    } else {
      res.json({ status: true, id: id });
    }
  });
});

/* Delete method top delete a single catergory */
router.delete("/:id", function(req, res, next) {
  const id = req.params.id;
  const sql = `DELETE FROM post WHERE id = ${id}`;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).send({ error: "The API returned an error" });
    } else if (result.affectedRows === 0) {
      res.status(404).send({ error: "Element not found." });
    } else {
      res.json({ status: true });
    }
  });
});

module.exports = router;
