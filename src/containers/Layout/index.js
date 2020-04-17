import React, {Component} from 'react'
import {Layout, Menu} from 'antd'
import {Spin} from "antd";
import MapChart from '../LaunchCatalog/component/MapChart'
import { SmileOutlined } from '@ant-design/icons'
import LaunchTable from "../LaunchCatalog/component/Table"
import { Input } from 'antd'
import { ButtonStyledWrapper } from '../LaunchCatalog/styled'
import { isNormalInteger } from '../LaunchCatalog/component/utils'
import Timer from '../LaunchCatalog/component/Timer'

const { Search } = Input

const { Header, Content, Footer } = Layout;
const antIcon = <SmileOutlined style={{ fontSize: 240 }} spin />;
const url = 'https://launchlibrary.net/1.4/launch/next/'
const launchCount = 5


class LayoutContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          launchData: null,
          launchButtonIsDisabled: false,
          launchButtonInputValue: null,
        }

        this.launchButtonOnChange = this.launchButtonOnChange.bind(this)
    }
    
    fetchLaunches (url, launchCount) {
        console.log('hello')
        fetch(url+launchCount)
            .then(response => response.json())
            .then(data => this.setState({launchData: data}) )
    }

    componentDidMount() {
        this.fetchLaunches(url, launchCount)
    }

    launchButtonOnChange(e) {
        let {value} = e.target
        value = value.trim()
        let buttonStatus = true

        if (isNormalInteger(value)) {
            buttonStatus = false
        }

        this.setState({launchButtonIsDisabled: buttonStatus})
    }

    render() {
        return (
            <Layout className="layout">
                <Header>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">menu 1</Menu.Item>
                    <Menu.Item key="2">nav 2</Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
                </Menu>
                </Header>
                <Content>
                    {/* { !this.state.launchData
                        ? <Spin tip="Подождите!" indicator={antIcon} className="spin"/>
                        : <MapChart launches={this.state.launchData.launches} />
                    } */}
                    <ButtonStyledWrapper>
                        <Search
                            placeholder="type number of launches to be fetched(default 5)"
                            enterButton="Submit"
                            size="large"
                            onSearch={launchCount => this.fetchLaunches(url, launchCount)}
                            onChange={this.launchButtonOnChange}
                            loading={this.state.launchButtonIsDisabled}
                            allowClear={true}
                        />  
                    </ButtonStyledWrapper>
                    { !this.state.launchData
                        ? <Spin tip="Подождите!" indicator={antIcon} className="spin"/>
                        : <LaunchTable launches={this.state.launchData.launches} />
                    }
                </Content>
                <Footer>Design © 2020</Footer>
            </Layout>
        )
    }
}

export default LayoutContainer