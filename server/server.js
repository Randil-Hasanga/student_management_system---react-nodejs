const express = require('express');
const mysql =  require('mysql');
const cors =  require('cors');
const path =  require('path');
const { error } = require('console');

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

const port = 5000;

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "1234",
    database: "students"
});

app.listen(port, () => {
    console.log("Listing to port ",port);
});

app.post('/add_user', (req, res) =>{
    sql = "INSERT INTO student_details (name, email, age, gender) VALUES (?,?,?,?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.age,
        req.body.gender
    ];

    db.query(sql, values, (err, result) => {
        if(err){
            console.log(err);
            return res.json({message: "Something unexpected has occurred"});
        }
        console.log('success');
        return res.json({message: "Successfully updated the database"});
    });
})

app.get('/students', (req, res) => {
    sql = "SELECT * FROM student_details";

    db.query(sql, (err, result) => {
        if(err){
            console.log(err);
            return res.json({message: "Something unexpected has occurred"});
        }
        console.log('success');
        return res.json(result);
    })
});

app.get('/get_student/:id', (req, res) => {
    const id = req.params.id;

    const sql = "SELECT * FROM student_details WHERE id = ?";

    db.query(sql,[id], (err, result) => {
        if(err){
            console.log(err);
            return res.json({message: "Something unexpected has occurred"});
        }
        console.log('success');
        return res.json(result[0]);
    });
});

app.post('/edit_user/:id', (req, res) => {
    const id = req.params.id;

    const values = [
        req.body.name,
        req.body.email,
        req.body.gender,
        req.body.age,
        id
    ];

    const sql = "UPDATE student_details SET name = ?, email = ?, gender = ?, age = ? WHERE id = ?";
    db.query(sql, values, (err, result) => {
        if(err){
            console.log(err);
            return res.json({message: "Something unexpected has occurred"});
        }
        console.log('success');
        return res.json({message: "Successfully updated the database"});
    })
})