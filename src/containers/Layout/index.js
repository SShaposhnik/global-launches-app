import React, { Component } from 'react'
import { Layout, Menu, DatePicker, Button, Tooltip, Modal , Alert} from 'antd'
import { ArrowUpOutlined, GithubOutlined, UpOutlined, QuestionCircleOutlined, InfoCircleOutlined } from '@ant-design/icons'
import OldTable from '../LaunchCatalog/component/TableOld/TableOld'
import OldTable2 from '../LaunchCatalog/component/TableOld2/TableOld2'
import LaunchTable from "../LaunchCatalog/component/Table/Table"
import NextLaunchTable from '../LaunchCatalog/component/NextLaunchTable/NextLaunchTable'
import './index.css' // стандарт
import './index.scss' // прыгающие квадраты
import moment from 'moment'
import { animateScroll as scroll } from 'react-scroll'
import 'antd/dist/antd.css'
import MyComponent from './safa'
// import myImage from '../LaunchCatalog/image/clear-filter.gif'
const { Header, Content, Footer } = Layout

// следующие запуски с временем и датой
const url = 'https://launchlibrary.net/1.4/launch/next/1000?status=1,2'

// следующие запуски с датой(без времени)
const nextUrl = 'https://launchlibrary.net/1.4/launch/next/1000?status=2'

const { RangePicker } = DatePicker
const limit = 10000
const thisYear = moment().format('YYYY')
// старые запуски
const defurl = 'https://launchlibrary.net/1.4/launch?startdate=' + moment(thisYear).format('YYYY-MM-DD') + '&enddate=' + moment().format('YYYY-MM-DD') + '&limit=' + limit + '&fields=name,net,location,status,rocket,mapURL,countryCode'
let oldurl = 'https://launchlibrary.net/1.4/launch?startdate=' + moment(thisYear).format('YYYY-MM-DD') + '&enddate=' + moment().format('YYYY-MM-DD') + '&limit=' + limit + '&fields=name,net,location,status,rocket,mapURL,countryCode'


let def1 = moment(2000).format('YYYY')
let def2 = moment().format('YYYY')

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
            status: null,
        }
        this.setState({
            // launchOldData: null,
          })
        this.launchDateButtonOnChange = this.launchDateButtonOnChange.bind(this)
        this.date_picker_func = this.date_picker_func.bind(this)
    }

    // fetchLaunches(url) {
    //     fetch(url)
    //         .then(response => response.json())
    //         .then(data => this.setState({ launchData: data }))
    // }

    // fetchOldLaunches(oldurl) {
    //     fetch(oldurl)
    //         .then(response => response.json())
    //         .then(data => this.setState({ launchOldData: data }))
    // }
    // fetchNextLaunches(nextUrl) {
    //     fetch(nextUrl)
    //         .then(response => response.json())
    //         .then(data => this.setState({ NextlaunchData: data }))
    // }

    // componentDidMount() {
    //     // this.fetchLaunches(url)
    //     this.fetchOldLaunches(oldurl)
    //     // this.fetchNextLaunches(nextUrl)
    // }

    componentDidMount() {
        // fetch(url)
        //     .then(response => response.json())
        //     .then(data => this.setState({ launchData: data }))

        fetch(oldurl)
            .then(response => response.json())
            .then((data) => {this.setState({launchOldData: data})})

        // fetch(nextUrl)
        //     .then(response => response.json())
        //     .then(data => this.setState({ NextlaunchData: data }))

    }

    showModal = () => {
        this.setState({
            visible: true,
        })
      }

      handleOk = e => {
        // console.log(e)
        this.setState({
          visible: false,
        })
      }

      handleCancel = e => {
        // console.log(e)
        this.setState({
          visible: false,
        })
      }

      countDown() {
        let secondsToGo = 3;
        console.log(this.state.launchOldData)
        const modal = Modal.warning({
        //   title: 'This is a notification message',
          content: `This modal will be destroyed after ${secondsToGo} second.`,
        })

        // const timer = setInterval(() => {
        //   secondsToGo -= 1;
        //   modal.update({
        //     content: `This modal will be destroyeddddddd after ${secondsToGo} second.`,
        //   })
        // }, 1000)

        // setTimeout(() => {
        //   clearInterval(timer)
        //   modal.destroy()
        // }, secondsToGo * 1000)
      }

    launchDateButtonOnChange(date, dateString) {
        oldurl = 'https://launchlibrary.net/1.4/launch?startdate=' + dateString[0] + '&enddate=' + dateString[1] + '&limit=' + limit + '&fields=name,net,location,status,rocket,mapURL,countryCode'
        // this.fetchOldLaunches(oldurl)
        this.componentDidMount()
    }

    date_picker_func (date, dateString) {
        oldurl = oldurl = 'https://launchlibrary.net/1.4/launch?startdate=' + dateString + '&enddate=' + moment().format('YYYY-MM-DD') + '&limit=' + limit + '&fields=name,net,location,status,rocket,mapURL,countryCode'
        // this.fetchOldLaunches(oldurl)
        this.componentDidMount()
    }






    render() {

        return (
            <div>
                {/* {this.state.launchOldData && this.state.NextlaunchData && this.state.launchData */}
                { this.state.launchOldData
                    //     ?<div id="hellopreloader">
                    //     <div id="hellopreloader_preload"></div>
                    // </div>
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

                                {/* <MyComponent /> */}


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

                                <br/>
                                <h1 style={{ textAlign: 'center' }}>Состоявшиеся запуски</h1>

                                {/* {this.state.launchOldData.status == "error"
                                            ? <p>nothing</p>
                                            : <OldTable2 launches={this.state.launchOldData.launches} />
                                        } */}
                                <OldTable2 launches={this.state.launchOldData.launches} />

                            </div>


                            <Button
                                type="primary"
                                shape="circle"
                                icon={<UpOutlined />}
                                onClick={scroll.scrollToTop}
                                id="myBtn"
                                title="Наверх!"
                            />

                                <Modal
                                    title="Basic Modal"
                                    visible={this.state.visible}
                                    // onOk={this.handleOk}
                                    // onCancel={this.handleCancel}
                                >
                                    <Alert message={<p>Count = {this.state.launchOldData.count} </p>} type="info" />
                                    {/* <p>Count = {this.state.launchOldData.count} </p> */}
                                </Modal>
                                { this.state.launchOldData.count == 0
                                    ? this.countDown()
                                    // {console.log(this.state.launchOldData)}</div>
                                    : <div>...</div>
                                }
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

                    // : <div id="hellopreloader">
                    //     <div id="hellopreloader_preload"></div>
                    // </div>
                }
            </div>
        )
    }
}
export default LayoutContainer
