import React, {Component} from 'react'
import {Layout, Menu, Input, DatePicker, Button, Tooltip, Table} from 'antd'
import { ArrowUpOutlined, ArrowDownOutlined, GithubOutlined  } from '@ant-design/icons'
import OldTable from '../LaunchCatalog/component/TableOld'
import LaunchTable from "../LaunchCatalog/component/Table"
import NextLaunchTable from '../LaunchCatalog/component/NextLaunchTable'
import { isNormalInteger } from '../LaunchCatalog/component/utils'
import './index.css' // стандарт
// import './pink.css' //влево вправо
// import './pink2.scss' // шарики
import './index.scss' // прыгающие квадраты
import './progress.css'
// import './loading1.scss'
import moment from 'moment'
import { animateScroll as scroll} from 'react-scroll'
import 'antd/dist/antd.css'
import '../LaunchCatalog/component/modal/modal.css'

const { Search } = Input
const { Header, Content, Footer } = Layout
const url = 'https://launchlibrary.net/1.4/launch/next/1000?status=1,2'
const nextUrl = 'https://launchlibrary.net/1.4/launch/next/1000?status=2'
const { RangePicker } = DatePicker
const limit = 10000
const launchCount = null
const thisYear = moment().format('YYYY')

let oldurl = 'https://launchlibrary.net/1.4/launch?startdate='+moment(thisYear).format('YYYY-MM-DD')+'&enddate='+moment().format('YYYY-MM-DD')+'&limit='+limit+'&fields=name,net,location,status,rocket,mapURL'

function disabledDate(current) {
    return ((current && current > moment().endOf('day')) || (current && current < moment('1961-01-01').endOf('day')))
  }
