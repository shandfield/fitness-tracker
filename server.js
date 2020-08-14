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

require("./routes/api.js")(app);
require("./routes/view.js")(app);

app.listen(PORT, () =>{
    console.log(`App is running on port ${PORT}!`)
});