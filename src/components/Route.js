/* eslint-disable react/jsx-props-no-spreading */
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

function RouteWrapper({ title = '', ...rest }) {
  /**
   * Set document title when title changes
   */
  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);

  return <Route {...rest} />;
}

RouteWrapper.propTypes = {
  title: PropTypes.string,
};

export default RouteWrapper;
