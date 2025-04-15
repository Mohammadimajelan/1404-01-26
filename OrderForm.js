import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@material-ui/core';
import { DateTimePicker } from '@material-ui/pickers';
import axios from 'axios';

const OrderForm = () => {
  const [formData, setFormData] = useState({
    orderNumber: '',
    customerName: '',
    priority: 0,
    startTime: new Date(),
    endTime: new Date(),
    machineId: '',
    description: '',
    estimatedDuration: 0,
  });

  const [machines, setMachines] = useState([]);

  useEffect(() => {
    // Load available machines
    const loadMachines = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/machines');
        setMachines(response.data);
      } catch (error) {
        console.error('Error loading machines:', error);
      }
    };
    loadMachines();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/orders', formData);
      // Reset form
      setFormData({
        orderNumber: '',
        customerName: '',
        priority: 0,
        startTime: new Date(),
        endTime: new Date(),
        machineId: '',
        description: '',
        estimatedDuration: 0,
      });
      alert('Order created successfully!');
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Error creating order. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Paper style={{ padding: '20px', marginTop: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Create New Order
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Order Number"
              name="orderNumber"
              value={formData.orderNumber}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Customer Name"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Machine</InputLabel>
              <Select
                name="machineId"
                value={formData.machineId}
                onChange={handleChange}
                required
              >
                {machines.map((machine) => (
                  <MenuItem key={machine._id} value={machine._id}>
                    {machine.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DateTimePicker
              label="Start Time"
              value={formData.startTime}
              onChange={(date) => setFormData({ ...formData, startTime: date })}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Estimated Duration (minutes)"
              name="estimatedDuration"
              value={formData.estimatedDuration}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Create Order
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default OrderForm; 