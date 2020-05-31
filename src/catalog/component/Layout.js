import React, { Component } from 'react'

import { Layout, Menu } from 'antd'
import { HomeOutlined, RocketOutlined, AreaChartOutlined } from '@ant-design/icons'
import { Route, NavLink } from "react-router-dom"
// import 'antd/dist/antd.css'
import 'antd/dist/antd.dark.css'

import '../css/index.css' // стандарт
import MapLaunches from './Launches'
import Static from './testComponents/Static'
import HomePage from './HomePage'



const { Header, Footer } = Layout

class LayoutContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <div>
        <Layout id="layout" >

          <Header style={{ backgroundColor: '#253237' }} >
            <Menu defaultSelectedKeys={['1']} theme='dark' mode="horizontal" style={{ textAlign: 'right', backgroundColor: '#253237' }}>
              <Menu.Item key="1" icon={<HomeOutlined />}>     <NavLink to="/">          Приветсвие    </NavLink></Menu.Item>
              <Menu.Item key="2" icon={<AreaChartOutlined />}><NavLink to="/static">    Cтатистика    </NavLink></Menu.Item>
              <Menu.Item key="3" icon={<RocketOutlined />}>   <NavLink to="/launches">  Запуски       </NavLink></Menu.Item>
            </Menu>
          </Header>

          <Layout className='layout-content'>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/static' component={Static} />
            <Route exact path='/launches' component={MapLaunches} />

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