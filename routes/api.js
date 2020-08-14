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
    router.put("/api/workouts/:id", ({ params,body }, res)=>{
        Workout.findOneAndUpdate({_id: params.id}, {$push: {exercises: body}},{new:true, runValidators: true})    
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
    router.get("/api/workouts/range", (req, res)=>{
        Workout.find({})
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