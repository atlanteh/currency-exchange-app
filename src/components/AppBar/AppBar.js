import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {default as MIAppBar} from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
      padding: 10,
      fontSize: 28,
      textAlign: 'center'
    },
  }));

export default function AppBar({title}) {
    const classes = useStyles();
  
    return (
        <div className={classes.root}>
        <MIAppBar position="sticky">
            <Typography variant="h6" className={classes.title}>
                {title}
            </Typography>
        </MIAppBar>
        </div>
    );
}