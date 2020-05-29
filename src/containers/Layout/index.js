import React, { Component } from 'react'
import {
  Layout,
  Menu,
} from 'antd'
import {
  GithubOutlined,
  TeamOutlined,
  UserOutlined,
  PieChartOutlined,
  FileOutlined,
  DesktopOutlined,
  HomeOutlined,
  RocketOutlined,
  AreaChartOutlined

} from '@ant-design/icons'
import 'antd/dist/antd.css'
import 'antd/dist/antd.dark.css'
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
import MapChart from '../Catalog/component/MapChart/MapChart'


const { Header, Footer, Sider, Content } = Layout
const { SubMenu } = Menu

class LayoutContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,

    }
  }

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  render() {
    return (
      <div>
        <Layout id="layout">
          {/* <Sider collapsible collapsed={true} collapsed={this.state.collapsed} onCollapse={this.onCollapse}
          >
            <div className="logo"/>
            <Menu  defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1" icon={<HomeOutlined />}><NavLink to="/">         Приветсвие    </NavLink></Menu.Item>
              <Menu.Item key="2" icon={<AreaChartOutlined />}><NavLink to="/Table">    Cтатистика    </NavLink></Menu.Item>
              <Menu.Item key="3" icon={<RocketOutlined />}><NavLink to="/Launches"> Запуски       </NavLink></Menu.Item>
              <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                <Menu.Item key="3">Tom</Menu.Item>
                <Menu.Item key="4">Bill</Menu.Item>
                <Menu.Item key="5">Alex</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                <Menu.Item key="6">Team 1</Menu.Item>
                <Menu.Item key="8">Team 2</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider> */}
          <Header >
            <Menu defaultSelectedKeys={['1']} mode="horizontal">
              <Menu.Item key="1" icon={<HomeOutlined />}><NavLink to="/">         Приветсвие    </NavLink></Menu.Item>
              <Menu.Item key="2" icon={<AreaChartOutlined />}><NavLink to="/Table">    Cтатистика    </NavLink></Menu.Item>
              <Menu.Item key="3" icon={<RocketOutlined />}><NavLink to="/Launches"> Запуски       </NavLink></Menu.Item>
            </Menu>
          </Header>

          <Layout className='test'>
            <Switch>
              <Route exact path='/' />
              <Route exact path='/Table' component={Tabless} />
              <Route exact path='/Launches' component={MapLaunches} />
            </Switch>
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



{/* <Layout >
            <Switch>
              <Route exact path='/' />
              <Route exact path='/Table' component={Tabless} />
              <Route exact path = '/Launches' component = {Hook} />
              
            </Switch>
            <Footer>
              Design © 2020 <br></br>
              <GithubOutlined />
              <a href="https://github.com/SShaposhnik/global-launches-app" target="_blank"> Github</a>
            </Footer>
            </Layout> */}

{/* <Layout>
          <Content style={{ margin: '0 16px' }}> 

          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout> */}

{/* <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              Option 1
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              Option 2
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="User">
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9" icon={<FileOutlined />} />
          </Menu>
        </Sider> */}