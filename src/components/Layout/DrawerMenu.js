import { useHistory, useLocation } from 'react-router-dom';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import CategoryIcon from '@material-ui/icons/Category';
import HistoryIcon from '@material-ui/icons/History';
import HomeIcon from '@material-ui/icons/Home';
import List from '@material-ui/core/List';
import ListIcon from '@material-ui/icons/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import Tooltip from '@material-ui/core/Tooltip';

// eslint-disable-next-line react/prop-types
function Item({ primary = '', secondary = '', icon: Icon, open = false }) {
  const { pathname } = useLocation();
  const history = useHistory();
  const url = `/${primary.toLowerCase()}`;

  const handleClick = useCallback(() => history.push(url), [url, history]);

  return (
    <Tooltip title={open ? '' : primary}>
      <ListItem button onClick={handleClick} selected={pathname === url}>
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
      <Item icon={ListIcon} open={open} primary="Result" />
      <Item icon={CategoryIcon} open={open} primary="Categories" />
      <Item icon={HistoryIcon} open={open} primary="Statistics" />
    </List>
  );
}

DrawerMenu.propTypes = {
  open: PropTypes.bool.isRequired,
};

export default DrawerMenu;
