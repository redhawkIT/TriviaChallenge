import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const StyledCircularProgress = styled(CircularProgress)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

/**
 * Loading spinner that fills the remaining vertical space
 * https://material-ui.com/api/circular-progress/#circularprogress-api
 */
function CircularProgressWrapper({ size = 180, thickness = 3.6 }) {
  return <StyledCircularProgress size={size} thickness={thickness} />;
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
