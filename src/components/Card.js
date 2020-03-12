import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

function CardWrapper({ children, spacing = 2 }) {
  const classes = useStyles();

  return (
    <Grid className={classes.root} container spacing={spacing}>
      <Grid item xs={12}>
        <Card className={classes.root} raised>
          {children}
        </Card>
      </Grid>
    </Grid>
  );
}

CardWrapper.propTypes = {
  children: PropTypes.any,
  spacing: PropTypes.number,
};

export default CardWrapper;
