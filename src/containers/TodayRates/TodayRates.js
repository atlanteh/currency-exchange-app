import React from 'react';
import { Container, AppBar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import CurrencyFlag from 'components/CurrencyFlag';

const useStyles = makeStyles(theme => ({
  bar: {
    minHeight: 48,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  ratesWrapper: {
    marginTop: 40,
  },
  todayRates: {
    flex: 1,
  },
  row: {
    justifyContent: 'space-between',
    display: 'flex',
    marginBottom: 15,
    padding: 0,
    paddingBottom: 15,
    '&:not(:last-of-type)': {
      borderBottom: `1px solid ${theme.palette.divider}`
    }
  },
  flag: {
    marginRight: 10,
    width: 33,
    height: 22,
  },
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
            <CurrencyFlag currency={r.currency} classes={{flag: classes.flag}} />
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
