const express = require("express");
const router = express.Router();
const db = require("../db");
const bodyParser = require("body-parser");

router.use(bodyParser.json());

/* Get method to fetch all categories */
router.get("/", (req, res, next) => {
  const sql = "Select * FROM category";
  db.query(sql, function(err, rows, fields) {
    if (err) {
      console.log(err);
      res.status(500).send({ error: "The API sent back an error" });
    } else {
      res.json(rows);
    }
  });
});

/* Get method to fetch a single category */
router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  const sql = `SELECT * FROM category WHERE id = ${id}`;
  db.query(sql, function(err, row, fields) {
    if (err) {
      console.log(err);
      res.status(500).send({ error: "The API sent back an error" });
    } else if (row[0] === undefined) {
      res.status(404).send({ error: "Element not found." });
    } else {
      res.json(row[0]);
    }
  });
});

/* Post method to create a single category */
router.post("/", (req, res, next) => {
  const name = req.body.name;
  const image = req.body.image;

  const sql = `INSERT INTO category (name, image, created_at, last_updated) VALUES ("${name}", "${image}", NOW(), NOW())`;
  db.query(sql, function(err, result) {
    if (err) {
      console.log(err);
      res.status(500).send({ error: "The API returned an error" });
    } else {
      res.json({ status: true, id: result.insertId });
    }
  });
});

/* Put method to update a single category */
router.put("/:id", function(req, res, next) {
  const id = req.params.id;
  const name = req.body.name;
  const image = req.body.image;

  const sql = `UPDATE category SET name="${name}", image="${image}", last_updated = NOW() WHERE id=${id}`;
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
  const sql = `DELETE FROM category WHERE id=${id}`;
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
