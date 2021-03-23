const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
var path = require('path');

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

//get last workout
app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });

  //stats page
  app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname + '/public/stats.html'));
  });

  //exercise page
  app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname + '/public/exercise.html'));
  });

  //exercise page -- add exercise
  app.put("/api/workouts/:id", (req, res) => {
    console.log(req.params.id)
    db.Workout.updateOne({_id: req.params.id}, {
        $push: {exercises: {
            type: req.body.type,
            name: req.body.name,
            distance: req.body.distance,
            duration: req.body.duration,
            weight: req.body.weight,
            reps: req.body.reps,
            sets: req.body.sets,
        }}
    
    })
    .then(dbWorkout => {
        res.json(dbWorkout);
      })
    .catch(err => {
        res.json(err);
      });
  });

  //exercise page -- add workout
  app.post("/api/workouts", ({data}, res) => {
    //console.log(req.params.id)
    db.Workout.create(data)
    .then(dbWorkout => {
        console.log(dbWorkout)
        console.log("hello")
        res.json(dbWorkout);
      })
    })































// Start the server
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });
  