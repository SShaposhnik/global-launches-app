import React, { Component } from 'react'
import {
  Layout,
  Menu,
  Button
} from 'antd'
import {
  HomeOutlined,
  RocketOutlined,
  AreaChartOutlined,
  UpOutlined
} from '@ant-design/icons'
// import 'antd/dist/antd.css'
import 'antd/dist/antd.dark.css'
import './index.css' // стандарт
import './index.scss' // прыгающие квадраты
import {
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import MapLaunches from '../Catalog/component/Launches/index'
import Tabless from '../Catalog/component/TestTable/Table'
import HomePage from '../Catalog/component/HomePage'



const { Header, Footer } = Layout

function scrollFunction() {
  if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
    document.getElementById("myBtn").style.display = "block"
  } else {
    document.getElementById("myBtn").style.display = "none"
  }
}
window.onscroll = function () { scrollFunction() }

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
          <Header style={{backgroundColor: '#253237'}} >
            <Menu defaultSelectedKeys={['1']} theme='dark' mode="horizontal" style={{textAlign: 'right', backgroundColor: '#253237'}}>
              <Menu.Item key="1" icon={<HomeOutlined />}>     <NavLink to="/">         Приветсвие    </NavLink></Menu.Item>
              <Menu.Item key="2" icon={<AreaChartOutlined />}><NavLink to="/static">    Cтатистика    </NavLink></Menu.Item>
              <Menu.Item key="3" icon={<RocketOutlined />}>   <NavLink to="/launches"> Запуски       </NavLink></Menu.Item>
            </Menu>
          </Header>

          <Layout className='layout-content'>
            {/* http:/SShaposhnik.github.io/global-launches-app */}
              <Route exact path='/'           component={HomePage}/>
              <Route exact path='/static'      component={Tabless} />
              <Route exact path='/launches'   component={MapLaunches} />
            <Button
                type="primary"
                shape="circle"
                icon={< UpOutlined />}
                onClick={this.scrollToTop}
                id="myBtn"
                title="Наверх!" />
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

           {/*
            </Switch>
            <Footer>
              Design © 2020 <br></br>
              <GithubOutlined />
              <a href="https://github.com/SShaposhnik/global-launches-app" target="_blank"> Github</a>
            </Footer>
            </Layout> */}



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