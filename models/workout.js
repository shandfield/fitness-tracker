const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema(
    {
        day:{
            type: Data,
            default: Date.now
        },
        exercises:[
        {
            type:{
                type:String,
                trim: true,
                require:" Was your exercise today cardio or resistance?"
            },
            name: {
                type: String,
                trim: true,
                require: "What was the name of the exercise?"
            },
            duration:{
                type: Number,
                require: "What was the duration?"
            },
            weight:{
                type: Number
            },
            sets:{
                type: Number
            },
            distance:{
                type:Number
            }
        }
    ]
});
  //this helps with breaking down the array of exercises down to just a sum of the durations
    workoutSchema.virtual("totalDuration").get(function(){
        return this.exercises.reduce((total,exercise) =>{
            return total + exercise.duration;
        },0)
    });
const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;