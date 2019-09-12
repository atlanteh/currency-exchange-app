import React from 'react';
import { Container, AppBar, Typography, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  toolbar: {
    minHeight: 48,
  },
  todayRates: {
    flex: 1,
  },
}));

function TodayRates({className}) {
  const classes = useStyles();

  return (
    <div className={className}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
            <Typography variant="button">Scroll to Hide App Bar</Typography>
        </Toolbar>
      </AppBar>
      <Container className={classes.root}>
            test
      </Container>
    </div>
  );
}

export default TodayRates;
