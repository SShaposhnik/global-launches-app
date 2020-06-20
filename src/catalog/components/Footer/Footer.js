import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {GithubOutlined} from '@ant-design/icons'
import { List, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';

import styles from '../../../assets/jss/components/footerStyle';

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  const { whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a
                className={classes.block}
                target="_blank"
              >
                <GithubOutlined />
              <a href="https://github.com/SShaposhnik/global-launches-app" target="_blank"> Github</a>
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                className={classes.block}
                target="_blank"
              >
                About us
              </a>
            </ListItem>

          </List>
        </div>
        <div className={classes.right}>
          &copy; {1900 + new Date().getYear()} , made with{` `,<FavoriteRoundedIcon />}
          for a better web.
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  whiteFont: PropTypes.bool
};