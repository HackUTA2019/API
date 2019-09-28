
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
  
/**
 * Generate a new simulation
 */
router.post("/new_simulation", async (request, response) => {
    try {
        var new_routine = new SimulationSchema(request.body);
        var result = await new_routine.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

/**
 * Return simulations
 */
router.get("/get_simulations", async (request, response) => {
    try {
        var result = await routine.find().exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});


module.exports = router;