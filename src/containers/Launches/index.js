import React, { Component, useState, useEffect } from 'react'
import {
  Layout,
  DatePicker,
  Button,
  Tooltip,
  notification,
  Divider,
  Table,
} from 'antd'
import {
  GithubOutlined,
  UpOutlined,
  InfoCircleOutlined,
  FrownOutlined,
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons'
import 'antd/dist/antd.css'
import OldTable from '../Catalog/component/TableOld/TableOld'
import OldTable2 from '../Catalog/component/TableOld2/TableOld2'
import LaunchTable from "../Catalog/component/Table/Table"
import NextLaunchTable from '../Catalog/component/NextLaunchTable/NextLaunchTable'
import SliderMapChart from '../Catalog/component/SliderMapChart/SliderMapChart'
import '../Layout/index.css' // стандарт
import '../Layout/index.scss' // прыгающие квадраты
import moment from 'moment'
import {
  animateScroll as scroll,
  scroller
} from 'react-scroll'
import MapChart from '../Catalog/component/MapChart/MapChart'
import { sayHi, announcedLaunchesFetch } from '../Catalog/component/LoadLaunchData'
import Planets from '../Catalog/component/TestTable/Planets'
import YesOrNoPreloader from '../Catalog/component/TestTable/exportFunc'

import LaunchCard from '../Catalog/component/Cards/OldCard'
import SweetAlert from 'sweetalert'

const { Content } = Layout
const LIMIT = 10000
const { RangePicker } = DatePicker
const THIS_YEAR = moment().format('YYYY')

// следующие запуски с временем и датой
export const URL = 'https://launchlibrary.net/1.4/launch/next/1000?status=1,2'

// следующие запуски с датой(без времени)
export const NEXT_URL = 'https://launchlibrary.net/1.4/launch/next/1000?status=2'

// старые запуски
export let oldUrl = 'https://launchlibrary.net/1.4/launch?startdate=' + moment(THIS_YEAR).format('YYYY-MM-DD') + '&enddate=' + moment().format('YYYY-MM-DD') + '&limit=' + LIMIT + '&fields=name,net,location,status,rocket,mapURL,countryCode'



// const modals = Modal.warning({
//     content: `можно вывести стартовое сообщение!`,
//     maskClosable: "true"
// }
// )
const notificationForInvalidDate = (placement) => {
  notification.warning({
    message: <strong> Похоже,что за выбранный период времени запусков нет </strong>,
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


function hid() {
  if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
    document.getElementById("myBtn").style.display = "block"
  } else {
    document.getElementById("myBtn").style.display = "none"
  }
}


class MapLaunches extends Component {
  constructor(props) {
    super(props)
    this.state = {
      launchData: null,
      launchOldData: null,
      NextlaunchData: null,
      visible: false,
      loading: false,
      disabledSlider: false,
      test: [],
      show: false,
    }
    this.launchDateButtonOnChange = this.launchDateButtonOnChange.bind(this)
    this.timeBeforeToShowMarkers = this.timeBeforeToShowMarkers.bind(this)
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
    // this.timeBeforeToShowMarkers()
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
    if (response.ok) { // если HTTP-статус в диапазоне 200-299 получаем новые данные иначе Notification
      this.fetchOldLaunches(url)
    } else {
      notificationForInvalidDate('topRight')
      this.setState({ loading: false })
    }
  }

  launchDateButtonOnChange(date, dateString) {
    oldUrl = `https://launchlibrary.net/1.4/launch?startdate=${dateString[0]}&enddate=${dateString[1]}&limit=${LIMIT}&fields=name,net,location,status,rocket,mapURL,countryCode`
    this.validationOfDate(oldUrl)
  }

  timeBeforeToShowMarkers() {
    let secondsToGo = 1

    const timer = setInterval(() => {
      secondsToGo -= 1
    }, 1000);

    setTimeout(() => {
      clearInterval(timer)
      this.func()
    }, secondsToGo * 1000)

  }

  //  showMarkers () {
  //   if (this.state.loading == false) {
  //     let count = 0
  //   const timer = setInterval(() => {
  //     this.setState({test: [this.state.launchOldData.launches[count]]})
  //     count++
  //   }, 1000)

  //   setTimeout(() => {
  //     clearInterval(timer)
  //     this.func()
  //   }, count * 1000)
  //   }
  // }

  func() {
    let count = this.state.launchOldData.launches.length
    const timer = setInterval(() => {
      console.log(count)
      count--
      this.setState({ test: [this.state.launchOldData.launches[count]] })
      console.log(this.state.test);

    }, 1000)

    setTimeout(() => {
      clearInterval(timer)
      // this.showMarkers()
    }, count * 1000)
  }


  render() {
    const { launchOldData, launchData, NextlaunchData, loading, disabled, isActive } = this.state

    return (
      <div>
        {launchData && NextlaunchData && launchOldData
        ?        <Content style={{ padding: '0 50px' }} >
        <div className="site-layout-content" >
          <RangePicker className="RangePicker"
            defaultValue={[moment(THIS_YEAR), moment()]}
            showToday={false, true}
            onChange={this.launchDateButtonOnChange}
            disabledDate={disabledDate}
            allowClear={false}
            style={{ margin: 10 }}
          />
          <Divider><h1 style={{ textAlign: 'center' }}>Обьявленные запуски</h1></Divider>
          <LaunchTable launches={launchData.launches} />

          <Divider className="next-launch-table"><h1 style={{ textAlign: 'center' }}>Запланированные запуски</h1></Divider>
                      <NextLaunchTable launches={NextlaunchData.launches} /> 

          <Divider className="next-launch-table"><h1 style={{ textAlign: 'center' }}>Запланированные запуски</h1></Divider>
          <NextLaunchTable launches={NextlaunchData.launches} />

          <Divider><h1 style={{ textAlign: 'center' }}>Состоявшиеся запуски</h1></Divider>
          <OldTable2 launches={launchOldData} loading={loading} />

          <Button onClick={this.timeBeforeToShowMarkers} > ТЫК </Button>
          <Tooltip title={<p > Здесь можно настроить период запусков </p>}
            mouseEnterDelay={0.2}
            mouseLeaveDelay={0.5}
            placement="top" >
            <InfoCircleOutlined />
          </Tooltip>
          <MapChart launches={this.state.test} />
          <Button onClick={() => this.setState({ show: true })}> show </Button>
        </div>
        <Button type="primary"
          shape="circle"
          icon={< UpOutlined />}
          onClick={scroll.scrollToTop}
          id="myBtn"
          title="Наверх!"
        />
      </Content>
:<div>пусто</div>
        }

      </div>
    )
  }
}

export default MapLaunches