import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Container, Grid } from '@material-ui/core';
import Schedule from './components/Schedule';
import Navbar from './components/Navbar';
import OrderForm from './components/OrderForm';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Switch>
                <Route exact path="/" component={Schedule} />
                <Route path="/new-order" component={OrderForm} />
              </Switch>
            </Grid>
          </Grid>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App; 