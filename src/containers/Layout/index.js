import React, {Component} from 'react'
import {Layout, Menu, Spin, Input, DatePicker} from 'antd'
import MapChart from '../LaunchCatalog/component/MapChart'
import { SmileOutlined } from '@ant-design/icons'
import LaunchTable from "../LaunchCatalog/component/Table"
import LaunchOldTable from "../LaunchCatalog/component/TableOld"
import { ButtonStyledWrapper, TableOldStyledWrapper, FlexContainer, ContentWrapper } from '../LaunchCatalog/styled'
import { isNormalInteger } from '../LaunchCatalog/component/utils'
import './index.css'
import moment from 'moment';

const { Search } = Input
const { Header, Content, Footer } = Layout;
const antIcon = <SmileOutlined style={{ fontSize: 240 }} spin/>;
const url = 'https://launchlibrary.net/1.4/launch/next/'


const limit = 100
const launchCount = 5

const startDate = moment('2001-1-1').format('YYYY-MM-DD')
const endDate = moment().format('YYYY-MM-DD')

const ss = null


const oldurl = 'https://launchlibrary.net/1.4/launch?startdate='+startDate+'&enddate='+endDate+'&limit='+limit+'&fields=name,net,location,status'
console.log(oldurl);


class LayoutContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          launchData: null,
          launchOldData: null,
          launchButtonIsDisabled: false,
          launchButtonInputValue: null,
        }

        this.launchButtonOnChange = this.launchButtonOnChange.bind(this)
    }
    
    fetchLaunches (url, launchCount) {
        fetch(url+launchCount)
            .then(response => response.json())
            .then(data => this.setState({launchData: data}) )
    }

    fetchOldLaunches (oldurl) {
        fetch(oldurl)
            .then(response => response.json())
            .then(data => this.setState({launchOldData: data}) )
    }

    componentDidMount() {
        this.fetchLaunches(url, launchCount)
        this.fetchOldLaunches(oldurl)
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

    launchDataButtonOnChange(e){
        let {value} = e.target
        
    }


    render() {
        return (
            <Layout className="layout">
                <Header>
                <div className="logo" />
                {/* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">menu 1</Menu.Item>
                    <Menu.Item key="2">nav 2</Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
                </Menu> */}
                </Header>
                <Content className="content">
                    <ButtonStyledWrapper>
                        <Search
                            placeholder="number of launches(default 5)"
                            enterButton="Загрузить"
                            size="large"
                            onSearch={launchCount => this.fetchLaunches(url, launchCount)}
                            onChange={this.launchButtonOnChange}
                            loading={this.state.launchButtonIsDisabled}
                            allowClear={true}
                        />  
                    </ButtonStyledWrapper>
                    <TableOldStyledWrapper>
                        {/* { !this.state.launchData
                            ? <Spin tip="Подождите!" indicator={antIcon} className="spin"/>
                            : <LaunchTable launches={this.state.launchData.launches} />
                        } */}
                    <DatePicker className="datePicker"
                        // defaultValue={[moment(today.getFullYear()+"-01-01"), moment(today)]}
                        // disabled={[false, true]}
                        //    onOk={startDate => this.}
                        //    onChange={startDate => startDate = dateString}
                        
                    />
                    
                        { !this.state.launchOldData
                            ? <Spin tip="Подождите!" indicator={antIcon} className="spin"/>
                            : <LaunchOldTable launches={this.state.launchOldData.launches} />
                        }
                    </TableOldStyledWrapper>
                        
                    {/* { !this.state.launchOldData
                        ? <Spin tip="Подождите!" indicator={antIcon} className="spin"/>
                        : <MapChart launches={this.state.launchOldData.launches} />
                    } */}
                </Content>
                <Footer>Design © 2020</Footer>
            </Layout>
        )
    }
}

export default LayoutContainer