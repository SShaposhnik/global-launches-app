/*eslint-disable*/
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import { Route, NavLink } from "react-router-dom"
// @material-ui/icons
import { Apps, CloudDownload } from '@material-ui/icons';
import MapLaunches from '../Launches'

// core components
import CustomDropdown from '../CustomDropdown/CustomDropdown.js';
import Button from '../CustomButtons/Button';

import styles from '../../../assets/jss/components/headerLinksStyle';

const useStyles = makeStyles(styles);

{/* <NavLink to="/launches"><img src={Comet} style={{ width: '5%', marginLeft: '15%' }} /></NavLink>
          <a>фыв</a>
<Route exact path='/launches' component={MapLaunches} /> */}

export default function HeaderLinks(props) {
  const classes = useStyles();
  return (

    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <NavLink
          to="/"
          className={classes.navLink}
        >
          <CloudDownload className={classes.icons} /> Вариант 1
        </NavLink>
      </ListItem>
      <ListItem className={classes.listItem}>
        <NavLink
          to="/launches"
          className={classes.navLink}
        >
          <CloudDownload className={classes.icons} /> Вариант 2
        </NavLink>
      </ListItem>
      <Route exact path='/launches' component={MapLaunches} /> 

    </List>
  );
}
