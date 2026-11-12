const mysql = require('mysql2');

// Create the connection to database[cite: 2]
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'assignDBuser',
    password: 'assignDBpass',
    database: 'assignDB',
    namedPlaceholders: true
});

function getUsers(callback) {
    const sql = 'SELECT * from users';
    connection.execute(sql, function (err, results, fields) {
        if (err) return callback(err, null);
        callback(null, results);
    });
}

function addUser(userData, callback) {
    const valueArray = [userData.fname, userData.lname, userData.username, userData.passwd];
    const sql = 'INSERT INTO users (fname, lname, username, passwd) VALUES (?, ?, ?, ?)';
    connection.execute(sql, valueArray, function (err, results, fields) {
        if (err) return callback(err, null);
        callback(null, results);
    });
}

module.exports = { getUsers, addUser };