const filterResults = resultArray => resultArray.map(item => item.number);

const createTable = dbClient => {
  dbClient.query("CREATE TABLE IF NOT EXISTS numbers(number integer)", err => {
    console.log(err || 'Table Created')
  });
}

const insertRow = (dbClient, number, res) => {
  dbClient.query(`INSERT INTO numbers(number) VALUES (${number})`, err => {
    if (err) throw err;
    res.send("Data Succesfully Inserted");
  })
}

const fetchRows = (dbClient, res) => {
  let rows=null;
  dbClient.query("SELECT * FROM numbers", (err, result) => {
    if (err) throw err;
    res.send(filterResults(result.rows));
  })
}

const deleteRows = (dbClient, number, res) => {
  dbClient.query(`DELETE FROM numbers WHERE number=${number}`, err => {
    if (err) throw err;
    res.send("Data Succesfully Deleted");
  })
}

module.exports = {
  createTable,
  insertRow,
  fetchRows,
  deleteRows,
}
