async function init(){
    const allWorkouts = await API.getAllWorkouts();
    const lastWorkout = allWorkouts[allWorkouts.length -1]

    console.log(lastWorkout, allWorkouts);

document
    .querySelector("a[href='/exercise?']")
    .setAttribute("href", `/exercise?id=${lastWorkout._id}`);

const workoutSummary = {
    date: formatDate(lastWorkout.day),
    totalDuration: lastWorkout.totalDuration,
    numExercises: lastWorkout.exercises.length,
    ...tallyExercises(lastWorkout.exercises)
};
renderWorkoutSummary(workoutSummary);

function tallyExercises(exercises){
    return exercises.reduce((acc,curr)=>{
        if (curr.type === "resistance"){
            acc.totalWeight = (acc.totalWeight || 0) + curr.weight;
            acc.totalSets = (acc.totalSets || 0) + curr.sets;
            acc.totalReps = (acc.totalReps || 0) + curr.reps;
        } else if (curr.type === "cardio"){
            acc.totalDistance = (acc.totalDistance || 0) + curr.totalDistance;
        }
        return acc;
    }, {});
    }
// function changeWorkout(){
//     console.log(this.value)
//     location.href = "/exercise?id=" + this.value
// }
function formateDate(date) {
    const options ={
        weekday: "long",
        year: "numeric",
        month:"long",
        day: "numeric"
    };
    return new Date(date).toLocaleDateString(options);
}

function renderWorkoutSummary(summary){
    const container = document.querySelector(".workout-stats");
    container.innerHTML = ""

const workoutKeyMap ={
    date: "Date",
    totalDuration: "Total workout duration:",
    numExercises: " Exercises performed:",
    totalWeight: "Total weight:",
    totalSets: "Total sets completed:",
    totalReps: "Total reps completed:",
    totalDistance: " Total distance:"
}

Object.keys(summary).forEach(key =>{
    const p = document.createElement("p");
    const strong = document.createElement("strong");

    strong.textContent = workoutKeyMap[key];
    const textNode = document.createTextNode(`: ${summary[key]}`);

    p.appendChild(strong);
    p.appendChild(textNode);

    container.appendChild(p);
});
}

// function WorkoutSummary(day,dur,len,exer){
//     return{
//         date: formateDate(day),
//         totalDuration: dur,
//         numExercises: len,
//         ...tallyExercises(exer)
//     }
}

init();
