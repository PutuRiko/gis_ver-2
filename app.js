const express = require('express');
const mysql = require("mysql");

const app = express()
const port = 4000

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello !')
})

app.get('/index.html', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

app.get('/more_marker.html', (req, res) => {
    res.sendFile(__dirname + '/more_marker.html');
  });

app.get('/marker_cluster.html', (req, res) => {
    res.sendFile(__dirname + '/marker_cluster.html');
  });

app.get('/polyline.html', (req, res) => {
    res.sendFile(__dirname + '/polyline.html');
  });

app.get('/routing.html', (req, res) => {
    res.sendFile(__dirname + '/routing.html');
  });

  app.get('/hospital.html', (req, res) => {
    res.sendFile(__dirname + '/hospital.html');
  });

// konek ke database sql
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_2105551118",
  port: 3306,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

app.post("/process", (req, res) => {
  const { nama_rs, latlng_rs, alamat_rs } = req.body;

  if (!nama_rs || !latlng_rs || !alamat_rs) {
    res.status(400).send('Data tidak lengkap');
    console.log('Data yang diterima:', req.body);
    return;
  }

  const sql = `INSERT INTO tb_rs (nama_rs, latlng_rs, alamat_rs) VALUES (?, ?, ?)`;
  const values = [nama_rs, latlng_rs, alamat_rs];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    console.log("Data inserted into database");
    console.log('Data yang diterima:', req.body);
    res.send("Data inserted into database");
  });
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
