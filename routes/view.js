const router = require("express").Router();
const path = require("path");

router.get("/exercise", (req,res) =>{
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

router.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/stats.html"))
});

module.exports = router;

//created a view file to make it easier to see where the routes are going for the stats and the exercise html links