import React, { Component } from 'react'
import { Layout, Menu, DatePicker, Button, Tooltip } from 'antd'
import { ArrowUpOutlined, GithubOutlined, UpOutlined } from '@ant-design/icons'
import OldTable from '../LaunchCatalog/component/TableOld/TableOld'
import OldTable2 from '../LaunchCatalog/component/TableOld2/TableOld2'
import LaunchTable from "../LaunchCatalog/component/Table/Table"
import NextLaunchTable from '../LaunchCatalog/component/NextLaunchTable/NextLaunchTable'
import './index.css' // стандарт
import './index.scss' // прыгающие квадраты
import moment from 'moment'
import { animateScroll as scroll } from 'react-scroll'
import 'antd/dist/antd.css'
import './tooltip.css'

const { Header, Content, Footer } = Layout

// следующие запуски с временем и датой
const url = 'https://launchlibrary.net/1.4/launch/next/1000?status=1,2'

// следующие запуски с датой(без времени)
const nextUrl = 'https://launchlibrary.net/1.4/launch/next/1000?status=2'

const { RangePicker } = DatePicker
const limit = 10000
const thisYear = moment().format('YYYY')

// старые запуски
let oldurl = 'https://launchlibrary.net/1.4/launch?startdate=' + moment(thisYear).format('YYYY-MM-DD') + '&enddate=' + moment().format('YYYY-MM-DD') + '&limit=' + limit + '&fields=name,net,location,status,rocket,mapURL'

function disabledDate(current) {
    return ((current && current > moment().endOf('day')) || (current && current < moment('1961-01-01').endOf('day')))
}
function scrollFunction() {
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}
window.onscroll = function() {scrollFunction()};
class LayoutContainer extends Component {
    constructor(props) {
        super(props)
        this.state =
        {
            launchData: null,
            launchOldData: null,
            NextlaunchData: null,
            launchButtonIsDisabled: false,
            launchButtonInputValue: null,
            launchDateInputValue: null,
            loading: false,
            visible: false,
        }
        this.launchDateButtonOnChange = this.launchDateButtonOnChange.bind(this)
    }
    fetchLaunches(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({ launchData: data }))
    }

    fetchOldLaunches(oldurl) {
        fetch(oldurl)
            .then(response => response.json())
            .then(data => this.setState({ launchOldData: data }))
    }
    fetchNextLaunches(nextUrl) {
        fetch(nextUrl)
            .then(response => response.json())
            .then(data => this.setState({ NextlaunchData: data }))
    }

    componentDidMount() {
        this.fetchLaunches(url)
        this.fetchOldLaunches(oldurl)
        this.fetchNextLaunches(nextUrl)
    }

    launchDateButtonOnChange(date, dateString) {
        oldurl = 'https://launchlibrary.net/1.4/launch?startdate=' + dateString[0] + '&enddate=' + dateString[1] + '&limit=' + limit + '&fields=name,net,location,status,rocket,mapURL'
        this.fetchOldLaunches(oldurl)
        // oldurl = 'https://launchlibrary.net/1.4/launch?startdate='+moment('2020-1-1').format('YYYY-MM-DD')+'&enddate='+moment().format('YYYY-MM-DD')+'&limit=10000&fields=name,net,location,status,rocket,mapURL'


    }
    
    // scrollFunction() {
    //     if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    //         document.getElementById("myBtn").style.display = "block";
    //     } else {
    //         document.getElementById("myBtn").style.display = "none";
    //     }
    // }

    render() {
        return (
            <div>
                {this.state.launchOldData && this.state.NextlaunchData && this.state.launchData
                    ? <Layout className="layout">
                        <Header>
                            <div className="logo"></div>
                            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} style={{ textAlign: 'right' }}>
                                <Menu.Item key="1">Статистика</Menu.Item>
                                <Menu.Item key="2">Запуски</Menu.Item>
                            </Menu>
                        </Header>

                        <Content style={{ padding: '0 50px' }}>
                            <div className="site-layout-content">
                                {/* <p>фывтфывфт</p>
                                <p>asfnalfasnfghinerme
                                A B C
                                </p> */}
                                {this.state.launchOldData && this.state.NextlaunchData && this.state.launchData
                                    ? <div>
                                        <h1 style={{ textAlign: 'center' }}>Обьявленные запуски</h1>
                                        <LaunchTable launches={this.state.launchData.launches} />

                                        <h1 style={{ textAlign: 'center' }}>Запланированные запуски</h1>
                                        <NextLaunchTable launches={this.state.NextlaunchData.launches} />

                                        <Tooltip
                                            title={
                                                <p>Здесь можно выбрать дату запусков!</p>
                                            }
                                            defaultVisible={true}
                                            placement="right"
                                            arrowPointAtCenter="true"
                                        >
                                            <RangePicker
                                                className="RangePicker"
                                                defaultValue={[moment(thisYear), moment()]}
                                                showToday={false, true}
                                                onChange={this.launchDateButtonOnChange}
                                                disabledDate={disabledDate}
                                                allowClear={false}
                                                style={{ margin: 10 }}
                                            />
                                        </Tooltip>
                                        <h1 style={{ textAlign: 'center' }}>Состоявшиеся запуски</h1>
                                        <OldTable2 launches={this.state.launchOldData.launches} />

                                    </div>
                                    : <p>Загрузка</p>

                                }

                                {/* { this.state.launchOldData
                                        ? <OldTable launches={this.state.launchOldData.launches} />
                                        : <p></p>
                                } */}
                                <Button
                                    type="primary"
                                    shape="circle"
                                    icon={<UpOutlined />}
                                    onClick={scroll.scrollToTop}
                                    id="myBtn"
                                    title="Наверх!"
                                />
                            </div>
                        </Content>
                        <Footer className="footer">
                            Design © 2020 <br></br>
                            <GithubOutlined />
                            <a href="https://github.com/SShaposhnik/global-launches-app" target="_blank"> Github</a>
                        </Footer>
                    </Layout>

                    : <div id="hellopreloader">
                        <div id="hellopreloader_preload">
                            <div class="container">
                                <div class="element"></div>
                                <div class="element"></div>
                                <div class="element"></div>
                                <div class="element"></div>
                                <div class="element"></div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default LayoutContainer
