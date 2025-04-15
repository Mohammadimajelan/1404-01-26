import React, { useEffect, useRef, useState } from 'react';
import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import { Paper, Typography } from '@material-ui/core';
import io from 'socket.io-client';

const Schedule = () => {
  const ganttContainer = useRef(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Initialize Gantt
    gantt.init(ganttContainer.current);
    
    // Configure Gantt
    gantt.config.date_format = "%Y-%m-%d %H:%i";
    gantt.config.auto_scheduling = true;
    gantt.config.auto_scheduling_strict = true;
    
    // Load initial data
    loadScheduleData();

    // Initialize Socket.IO connection
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('scheduleUpdated', (data) => {
        gantt.clearAll();
        gantt.parse(data);
      });
    }
  }, [socket]);

  const loadScheduleData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/schedule');
      const data = await response.json();
      gantt.parse(data);
    } catch (error) {
      console.error('Error loading schedule:', error);
    }
  };

  return (
    <Paper style={{ padding: '20px', marginTop: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Machining Schedule
      </Typography>
      <div
        ref={ganttContainer}
        style={{ width: '100%', height: '600px' }}
      />
    </Paper>
  );
};

export default Schedule; 