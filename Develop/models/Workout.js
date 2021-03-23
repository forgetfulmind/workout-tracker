const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
  exercises: [
    {
      type : {type: String, trim: true}, 
      name:  {type: String, trim: true}, 
      duration: {type: Number, trim: true, default: 0}, 
      weight: {type: Number, trim: true}, 
      reps: {type: Number, trim: true, default: 0}, 
      sets: {type: Number, trim: true, default: 0}, 
      distance: {type: Number, trim: true, default: 0}, 
    }
  ]
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
