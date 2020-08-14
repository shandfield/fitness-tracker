const express = require("express");
const logger = require("morgan");
const mongoose = require ("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/populate", {
    userNewURLParse: true });

//on the load of the server, create library called Workouts
db.Library.create({name: "Workouts"})
    .then(dbLibrary =>{
        console.log(dbLibrary);
    }).catch(({message}) =>{
        console.log(message);
    });

//creating a new exercise in the Workout library 
app.post("/submit", ({body}, res) => {
    db.Exercise.create(body)
    .then(({_id}) => db.Library.findOneandUpdate({}, {$push:{exercise:_id}}, {new:true}))
}).then (dbLibrary => {res.json(dbLibrary);
}).catch(err =>{ res.json(err)});

//to find all the exercises from the exercise collection via the stats page
//! need to make sure that this function is correct, as it talks about combined weight of mulitple excercises 
app.get("/stats", (req,res)=>{
    db.Exercise.find({})
        .then(dbExercise => {res.json(dbExercise)})
        .catch(err => {res.json(err)})
});

// !need to create a way Add new exercises to a new workout plan.

app.listen(PORT, () =>{
    console.log(`App is running on port ${PORT}!`)
})