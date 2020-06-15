import React, { Component } from 'react'

import { Layout, Menu, Button } from 'antd'
import { HomeOutlined, RocketOutlined, AreaChartOutlined, UpOutlined } from '@ant-design/icons'
import GitHubIcon from '@material-ui/icons/GitHub';
import { Route, NavLink } from "react-router-dom"
import { animateScroll as scroll } from 'react-scroll'
import 'antd/dist/antd.css'
import Header from '../Header/Header';
import HeaderLinks from '../Header/HeaderLinks';
// import 'antd/dist/antd.dark.css'

import '../../css/index.css'
import MapLaunches from '../LaunhcesTable/LaunchesTables'
import Static from '../testComponents/Static'
import HomePage from '../HomePage/HomePage'

function scrollFunction() {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    document.getElementById("myBtn").style.display = "block"

  } else {
    document.getElementById("myBtn").style.display = "none"

  }
}

window.onscroll = function () { scrollFunction() };

// const { Header, Footer } = Layout

class LayoutContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.scrollToTop = this.scrollToTop.bind(this);
  }

  scrollToTop() {
    scroll.scrollToTop();
  }
  func(params) {
    console.log('check')
    
  }

  render() {
    return (
      <div>
        <Layout id="layout" >
          {/* <Header
            brand={<p><GitHubIcon /> GitHub</p>}
            onClick={this.func}
            rightLinks={<HeaderLinks />}
            fixed
            color="transparent"
            changeColorOnScroll={{
              height: 400,
              color: "white"
            }}
          /> */}
          <Layout className='layout-content'>
            <Route exact path='/' component={HomePage} />
            {/* <Route exact path='/static' component={Static} /> */}
            <Route exact path='/launches' component={MapLaunches} />

            <Button
              type="primary"
              shape="circle"
              icon={<UpOutlined />}
              onClick={scroll.scrollToTop}
              id="myBtn"
              title="Наверх!"
            />
            {/* <Footer>
              Design © 2020 <br></br>
              <GithubOutlined />
              <a href="https://github.com/SShaposhnik/global-launches-app" target="_blank"> Github</a>
            </Footer> */}
          </Layout>
        </Layout>

      </div>
    )
  }
}

export default LayoutContainer