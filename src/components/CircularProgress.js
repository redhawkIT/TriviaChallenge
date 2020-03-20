import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 100vh;
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
  return (
    <Container>
      <CircularProgress size={size} thickness={thickness} />
    </Container>
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
