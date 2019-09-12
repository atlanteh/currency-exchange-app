import React from 'react';
import { Container, AppBar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Flag from 'components/Flag';

const useStyles = makeStyles(theme => ({
  bar: {
    minHeight: 48,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  ratesWrapper: {
    marginTop: 20,
  },
  todayRates: {
    flex: 1,
  },
  row: {
    justifyContent: 'space-between',
    display: 'flex',
    marginBottom: 10,
  },
  flag: {
    marginRight: 10,
    width: 33,
    height: 22,
  }
}));

function TodayRates({className, sourceRate, todaysRates}) {
  const classes = useStyles();
  const {t} = useTranslation();
  const {currency} = sourceRate || {};
  return (
    <div className={className}>
      <AppBar position="static" className={classes.bar}>
          <Typography variant="button">{t('todaysRates')}</Typography>
          <Typography variant="button">1 {currency} =</Typography>
      </AppBar>
      <Container className={classes.ratesWrapper}>
        {todaysRates.map(r => (
          <Container key={r.currency} className={classes.row}>
            <span>
              <Flag currency={r.currency} className={classes.flag} />
              {r.currency}
            </span>
            <span>
              {r.rate}
            </span>
          </Container>
        ))}
      </Container>
    </div>
  );
}

export default TodayRates;
