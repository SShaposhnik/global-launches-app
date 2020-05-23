import React, { Component } from 'react'
import {
    Layout,
    Menu,
    DatePicker,
    Button,
    Tooltip,
    Modal,
    notification,
    Divider,
    Slider,
    Switch
} from 'antd'
import {
    GithubOutlined,
    UpOutlined,
    InfoCircleOutlined,
    FrownOutlined
} from '@ant-design/icons'
import 'antd/dist/antd.css'
import OldTable from '../LaunchCatalog/component/TableOld/TableOld'
import OldTable2 from '../LaunchCatalog/component/TableOld2/TableOld2'
import LaunchTable from "../LaunchCatalog/component/Table/Table"
import NextLaunchTable from '../LaunchCatalog/component/NextLaunchTable/NextLaunchTable'
import SliderMapChart from '../LaunchCatalog/component/SliderMapChart/SliderMapChart'
import MapChart from '../LaunchCatalog/component/MapChart/MapChart'
import './index.css' // стандарт
import './index.scss' // прыгающие квадраты
import moment from 'moment'
import {
    Element,
    animateScroll as scroll, scroller
} from 'react-scroll'

const { Header, Content, Footer } = Layout

// следующие запуски с временем и датой
const URL = 'https://launchlibrary.net/1.4/launch/next/1000?status=1,2'

// следующие запуски с датой(без времени)
const NEXT_URL = 'https://launchlibrary.net/1.4/launch/next/1000?status=2'

const { RangePicker } = DatePicker
const LIMIT = 10000
const THIS_YEAR = moment().format('YYYY')

// старые запуски
let oldUrl = 'https://launchlibrary.net/1.4/launch?startdate=' + moment(THIS_YEAR).format('YYYY-MM-DD') + '&enddate=' + moment().format('YYYY-MM-DD') + '&limit=' + LIMIT + '&fields=name,net,location,status,rocket,mapURL,countryCode'

// const modals = Modal.warning({
//     content: `можно вывести стартовое сообщение!`,
//     maskClosable: "true"
// }
// )
const notificationForInvalidDate = (placement) => {
    notification.warning({
        message: <strong>Похоже, что за выбранный период времени запусков нет</strong> ,
        //   description: <strong>За выбранный период времени запусков нет!</strong>,
        placement,
    })
}

const notificationMessage = (message, placement) => {
    notification.error({
        message,
        placement,
    })
}

function disabledDate(current) {
    return ((current && current > moment().endOf('day')) || (current && current < moment('1961-01-01').endOf('day')))
}
function scrollFunction() {
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        document.getElementById("myBtn").style.display = "block"
    } else {
        document.getElementById("myBtn").style.display = "none"
    }
}
window.onscroll = function () { scrollFunction() };

class LayoutContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            launchData: null,
            launchOldData: null,
            NextlaunchData: null,
            visible: false,
            loading: false,
            disabledSlider: false,
        }
        this.launchDateButtonOnChange = this.launchDateButtonOnChange.bind(this)
    }

    fetchLaunches(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({ launchData: data }))
    }

    fetchOldLaunches(url) {
        this.setState({ loading: true })
        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({ launchOldData: data, loading: false, }))
    }

    fetchNextLaunches(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({ NextlaunchData: data }))
    }

    componentDidMount() {
        this.fetchLaunches(URL)
        this.fetchOldLaunches(oldUrl)
        this.fetchNextLaunches(NEXT_URL)
    }

    handleDisabledChange = disabled => {
        this.setState({ disabled })
    }

    showModal = () => {
        this.setState({
            visible: true,
        })
    }

    handleOk = e => {
        this.setState({
            visible: false,
        })
    }

    handleCancel = e => {
        this.setState({
            visible: false,
        })
    }

    scrollToOldTable2() {
        scroller.scrollTo('scroll-to-Oldtable2', {
            duration: 800,
            delay: 0,
            smooth: 'easeInOutQuart'
        })
    }

    async validationOfDate(url) {
        this.setState({ loading: true })
        let response = await fetch(url)
        if (response.ok) { // если HTTP-статус в диапазоне 200-299 получаем тело ответа иначе Notification
            this.fetchOldLaunches(url)
        } else {
            notificationForInvalidDate('topLeft')
            this.setState({ loading: false })
        }
    }

    launchDateButtonOnChange(date, dateString) {
        oldUrl = 'https://launchlibrary.net/1.4/launch?startdate=' + dateString[0] + '&enddate=' + dateString[1] + '&limit=' + LIMIT + '&fields=name,net,location,status,rocket,mapURL,countryCode'
        this.validationOfDate(oldUrl)
    }


    render() {
        const { launchOldData, launchData, NextlaunchData, loading, disabled } = this.state
        return (
            <div>
                {launchOldData && NextlaunchData && launchData
                    ? <Layout id="layout">
                        <Header>
                            <div className="logo"></div>
                            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} style={{ textAlign: 'right' }}>
                                <Menu.Item key="1">Статистика</Menu.Item>
                                <Menu.Item key="2">Запуски</Menu.Item>
                            </Menu>
                        </Header>
                        <Content style={{ padding: '0 50px' }}>
                            <div className="site-layout-content">
                                {/* <Divider><h1 style={{ textAlign: 'center' }}>Обьявленные запуски</h1></Divider>
                                <LaunchTable launches={launchData.launches} />

                                <Divider className="next-launch-table"><h1 style={{ textAlign: 'center' }}>Запланированные запуски</h1></Divider>
                                <NextLaunchTable launches={NextlaunchData.launches} /> */}

                                <Divider><h1 style={{ textAlign: 'center' }}>Состоявшиеся запуски</h1></Divider>
                                <RangePicker
                                    className="RangePicker"
                                    defaultValue={[moment(THIS_YEAR), moment()]}
                                    showToday={false, true}
                                    onChange={this.launchDateButtonOnChange}
                                    disabledDate={disabledDate}
                                    allowClear={false}
                                    style={{ margin: 10 }}
                                />
                                <Tooltip
                                    title={
                                        <p>Здесь можно настроить период запусков</p>
                                    }
                                    mouseEnterDelay={0.2}
                                    mouseLeaveDelay={0.5}
                                    placement="top"
                                >
                                    <InfoCircleOutlined style={{ fontSize: 19 }} />
                                </Tooltip>

                                <Element name="scroll-to-Oldtable2">
                                    {/* <OldTable2 launches={launchOldData.launches} loading={loading} /> */}
                                </Element>
                                    <SliderMapChart launches={launchOldData.launches} />
                            </div>
                        </Content>

                        <Footer className="footer">
                            Design © 2020 <br></br>
                            <GithubOutlined />
                            <a href="https://github.com/SShaposhnik/global-launches-app" target="_blank"> Github</a>
                        </Footer>
                        <Button
                            type="primary"
                            shape="circle"
                            icon={<UpOutlined />}
                            onClick={scroll.scrollToTop}
                            id="myBtn"
                            title="Наверх!"
                        />
                        {/* <Button
                                type="primary"
                                // shape="circle"
                                icon={<UpOutlined />}
                                onClick={this.scrollToOldTable2}
                                id="ButtonUp"
                                title="Наверх!"
                            /> */}
                    </Layout>

                    : <div id="hellopreloader">
                        <div id="hellopreloader_preload">
                            <div className="container">
                                <div className="element"></div>
                                <div className="element"></div>
                                <div className="element"></div>
                                <div className="element"></div>
                                <div className="element"></div>
                            </div>
                        </div>
                    </div>

                    // : <div id="hellopreloader">
                    //     <div id="hellopreloader_preload"></div>
                    // </div>
                }
            </div>
        )
    }
}
export default LayoutContainer
