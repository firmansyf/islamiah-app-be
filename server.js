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
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "islami-db",
});

app.get("/hadist", (req, res) => {
  const sql = `SELECT tb_hadist_content.id,
    tb_hadist_content.content, tb_hadist_content.id_hadist,
    tb_hadist.name, tb_hadist.value FROM tb_hadist_content INNER JOIN tb_hadist ON tb_hadist_content.id_hadist = tb_hadist.id`;

  db.query(sql, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json("Error");
    }

    // Memproses data untuk mengelompokkan konten (content) dengan id_hadist yang sama pada tb_hadist
    const groupedData = data.reduce((acc, curr) => {
      if (!acc[curr.id_hadist]) {
        acc[curr.id_hadist] = {
          id: curr.id_hadist,
          name: curr.name,
          value: curr.value,
          content: [],
        };
      }
      acc[curr.id_hadist].content.push(curr.content); // Memasukkan nilai content dari setiap baris data ke dalam array content di objek yang sesuai dengan id_hadist.
      return acc;
    }, {});

    // Mengubah objek menjadi array
    const result = Object.values(groupedData);

    return res.json(result);
  });
});

// starts a simple http server locally on port 1212
app.listen(1212, () => {
  console.log("Listening on localhost:1212");
});
