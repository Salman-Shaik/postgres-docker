const express = require('express');
const { Client } = require('pg');

const app = express();
module.exports = app;

const dbClient = new Client(process.env.DATABASE_URL);
dbClient.connect();

const filterResults = resultArray => {
  return resultArray.map(item => {
    return item.number;
  });
}

dbClient.query("CREATE TABLE IF NOT EXISTS numbers(number integer)", (err, res) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Table Created')
});

app.use(express.json());

app.use(({ url, method},res,next) => {
  console.log(`${method} ${url}`);
  next();
});

app.post("/number", (req, res) => {
  const number = req.body.number;
  dbClient.query(`INSERT INTO numbers(number) VALUES (${number})`, (err, result) => {
    if (err) throw err;
    res.send("Data Succesfully Inserted");
  })
});

app.get("/number", (req, res) => {
  dbClient.query("SELECT * FROM numbers", (err, result) => {
    if (err) throw err;
    res.send(filterResults(result.rows));
  })
});

app.delete("/number", (req, res) => {
  const number = req.body.number;
  dbClient.query(`DELETE FROM numbers WHERE number=${number}`, (err, result) => {
    if (err) throw err;
    res.send("Data Succesfully Deleted")
  })
});
