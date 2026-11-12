const express = require('express');
const path = require('path');
const userDB = require('./models/userDB');

const app = express();
const PORT = 3000;

// ** Middleware **
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// ** Web API Routes ***
app.get("/api/users", function (req, res) {
    userDB.getUsers(function (err, data) {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json(data);
    });
});

app.post("/api/users", function (req, res) {
    userDB.addUser(req.body, function (err, data) {
        if (err) {
            console.error(err);
            return res.status(400).json({ error: "Could not add user." });
        }
        res.status(201).json({ message: "User added successfully", data });
    });
});

app.listen(PORT, function () {
    console.log(`Listening on Port: ${PORT}`);
});