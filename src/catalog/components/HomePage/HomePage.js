import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Parallax from '../Parallax/Parallax'
import GridContainer from "../Grid/GridContainer";
import GridItem from '../Grid/GridItem';
import LaunchesTables from '../LaunhcesTable/LaunchesTables'
import MapChart from '../MapChart/MapChart'
import Footer from '../Footer/Footer'
import 'antd/dist/antd.css'
import Header from '../Header/Header';
import HeaderLinks from '../Header/HeaderLinks';

import '../../css/index.css'

import styles from '../../../assets/jss/views/components';
const useStyles = makeStyles(styles);

export default function HomePage (props) {
  const classes = useStyles();
    return (

      <div className='homepage'>
        {/* <Header
            brand="Material Kit React"
            rightLinks={<HeaderLinks />}
            fixed
            color="transparent"
            changeColorOnScroll={{
              height: 400,
              color: "white"
            }}
          /> */}
        <Parallax small image={require('../../../assets/images/space1.jpg')}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1 className={classes.title}>Actual info</h1>
                <h3 className={classes.subtitle}>
                  about space launches
                </h3>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <LaunchesTables />
      </div>
      <Footer />
      </div>
    )
}