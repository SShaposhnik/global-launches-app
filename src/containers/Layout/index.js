import React, {Component, useState} from 'react'
import { Layout, Menu } from 'antd';

import Card from '../LaunchCatalog/component/Card'

const { Header, Content, Footer } = Layout;

const url = 'https://launchlibrary.net/1.4/launch/next/'
const launchCount = 1000

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
                <Card
                    launchTitle={el.name}
                    net={el.net}
                />
            ))
        }

        return (
            <Layout className="layout">
                <Header>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                >
                    <Menu.Item key="1">nav 1</Menu.Item>
                    <Menu.Item key="2">nav 2</Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
                </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                <div className="site-layout-content">Content</div>
                    {launchCards}
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        )
    }
}

export default LayoutContainer
