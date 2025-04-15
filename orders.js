const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Machine = require('../models/Machine');

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('machineId');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new order
router.post('/', async (req, res) => {
  const order = new Order({
    orderNumber: req.body.orderNumber,
    customerName: req.body.customerName,
    priority: req.body.priority,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    machineId: req.body.machineId,
    description: req.body.description,
    estimatedDuration: req.body.estimatedDuration,
  });

  try {
    const newOrder = await order.save();
    
    // Update machine status
    await Machine.findByIdAndUpdate(req.body.machineId, {
      status: 'in-use'
    });

    // Emit socket event for real-time updates
    req.app.get('io').emit('scheduleUpdate', await Order.find().populate('machineId'));
    
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update order priority
router.patch('/:id/priority', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.priority = req.body.priority;
      const updatedOrder = await order.save();
      
      // Recalculate schedule based on new priority
      const allOrders = await Order.find().sort({ priority: -1 });
      let currentTime = new Date();
      
      for (let order of allOrders) {
        order.startTime = currentTime;
        order.endTime = new Date(currentTime.getTime() + order.estimatedDuration * 60000);
        await order.save();
        currentTime = order.endTime;
      }
      
      // Emit socket event for real-time updates
      req.app.get('io').emit('scheduleUpdate', await Order.find().populate('machineId'));
      
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router; 