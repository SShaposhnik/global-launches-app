import React, { Component } from 'react'
import { Layout, Menu, DatePicker, Button, Tooltip, Modal, Alert, notification, Table } from 'antd'
import { ArrowUpOutlined, GithubOutlined, UpOutlined, RadiusUpleftOutlined, InfoCircleOutlined } from '@ant-design/icons'
import OldTable from '../LaunchCatalog/component/TableOld/TableOld'
import OldTable2 from '../LaunchCatalog/component/TableOld2/TableOld2'
import LaunchTable from "../LaunchCatalog/component/Table/Table"
import NextLaunchTable from '../LaunchCatalog/component/NextLaunchTable/NextLaunchTable'
import './index.css' // стандарт
import './index.scss' // прыгающие квадраты
import moment from 'moment'
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import 'antd/dist/antd.css'
import Tables from '../LaunchCatalog/component/test/table'
const { Header, Content, Footer } = Layout

// следующие запуски с временем и датой
const url = 'https://launchlibrary.net/1.4/launch/next/1000?status=1,2'

// следующие запуски с датой(без времени)
const nextUrl = 'https://launchlibrary.net/1.4/launch/next/1000?status=2'

const { RangePicker } = DatePicker
const limit = 10000
const thisYear = moment().format('YYYY')

// старые запуски

let defurl = 'https://launchlibrary.net/1.4/launch?startdate=' + moment(thisYear).format('YYYY-MM-DD') + '&enddate=' + moment().format('YYYY-MM-DD') + '&limit=' + limit + '&fields=name,net,location,status,rocket,mapURL,countryCode'

let oldurl = 'https://launchlibrary.net/1.4/launch?startdate=' + moment(thisYear).format('YYYY-MM-DD') + '&enddate=' + moment().format('YYYY-MM-DD') + '&limit=' + limit + '&fields=name,net,location,status,rocket,mapURL,countryCode'

let def1 = moment(thisYear).format('YYYY-MM-DD')
let def2 = moment().format('YYYY-MM-DD')
// const modals = Modal.warning({
//     content: `можно вывести стартовое сообщение!`,
//     maskClosable: "true"
// }
// )

const notification_for_invalid_date = () => {
    notification.warning({
      message: <strong>За выбранный период запусков нет!</strong>,
    //   description: <strong>За выбранный период времени запусков нет!</strong>,
      placement: 'topLeft',
      className: 'notification',
    //   duration: '1'
    })
  }

function disabledDate(current) {
    return ((current && current > moment().endOf('day')) || (current && current < moment('1961-01-01').endOf('day')))
}
function scrollFunction() {
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        document.getElementById("myBtn").style.display = "block"
        // document.getElementById("layout").style.background = "rgb(4, 21, 40)"
    } else {
        document.getElementById("myBtn").style.display = "none"
        // document.getElementById("layout").style.background = "rgb(0, 0, 0)"
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
            .then(data => this.setState({ launchOldData: data , loading: false, }))
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

    countDown() {
        let secondsToGo = 3;
        const modal = Modal.warning({
            content: `За выбранный период запусков нет!`,
        })
        // modal.centered="true"
        this.fetchOldLaunches(defurl)
        // modal.destroy()
        // const timer = setInterval(() => {
        //   secondsToGo -= 1;
        //   modal.update({
        //     content: `This modal will be destroyed after ${secondsToGo} second.`,
        //   })
        // }, 1000)

        // setTimeout(() => {
        //   clearInterval(timer)
        //   modal.destroy()
        // }, secondsToGo * 1000)
    }

    async statusFetch (url) {
        this.setState({ loading: true })
        let response = await fetch(url)
        if (response.ok) { // если HTTP-статус в диапазоне 200-299 получаем тело ответа иначе Notification
            this.fetchOldLaunches(url)
        } else {
            notification_for_invalid_date('topLeft')
            this.setState({ loading: false })
        }
    }

    launchDateButtonOnChange(date, dateString) {
        oldurl = 'https://launchlibrary.net/1.4/launch?startdate=' + dateString[0] + '&enddate=' + dateString[1] + '&limit=' + limit + '&fields=name,net,location,status,rocket,mapURL,countryCode'
        this.statusFetch(oldurl)
    }

    render() {
        const { launchOldData,launchData,NextlaunchData, loading } = this.state
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

                                <h1 style={{ textAlign: 'center' }}>Обьявленные запуски</h1>
                                <LaunchTable launches={this.state.launchData.launches} />

                                <h1 style={{ textAlign: 'center' }}>Запланированные запуски</h1>
                                <NextLaunchTable launches={this.state.NextlaunchData.launches} />

                                <h1 style={{ textAlign: 'center' }}>Состоявшиеся запуски</h1>
                                <RangePicker
                                    className="RangePicker"
                                    defaultValue={[moment(thisYear), moment()]}
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
                                    <OldTable2 launches={launchOldData.launches} loading={loading}/>
                                </Element>
                            </div>
                            <testClass />
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
                            <Modal
                                centered
                                // title="Расположение запуска на карте"
                                visible={this.state.visible}
                                onOk={this.handleOk}
                                onCancel={this.handleCancel}
                                footer={null}
                                width='70%'
                                closable={false}
                            >
                                контент
                                </Modal>
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
