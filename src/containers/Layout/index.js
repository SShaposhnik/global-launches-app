import React, {Component} from 'react'
import { Layout, Menu } from 'antd';

import Card from '../LaunchCatalog/component/Card'

const { Header, Content, Footer } = Layout;

class LayoutContainer extends Component {
    render() {
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
                <Card
                    launchTitle='Launch'
                    net='12:50'
                />
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        )
    }
}

export default LayoutContainer
