import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import MUITabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  panel: {
    padding: '10px 30px',
  }
}));

export default function Tabs({items, className = ''}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(_e, newValue) {
    setValue(newValue);
  }

  return (
    <div className={`${classes.root} ${className}`}>
      <AppBar position="static">
        <MUITabs value={value} onChange={handleChange}>
            {items.map(i => (<Tab key={i.title} label={i.title} />))}
        </MUITabs>
      </AppBar>
      {items.map((item, index) => {
          const Comp = item.component;
          return (
            <TabPanel index={index} key={item.title} value={value} className={classes.panel}>
              <Comp />
            </TabPanel>
          );
      })}
    </div>
  );
}