import React, { useEffect } from 'react';
import AppBar from 'components/AppBar';
import { Grid, Container } from '@material-ui/core';
import Tabs from 'components/Tabs';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import 'services/i18n';
import TodayRates from 'containers/TodayRates';
import CurrencyConverter from 'containers/CurrencyConverter';
import HistoricalRates from 'containers/HistoricalRates';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 50
  },
  grid: {
    flexGrow: 1,
  },
  todayRates: {
    flex: 1,
  },
  section: {
    border: `1px solid ${theme.palette.grey[400]}`,
    padding: 0,
    height: '100%',
  },
}));

function App({onMount}) {
  useEffect(() => {onMount()}, [onMount]);
  const classes = useStyles();
  const { t } = useTranslation();
  const tabItems = [
    {title: t('currencyConverter'), component: CurrencyConverter},
    {title: t('historicalRates'), component: HistoricalRates},
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
          <Grid item md={8} xs={12}>
            <Container className={classes.section}>
              <Tabs items={tabItems} />
            </Container>
          </Grid>
          <Grid item md={4} xs={12}>
            <Container className={classes.section}>
              <TodayRates className={classes.todayRates} />
            </Container>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
