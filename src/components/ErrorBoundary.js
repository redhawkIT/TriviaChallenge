import Grid from '@material-ui/core/Grid';
import React from 'react';
import Typography from '@material-ui/core/Typography';

class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
    message: '',
  };

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error /* info */) {
    // Log error to API
    this.setState({ message: error.message });
  }

  render() {
    if (this.state.hasError) {
      return (
        <Grid alignItems="center" container justify="center">
          <Grid item sm={12} xs={10}>
            <Typography align="center" gutterBottom variant="h5">
              Oops something went wrong please try again
            </Typography>
            <Typography align="center" gutterBottom variant="body2">
              {`Error: ${this.state.message}`}
            </Typography>
          </Grid>
        </Grid>
      );
    }

    // eslint-disable-next-line react/prop-types
    return this.props.children;
  }
}

export default ErrorBoundary;
