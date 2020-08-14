const db = require("../models");
const Workout = require("../models/workout");

module.exports = function (app) {
    //this will create the db of Workout
    app.post("/api/exercise", (req,res) =>{
        db.Workout.create({})
        .then(dbWorkout =>{res.json(dbWorkout)})
        .catch(err => {res.json(err)})
    })

    //this will post new exercise data into workout db
    app.post("/api/exercise/:id", ({ body }, res)=>{
        db.Workout.findByIdAndUpdate(params.id, {$push: {exercises: body}},{new:true})    
        .then(dbWorkout => {res.json(dbWorkout)})
        .catch(err => {res.json(err)})
    });
    //this will find all workouts
    app.get("/api/exercise", (req,res) => {
        db.Workout.find({})
        .then(workout => {res.json(workout)})
        .catch(err => {res.json(err)})
    });
    //this is to find the date range for the workouts
    app.get("/api/stats/range", ({query}, res)=>{
        Workout.find({ day: {$gte: query.start, $lte: query.end}})
        .then(dbWorkouts => {res.json(dbWorkouts)})
        .catch(err => res.json(err))
    });
    //this will delete selected workouts based on id
    app. delete("/api/exercise",({body},res) =>{
        Workout.findByIdAndDelete(body.id)
        .then(() => {res.json(true)})
        .catch(err => res.json(err))
    })
};