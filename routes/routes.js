
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

const SimulationSchema = new mongoose.Schema({
    hash: {
      type: String,
      required: true,
      unique: true,
    },
    simulationName: {
      type: String,
      required: false,
    },
    studentName: {
        type: String,
        required: true
    }
  });
  

const Simulation = mongoose.model("Simulation", SimulationSchema);

/**
 * Generate a new simulation
 */
router.post("/", async (request, response) => {
    try {
        var new_routine = new Simulation(request.body);
        var result = await new_routine.save();
        response.send(result);
    } catch (error) {
        console.log(error);
        response.status(500).send(error);
    }
});

/**
 * Return simulations
 */
router.get("/", async (request, response) => {
    try {
        var result = await Simulation.find().exec();
        response.send(result);
    } catch (error) {
        console.log(error);
        response.status(500).send(error);
    }
});


module.exports = router;