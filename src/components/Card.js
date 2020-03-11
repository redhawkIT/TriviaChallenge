import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import React from 'react';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

// eslint-disable-next-line react/prop-types
function CardWrapper({ children }) {
  const classes = useStyles();

  return (
    <Grid className={classes.root} container spacing={2}>
      <Grid item xs={12}>
        <Card className={classes.root}>{children}</Card>
      </Grid>
    </Grid>
  );
}

export default CardWrapper;
