import { useLocation } from 'react-router-dom';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import HistoryIcon from '@material-ui/icons/History';
import HomeIcon from '@material-ui/icons/Home';
import List from '@material-ui/core/List';
import ListIcon from '@material-ui/icons/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';

import * as hooks from '../../hooks';

// eslint-disable-next-line react/prop-types
function Item({ primary = '', secondary = '', icon: Icon, open = false }) {
  const { pathname } = useLocation();
  const handleRoute = hooks.useHistoryHandler();
  const url = `/TriviaChallenge/${primary.toLowerCase()}`;

  return (
    <Tooltip title={open ? '' : primary}>
      <ListItem button onClick={handleRoute(url)} selected={pathname === url}>
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
        <ListItemText primary={primary} secondary={secondary} />
      </ListItem>
    </Tooltip>
  );
}

function DrawerMenu({ open = false }) {
  return (
    <List>
      <Item icon={HomeIcon} open={open} primary="Home" />
      <Item icon={AccessTimeIcon} open={open} primary="Quiz" />
      <Item icon={ListIcon} open={open} primary="Results" />
      <Item icon={HistoryIcon} open={open} primary="Statistics" />
    </List>
  );
}

DrawerMenu.propTypes = {
  open: PropTypes.bool.isRequired,
};

export default DrawerMenu;
