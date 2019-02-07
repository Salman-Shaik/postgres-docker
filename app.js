const express = require('express');
const Pool = require('pg').Pool;

const app = express();
module.exports = app;

const pg = new Pool({
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: 'db',
  password: '',
  port: 5432,
})
const filterResults = resultArray => {
  return resultArray.map(item => {
    return item.number;
  });
}
pg.query("CREATE TABLE IF NOT EXISTS numbers(number integer)", (err, res) => {
  if (err) {
    console.log(err)
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
  pg.query(`INSERT INTO numbers(number) VALUES (${number})`, (err, result) => {
    if (err) {
      console.log(err);
      res.end();
    }
    res.send("Data Succesfully Inserted");
  })
});

app.get("/number", (req, res) => {
  pg.query("SELECT * FROM numbers", (err, result) => {
    if (err) {
      console.log(err);
      res.end();
    }
    res.send(filterResults(result.rows));
  })
});

app.delete("/number", (req, res) => {
  const number = req.body.number;
  pg.query(`DELETE FROM numbers WHERE number=${number}`, (err, result) => {
    if (err) {
      console.log(err);
      res.end();
    }
    res.send("Data Succesfully Deleted")
  })
});
