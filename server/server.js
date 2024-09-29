const express = require('express');
const mysql =  require('mysql');
const cors =  require('cors');
const path =  require('path');

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json);

const port = 3000;

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "1234",
    database: "students"
});

app.listen(port, () => {
    console.log("Listing to port ",port);
})