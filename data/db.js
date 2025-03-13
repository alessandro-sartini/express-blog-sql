const mysql = require('mysql2')

const connection = mysql.createConnection({

  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'posts_db'

});

connection.connect((err) => {
    if (err) return err;
    console.log('Connect at mySQL DB')
});

module.exports = connection;