class LayoutContainer extends Component {
    constructor(props)
    {
        super(props)
        this.state =
        {
          launchData: null,
          launchOldData: null,
          reverselaunchOldData:null,
          NextlaunchData: null,
          launchButtonIsDisabled: false,
          launchButtonInputValue: null,
          launchDateInputValue: null,
          loading: false,
          visible: false,
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
        oldurl = 'https://launchlibrary.net/1.4/launch?startdate='+dateString[0]+'&enddate='+dateString[1]+'&limit='+limit+'&fields=name,net,location,status,rocket,mapURL'
        this.fetchOldLaunches(oldurl)
        // oldurl = 'https://launchlibrary.net/1.4/launch?startdate='+moment('2020-1-1').format('YYYY-MM-DD')+'&enddate='+moment().format('YYYY-MM-DD')+'&limit=10000&fields=name,net,location,status,rocket,mapURL'

        
    }

    showModal = () => {
        this.setState({
          visible: true,
        })
      }

    handleOk = e => {
    console.log(e)
    this.setState({
        visible: false,
    })
    }

    handleCancel = e => {
    console.log(e)
    this.setState({
        visible: false,
    })
    }

    render() {
        return (
            <div>
                {this.state.launchOldData && this.state.NextlaunchData && this.state.launchData
                ? <Layout className="layout">
                <Header>
                    <div className="logo" />
                    {/* <img src={asd}></img> */}
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} style={{textAlign:'right'}}>
                        <Menu.Item key="1">Статистика</Menu.Item>
                        <Menu.Item key="2">Запуски</Menu.Item>
                    </Menu>
                    </Header>

                <Content style={{ padding: '0 50px' }}>
                     {/* <Search
                        placeholder="колличество запусков"
                        enterButton="Загрузить"
                        size="small"
                        onSearch={launchCount => this.fetchLaunches(url, launchCount)}
                        onChange={this.launchButtonOnChange}
                        loading={this.state.launchButtonIsDisabled}
                        allowClear={true}
                    />   */}
                    <div className="site-layout-contents">
                   <Button type="primary" shape="circle" icon={<ArrowDownOutlined />} onClick={() => scroll.scrollToBottom()}/>

                   { this.state.launchOldData && this.state.NextlaunchData && this.state.launchData
                        ? <div>
                                <h1 style={{textAlign: 'center'}}>Обьявленные запуски</h1>
                                <LaunchTable launches={this.state.launchData.launches} />
                                <h1 style={{textAlign: 'center'}}>Запланированные запуски</h1>
                                <NextLaunchTable launches={this.state.NextlaunchData.launches} />

                                <Tooltip
                                    title={<p>Здесь можно выбрать дату запусков!</p>}
                                    defaultVisible={true}
                                    placement="right"
                                    arrowPointAtCenter="true"
                                >
                                    <RangePicker
                                        className="RangePicker"
                                        defaultValue={[moment(thisYear),moment()]}
                                        showToday={false,true}
                                        onChange={this.launchDateButtonOnChange}
                                        disabledDate={disabledDate}
                                        allowClear={false}
                                        style={{margin:10}}

                                    />
                                </Tooltip>
                                <h1 style={{textAlign: 'center'}}>Состоявшиеся запуски</h1>
                                <OldTable launches={this.state.launchOldData.launches} />



                        </div>
                        : <p>NE PRIVET</p>

                    }

                    {/* <h1 style={{textAlign: 'center'}}>Обьявленные запуски</h1>
                    { this.state.launchData
                        ? <LaunchTable launches={this.state.launchData.launches} />
                        : <p></p>
                    } */}
                    <p></p>

                    {/* <h1 style={{textAlign: 'center'}}>Запланированные запуски</h1>
                    { this.state.NextlaunchData
                        ? <NextLaunchTable launches={this.state.NextlaunchData.launches} />
                        : <p></p>
                    } */}
                    {/* <Tooltip
                        title={<div>Здесь можно изменить дату</div>}
                        defaultVisible={true}
                        placement='topLeft'
                        // showToday="true"
                    > */}
                    {/* <Tooltip
                    title={<p>afasfasgkmalksgmlakslgmasg</p>}
                    defaultVisible={true}
                    >asd</Tooltip> */}
                        {/* <RangePicker className="RangePicker"
                                defaultValue={[moment(thisYear),moment()]}
                                showToday={false,true}
                                onChange={this.launchDateButtonOnChange}
                                disabledDate={disabledDate}
                                allowClear={false}
                                style={{margin:10}}

                        /> */}
                    {/* { this.state.launchOldData
                        ? <OldTable launches={this.state.launchOldData.launches} />
                        : <p></p>
                    } */}
                    <Button
                        type="primary"
                        shape="circle"
                        icon={<ArrowUpOutlined />}
                        onClick={scroll.scrollToTop}
                    />
                    </div>
                </Content>
                {/* <Button
                        type="primary"
                        shape="circle"
                        icon={<ArrowUpOutlined />}
                        onClick={scroll.scrollToTop}
                        className="scrollButtonUp"
                    />
                    <Button
                        type="primary"
                        shape="circle"
                        icon={<ArrowUpOutlined />}
                        onClick={scroll.scrollToTop}
                        className="scrollButtonUp2"
                    /> */}
                <Footer className="footer">
                    Design © 2020 <br></br>
                    <GithubOutlined />
                    
                    <a href="https://github.com/SShaposhnik/global-launches-app" target="_blank"> Github</a>
                </Footer>
            </Layout>

            // прыгающие квадраты
            :<div id="hellopreloader">
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

            // // стандарт
            // : <div id="hellopreloader">
            //     <div id="hellopreloader_preload"></div>
            //   </div>

            // влево вправо
            // :<div class="loader">
            // <div class="l_main">
            //   <div class="l_square"><span></span><span></span><span></span></div>
            //   <div class="l_square"><span></span><span></span><span></span></div>
            //   <div class="l_square"><span></span><span></span><span></span></div>
            //   <div class="l_square"><span></span><span></span><span></span></div>
            // </div>
            // </div>

            // // шарики
            // : <div class="container">
            //     <div class="item-1"></div>
            //     <div class="item-2"></div>
            //     <div class="item-3"></div>
            //     <div class="item-4"></div>
            //     <div class="item-5"></div>
            // </div>

            // шарики
            // :<div className="ipl-progress-indicator" id="ipl-progress-indicator">
            //     <div className="ipl-progress-indicator-head">
            //     <div className="first-indicator"></div>
            //     <div className="second-indicator"></div>
            //     </div>
            //     <div className="container">
            //     <div className="item-1"></div>
            //     <div className="item-2"></div>
            //     <div className="item-3"></div>
            //     <div className="item-4"></div>
            //     <div className="item-5"></div>
            // </div>
            //  </div>



            // loading1
        //     :<div class="e-loadholder">
        //     <div class="m-loader">
        //         <span class="e-text">Загрузка</span>
        //     </div>
        // </div>

            }
            </div>
        )
    }
}

export default LayoutContainer
