import React from 'react';
import { Container, TextField, Grid, Select, MenuItem, Divider, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import config from 'config/config';
import CurrencyFlag from 'components/CurrencyFlag';

const useStyles = makeStyles(theme => ({
  container:  {
      position: 'relative',
      padding: 0
  },
  toolbar: {
    minHeight: 48,
  },
  todayRates: {
    flex: 1,
  },
  select: {
      width: '100%',
  },
  connector: {
      position: 'absolute',
      top: '50%',
      left: -15,
      transform: 'translateY(-50%)',
      width: 15,
      height: 80,
      border: `1px solid ${theme.palette.grey[400]}`,
      borderRight: 0
  },
  fieldsetItem: {
    marginTop: 30,
    marginBottom: 25
  },
  divider: {
      margin: '30px 0px',
  },
}));

function CurrencyFieldset({rates, title, className, onChange, value, amountReadOnly}) {
    const classes = useStyles();
    const {amount, currency} = value || {};
    return (
        <Grid
            container
            spacing={1}
            direction="row"
            alignItems="flex-end"
            className={className}
          >
            <Grid item xs={4}>
                <TextField
                    value={amount || 0}
                    onChange={(e) => onChange({...value, amount: e.target.value})}
                    variant="outlined"
                    label={title}
                    type="number"
                    className={classes.textField}
                    inputProps={{step: config.amountStep, readOnly: amountReadOnly,}}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Grid>
            <Grid item xs={8}>
                <Select
                    value={currency || ''}
                    onChange={(e) => onChange({...value, currency: e.target.value})}
                    variant="outlined"
                    className={classes.select}
                >
                    {rates.map(r => (
                      <MenuItem key={r.currency} value={r.currency}>
                        <CurrencyFlag currency={r.currency} />
                      </MenuItem>
                    ))}
                </Select>
            </Grid>
          </Grid>
    );
}

function RateSummary({selectedRates, rateRatio, lastUpdate}) {
  const { t } = useTranslation();
  const {source, target}  = selectedRates;
  if (!source || !target) {
      return null;
  }
  return (
      <>
        <Typography>{t('yourRate')}</Typography>
        <Typography variant="h6">1 {source.currency} = {rateRatio} {target.currency}</Typography>
        <Typography>{t('lastUpdatedAt')} {lastUpdate.toDateString()}</Typography>
      </>
    );
}

function CurrencyConverter({className, rates, selectedRates, onRatesChange, rateRatio, lastUpdate}) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={className}>
      <Container className={classes.container}>
          <div className={classes.connector} />
          <CurrencyFieldset
            rates={rates}
            title={t('from')}
            className={classes.fieldsetItem}
            value={selectedRates.source}
            onChange={source => onRatesChange({...selectedRates, source})}
          />
          <CurrencyFieldset
            rates={rates}
            title={t('to')}
            value={selectedRates.target}
            onChange={target => onRatesChange({...selectedRates, target})}
            amountReadOnly
          />
      </Container>
      <Divider className={classes.divider} />
      <RateSummary
        lastUpdate={lastUpdate}
        selectedRates={selectedRates}
        rateRatio={rateRatio}
      />
    </div>
  );
}

export default CurrencyConverter;
