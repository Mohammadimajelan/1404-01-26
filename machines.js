const express = require('express');
const router = express.Router();
const Machine = require('../models/Machine');

// Get all machines
router.get('/', async (req, res) => {
  try {
    const machines = await Machine.find();
    res.json(machines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new machine
router.post('/', async (req, res) => {
  const machine = new Machine({
    name: req.body.name,
    type: req.body.type,
    capabilities: req.body.capabilities,
  });

  try {
    const newMachine = await machine.save();
    res.status(201).json(newMachine);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update machine status
router.patch('/:id/status', async (req, res) => {
  try {
    const machine = await Machine.findById(req.params.id);
    if (machine) {
      machine.status = req.body.status;
      const updatedMachine = await machine.save();
      res.json(updatedMachine);
    } else {
      res.status(404).json({ message: 'Machine not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router; 