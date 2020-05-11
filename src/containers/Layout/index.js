import React, {Component} from 'react'
import {Layout, Menu, Spin, Input, DatePicker, Modal, Table,} from 'antd'
import { SmileOutlined,LoadingOutlined } from '@ant-design/icons'
import OldTable from '../LaunchCatalog/component/TableOld'
import LaunchTable from "../LaunchCatalog/component/Table"
import NextLaunchTable from '../LaunchCatalog/component/NextLaunchTable'
import { isNormalInteger } from '../LaunchCatalog/component/utils'
import './index.css'
import moment from 'moment'
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import 'antd/dist/antd.css'

const { Search } = Input
const { Header, Content, Footer } = Layout
const url = 'https://launchlibrary.net/1.4/launch/next/1000?status=1,2'
const nextUrl = 'https://launchlibrary.net/1.4/launch/next/1000?status=2'
const { RangePicker } = DatePicker
const limit = 10000
const launchCount = null

let oldurl = 'https://launchlibrary.net/1.4/launch?startdate='+moment('2015-1-1').format('YYYY-MM-DD')+'&enddate='+moment().format('YYYY-MM-DD')+'&limit='+limit+'&fields=name,net,location,status,rocket,mapURL'

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
                <Layout className="layout">
                <Header>
                    <div className="logo" />

                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} style={{textAlign:'right'}}>
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
                   {/* <a onClick={() => scroll.scrollToBottom()}>скролл вниз</a>

                    <h1 style={{textAlign: 'center'}}>Запуски для которых обьявлены точные дата и время</h1>
                    { this.state.launchData
                        ? <LaunchTable launches={this.state.launchData.launches} />
                        : <p></p>
                    }
                    <p></p>

                    <h1 style={{textAlign: 'center'}}>Запланированные запуски</h1>
                    { this.state.NextlaunchData
                        ? <NextLaunchTable launches={this.state.NextlaunchData.launches} />
                        : <p></p>
                    } */}

                    <RangePicker className="RangePicker"
                            onChange={this.launchDateButtonOnChange}
                            disabledDate={disabledDate}   
                            allowClear={false}

                    />

                    { this.state.launchOldData
                        // ? <Spin tip="Подождите!"  className="spin"/>
                        ? <OldTable launches={this.state.launchOldData.launches} />                       
                        : <p></p>
                    }

                
                </Content>

                {/* <a onClick={this.showModal} >тык</a>
                <Modal
                    centered
                    title="Расположение запуска на карте"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}

                >
                    <ComposableMap
                        projection="geoMercator"
                        width     ="1800"
                        height    ="600"
                        >
                        <Geographies geography={geoUrl}>
                            {({ geographies }) =>
                            geographies.map(geo => <Geography key={geo.rsmKey} geography={geo} fill     ="#EAEAEC"
                            stroke   ="#D6D6DA"/>)
                            }
                        </Geographies>
                        </ComposableMap>
                </Modal> */}

                





                <Footer className="footer">
                    <div class="scroll-up" id="scroll-up">Наверх</div>
                    Design © 2020
                </Footer>
            </Layout>
        )
    }
}

export default LayoutContainer
