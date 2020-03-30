import React, {Component} from 'react'
import {Layout, Menu} from 'antd';
import LaunchCard from "../LaunchCatalog/component/Card";
import {Spin} from "antd";

const { Header, Content, Footer } = Layout;
const url = 'https://launchlibrary.net/1.4/launch/next/'
const launchCount = 3


class LayoutContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data: null,
        };
      }

    componentDidMount() {
    fetch(url+launchCount)
        .then(response => response.json())
        .then(data => this.setState({ data }));
    }

    render() {
        let launchCards = null
        if (this.state.data) {
            launchCards = this.state.data.launches.map(el => (
                <LaunchCard
                     launchTitle={el.name}
                     net={el.net}
                />
            ))
        }

        return (
            <Layout className="layout">
                <Header>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">nav 1</Menu.Item>
                    <Menu.Item key="2">nav 2</Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
                </Menu>
                </Header>
                <Content style={{ padding: '0 50px' , display: 'flex', flexDirection: 'column'}}>
                <div className="site-layout-content"></div>
                    { !this.state.data ?
                        <Spin tip="Подождите!"/>
                        : launchCards
                    }
                    <p>123</p>
                </Content>
                <Footer style={{ textAlign: 'center', flexShrink: '0'}}> Design © 2020</Footer>
            </Layout>
        )
    }
}

export default LayoutContainer