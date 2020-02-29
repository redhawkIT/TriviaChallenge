import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import React from 'react';

const style = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

/**
 * Loading spinner that fills the remaining vertical space
 * https://material-ui.com/api/circular-progress/#circularprogress-api
 */
function CircularProgressWrapper({ size = 180, thickness = 3.6 }) {
  return (
    <div style={style}>
      <CircularProgress size={size} thickness={thickness} />
    </div>
  );
}

CircularProgressWrapper.propTypes = {
  /**
   * The size of the circle.
   */
  size: PropTypes.number,
  /**
   * The thickness of the circle.
   */
  thickness: PropTypes.number,
};

export default CircularProgressWrapper;
