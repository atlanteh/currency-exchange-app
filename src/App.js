import React from 'react';
import './App.css';
import AppBar from 'components/AppBar';
import { Grid, Container } from '@material-ui/core';
import Tabs from 'components/Tabs';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import 'services/i18n';
import TodayRates from 'containers/TodayRates';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 50
  },
  grid: {
    flexGrow: 1,
  },
  tabs: {
    flex: 2,
  },
  todayRates: {
    flex: 1,
  },
}));

function App() {
  const classes = useStyles();
  const { t } = useTranslation();
  const tabItems = [
    {title: t('currencyConverter'), component: () => (<div>test1</div>)},
    {title: t('historicalRates'), component: () => (<div>test2</div>)},
  ];

  return (
    <div className="App">
      <AppBar title={t('appHeader')} />
      <Container className={classes.root}>
        <Grid
          container
          spacing={5}
          className={classes.grid}
          direction="row"
          justify="center"
        >
          <Grid item xs={8}>
            <Tabs items={tabItems} className={classes.tabs} />
          </Grid>
          <Grid item xs={4}>
            <TodayRates className={classes.todayRates} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
