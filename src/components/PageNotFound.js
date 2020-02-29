import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import React from 'react';

const useStyles = makeStyles({
  veryLarge: {
    fontSize: 70,
    lineHeight: 0,
  },
  container: {
    height: '100%',
  },
  item: {
    textAlign: 'center',
  },
});

function PageNotFound() {
  const classes = useStyles();

  return (
    <Grid alignItems="center" className={classes.container} container justify="center">
      <Grid className={classes.item} item>
        <h1 className={classes.veryLarge}>404</h1>
        <h2>Page Not Found</h2>
        <p>Oops! We can't seem to find the page you're looking for</p>
      </Grid>
    </Grid>
  );
}

export default PageNotFound;
