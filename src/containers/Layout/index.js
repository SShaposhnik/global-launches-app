import React, { Component } from 'react'
import {
  Layout,
  Menu,
} from 'antd'
import {
  GithubOutlined,
} from '@ant-design/icons'
import 'antd/dist/antd.css'
import './index.css' // стандарт
import './index.scss' // прыгающие квадраты
import {
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import MapLaunches from '../Launches'
import HookWithData from '../Launches/HookWithData'
import Tabless from '../Catalog/component/TestTable/Table'
import Hook from '../Launches/Hook'


const { Header, Content, Footer, Sider } = Layout
const { SubMenu } = Menu
let preloader = false
// console.log(FetchLaunch);
//<HookWithData data0 = {uploadedData[0]} data1 = {uploadedData[1]} data2 = {uploadedData[2]}/>

class LayoutContainer extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }
  render() {
    return (
      <div>
        <Layout id="layout">
            <Header>
              <div className="logo"></div>
              <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['3']} style={{ textAlign: 'right' }}>
                <Menu.Item key="1"><NavLink to="/">         Приветсвие    </NavLink></Menu.Item>
                <Menu.Item key="2"><NavLink to="/Table">    Cтатистика    </NavLink></Menu.Item>
                <Menu.Item key="3"><NavLink to="/Launches"> Запуски       </NavLink></Menu.Item>
              </Menu>
            </Header>

            <Switch>
              <Route exact path='/' />
              <Route exact path='/Table' component={Tabless} />
              <Route exact path = '/Launches' component = {Hook} />
              {/* <Route exact path='/Launches' component={MapLaunches} /> */}
            </Switch>

            <Footer className="footer">
              Design © 2020 <br></br>
              <GithubOutlined />
              <a href="https://github.com/SShaposhnik/global-launches-app" target="_blank"> Github</a>
            </Footer>
          </Layout>

      </div>
    )
  }
}

export default LayoutContainer
