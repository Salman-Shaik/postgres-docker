const express = require('express');
const {Client} = require('pg');
const {
  createTable,
  insertRow,
  fetchRows,
  deleteRows
} = require('./dbHandler.js');
const lib = require('./util.js');

const app = express();
lib.register();

const dbClient = new Client(process.env.DATABASE_URL);
dbClient.connect();

createTable(dbClient);


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(lib.logger);
app.get("/rest", (req, res) => {
  const endTime = new Date().getTime() + 10000;
  while (new Date().getTime() != endTime) {}
  res.send();
})
app.get("/health", (req, res) => res.send())
app.get("/number", (req, res) => fetchRows(dbClient, res));
app.post("/number", ({body}, res) => insertRow(dbClient, body.number, res));
app.delete("/number", ({body}, res) => deleteRows(dbClient, body.number, res));
module.exports = app;
