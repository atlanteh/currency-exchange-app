import React, { useEffect } from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { Line } from 'react-chartjs-2';

const useStyles = makeStyles(theme => ({
  container:  {
      position: 'relative',
  },
  toggleBtn: {
    flex: 1
  },
  toggleBtnGroup: {
    width: '100%',
  },
  graph: {
    marginTop: 20,
  }
}));

function HistoryGraph({data, selectedRates}) {
  const classes = useStyles();

  if (!data || !data.length) {
    return null;
  }
  const labels = data.map(d => d.key)
  const lineData = data.map(d => d.ratio)

  const graphLabel = `${selectedRates.source.currency} vs ${selectedRates.target.currency}`

  return (
    <div className={classes.graph}>
      <Line
        data={{
          labels,
          datasets: [{data: lineData, label: graphLabel}]
        }}
        options={{scales: {xAxes: [{ticks: {autoSkip: true, maxTicksLimit: 14}}]}}}
      />
    </div>
  )
}

function HistoricalRates({className, onToggleChange, refreshGraph, toggleValue, onMount, historyRange, selectedRates}) {
  const classes = useStyles();
  const { t } = useTranslation();
  useEffect(() => {onMount()}, [onMount]);
  useEffect(() => {refreshGraph()}, [selectedRates, refreshGraph]);
  
  return (
    <div className={className}>
      <Container className={classes.container}>
        <ToggleButtonGroup
          className={classes.toggleBtnGroup}
          value={toggleValue}
          onChange={(_e, value) => onToggleChange(value)}
          exclusive
        >
          <ToggleButton value="1" className={classes.toggleBtn}>{t('lastMonth')}</ToggleButton>
          <ToggleButton value="3" className={classes.toggleBtn}>{t('lastNMonths', {count: 3})}</ToggleButton>
          <ToggleButton value="6" className={classes.toggleBtn}>{t('lastNMonths', {count: 6})}</ToggleButton>
          <ToggleButton value="12" className={classes.toggleBtn}>{t('lastNMonths', {count: 12})}</ToggleButton>
      </ToggleButtonGroup>
      <HistoryGraph data={historyRange} selectedRates={selectedRates} />
      </Container>
    </div>
  );
}

export default HistoricalRates;
