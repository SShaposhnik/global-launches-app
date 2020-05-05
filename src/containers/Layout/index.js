import React, {Component} from 'react'
import {Layout, Menu, Spin, Input, DatePicker} from 'antd'
import { SmileOutlined } from '@ant-design/icons'
import OldTable from '../LaunchCatalog/component/TableOld'
import LaunchTable from "../LaunchCatalog/component/Table"
import NextLaunchTable from '../LaunchCatalog/component/NextLaunchTable'
import { isNormalInteger } from '../LaunchCatalog/component/utils'
import './index.css'
import moment from 'moment'

const { Search } = Input
const { Header, Content, Footer } = Layout;
const antIcon = <SmileOutlined style={{ fontSize: 240 }} spin/>;
const url = 'https://launchlibrary.net/1.4/launch/next/1000?status=1'
const nextUrl = 'https://launchlibrary.net/1.4/launch/next/1000?status=2'
const { RangePicker } = DatePicker;

const limit = 10000
const launchCount = null

let timerMOM = moment('May 20, 2020 17:30:00 UTC').fromNow()


const startDate = moment('2020-1-1').format('YYYY-MM-DD')
const endDate = moment().format('YYYY-MM-DD')

let oldurl = 'https://launchlibrary.net/1.4/launch?startdate='+startDate+'&enddate='+endDate+'&limit='+limit+'&fields=name,net,location,status,rocket'

function disabledDate(current) {
    return ((current && current > moment().endOf('day')) || (current && current < moment('1961-01-01').endOf('day')))
  }


class LayoutContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
          launchData: null,
          launchOldData: null,
          NextlaunchData: null,
          launchButtonIsDisabled: false,
          launchButtonInputValue: null,
          launchDateInputValue: null, 
        }

        this.launchButtonOnChange = this.launchButtonOnChange.bind(this)
        this.launchDateButtonOnChange = this.launchDateButtonOnChange.bind(this)
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

    fetchNextLaunches (nextUrl) {
        fetch(nextUrl)
            .then(response => response.json())
            .then(data => this.setState({NextlaunchData: data}) )
    }

    componentDidMount() {
        this.fetchLaunches(url, launchCount)
        this.fetchOldLaunches(oldurl)
        this.fetchNextLaunches(nextUrl)
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

    launchDateButtonOnChange(date, dateString){
        oldurl = 'https://launchlibrary.net/1.4/launch?startdate='+dateString[0]+'&enddate='+dateString[1]+'&limit='+limit+'&fields=name,net,location,status,rocket'
        this.fetchOldLaunches(oldurl)
        
    }

    render() {
        return (
            <Layout className="layout">
                <Header>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} className="menu">
                    <Menu.Item key="1">Статистика</Menu.Item>
                    <Menu.Item key="2">Запуски</Menu.Item>
                </Menu>
                </Header>
                <Content className="content">
                
                        {/* <Search
                            placeholder="колличество запусков"
                            enterButton="Загрузить"
                            size="small"
                            onSearch={launchCount => this.fetchLaunches(url, launchCount)}
                            onChange={this.launchButtonOnChange}
                            loading={this.state.launchButtonIsDisabled}
                            allowClear={true}
                        />   */}
      
                        <h1 style={{textAlign: 'center'}}>Запуски для которых обьявлены точные дата и время</h1>
                        { !this.state.launchData
                            ? <Spin tip="Подождите!" indicator={antIcon} className="spin"/>
                            : <LaunchTable launches={this.state.launchData.launches} />
                        }
                        <p></p>
                        <h1 style={{textAlign: 'center'}}>Запланированные запуски</h1>
                        { !this.state.NextlaunchData
                            ? <Spin tip="Подождите!" indicator={antIcon} className="spin"/>
                            : <NextLaunchTable launches={this.state.NextlaunchData.launches} />
                        }

                    <RangePicker className="datePicker"
                           onChange={this.launchDateButtonOnChange}
                           disabledDate={disabledDate}    
                    />

                        { !this.state.launchOldData
                            ? <Spin tip="Подождите!" indicator={antIcon} className="spin"/>
                            : <OldTable launches={this.state.launchOldData.launches}/>
                        }

                    
                    
                </Content>
                <Footer className="footer">Design © 2020</Footer>
            </Layout>
        )
    }
}

export default LayoutContainer
