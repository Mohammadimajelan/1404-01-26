const mongoose = require('mongoose');

const MachineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'maintenance', 'in-use'],
    default: 'available'
  },
  capabilities: [{
    type: String
  }],
  maintenanceSchedule: {
    lastMaintenance: Date,
    nextMaintenance: Date
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Machine', MachineSchema); 