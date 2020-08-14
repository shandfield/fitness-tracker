async function initWorkout(){
    const lastWorkout = await API.getLastWorkout();
    console.log("Last workout:", lastWorkout);
    if (lastWorkout) {
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
    }

function tallyExercises(exercises){
    return exercises.reduce((acc,curr)=>{
        if (curr.type === "resistance"){
            acc.totalWeight = (acc.totalWeight || 0) + curr.weight;
            acc.totalSets = (acc.totalSets || 0) + curr.sets;
            acc.totalReps = (acc.totalReps || 0) + curr.reps;
        } else if (curr.type === "cardio"){
            acc.totalDistance = (acc.totalDistance || 0) + curr.distance;
        }
        return acc;
    }, {});
    }


function formatDate(date) {
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
    
const workoutKeyMap ={
    date: "Date",
    totalDuration: "Total gains time",
    numExercises: " Exercises destroyed",
    totalWeight: "Do you even lift? Yes you do and you conquered this much weight",
    totalSets: "Total sets demolished",
    totalReps: "Total reps smashed",
    totalDistance: " Total distance covered"
}

Object.keys(summary).forEach(key =>{
    const p = document.createElement("p");
    const strong = document.createElement("strong");
    
    strong.textContent= workoutKeyMap[key];
    const textNode = document.createTextNode(`: ${summary[key]}`);
    
    p.appendChild(strong);
    p.appendChild(textNode);

    container.appendChild(p);
});
}

}

initWorkout();
