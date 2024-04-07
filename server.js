const http = require("node:http");
const mysql = require("mysql2");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Connect Database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "islami-db",
});

app.get("/hadist", (req, res) => {
  const sql = "SELECT * FROM tb_hadist";
  db.query(sql, (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

// starts a simple http server locally on port 3000
app.listen(1212, () => {
  console.log("Listening on localhost:1212");
});
