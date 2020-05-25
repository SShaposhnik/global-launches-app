import React, { Component } from 'react'
import {
  Layout,
  Menu,
  DatePicker,
  Button,
  Tooltip,
  notification,
  Divider,
  Breadcrumb
} from 'antd'
import {
  GithubOutlined,
  UpOutlined,
  InfoCircleOutlined,
  FrownOutlined,
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons'
import 'antd/dist/antd.css'
import './index.css' // стандарт
import './index.scss' // прыгающие квадраты
import moment from 'moment'
import {
  Element,
  animateScroll as scroll, scroller
} from 'react-scroll'
import {
  BrowserRouter,
  Switch,
  Route,
  Link, NavLink
} from "react-router-dom";
import MapLaunches from '../MapLaunches'

const { Header, Content, Footer, Sider } = Layout
const { SubMenu } = Menu

class LayoutContainer extends Component {



  render() {
    return (
      <div>
        <Layout id="layout">
          <Header>
            <div className="logo"></div>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} style={{ textAlign: 'right' }}>
              <Menu.Item key="1"><NavLink to="/">Статистика</NavLink></Menu.Item>
              <Menu.Item key="2"><NavLink to="/about">Запуски</NavLink></Menu.Item>
            </Menu>
          </Header>
          <Content style={{ padding: '0 50px' }}>
              <Switch>
                <Route exact path="/" component={MapLaunches}/>
              </Switch>
          </Content>

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
