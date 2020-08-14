//utilizing a router since I broke it down in my api and it makes sense to use this for easy readability
const router = require("express").Router();
const Workout = require("../models/workout");

   //this will create the db of Workout
    router.post("/api/workouts", (req,res) =>{
        Workout.create({})
        .then(dbWorkout =>{res.json(dbWorkout)})
        .catch(err => {res.json(err)})
    })

    //this will post new exercise data into workout db
    router.post("/api/workouts/:id", ({ body }, res)=>{
        Workout.findByIdAndUpdate(params.id, {$push: {exercises: body}},{new:true})    
        .then(dbWorkout => {res.json(dbWorkout)})
        .catch(err => {res.json(err)})
    });
    //this will find all workouts
    router.get("/api/workouts", (req,res) => {
        Workout.find({})
        .then(workout => {res.json(workout)})
        .catch(err => {res.json(err)})
    });
    //this is to find the date range for the workouts
    router.get("/api/workouts/range", ({query}, res)=>{
        Workout.find({ day: {$gte: query.start, $lte: query.end}})
        .then(dbWorkouts => {res.json(dbWorkouts)})
        .catch(err => res.json(err))
    });
    //this will delete selected workouts based on id
    router. delete("/api/workouts",({body},res) =>{
        Workout.findByIdAndDelete(body.id)
        .then(() => {res.json(true)})
        .catch(err => res.json(err))
    })

module.exports = router;