import React, { useEffect } from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

const useStyles = makeStyles(theme => ({
  container:  {
      position: 'relative',
  },
  toggleBtn: {
    flex: 1
  },
  toggleBtnGroup: {
    width: '100%',
  }
}));

function HistoricalRates({className, onToggleChange, toggleValue, onMount}) {
  const classes = useStyles();
  const { t } = useTranslation();
  useEffect(() => {onMount()}, [onMount]);
  
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
      </Container>
    </div>
  );
}

export default HistoricalRates;
