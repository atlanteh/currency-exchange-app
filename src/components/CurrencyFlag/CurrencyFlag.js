import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Flag from 'components/Flag';

const useStyles = makeStyles(theme => ({
  flag: {
    marginRight: 10,
  },
  currencyFlag: {
    display: 'flex',
    alignItems: 'center',
  }
}));

export default function CurrencyFlag({currency, classes = {}}) {
  const styleClasses = useStyles();
  const flagClasses = `${styleClasses.flag} ${classes.flag || ''}`;
  return (
    <div className={styleClasses.currencyFlag}>
      <Flag className={flagClasses} currency={currency} />
      {currency}
    </div>
  );
}