import React, { Component } from 'react'
import '../../containers/Catalog/css/index.css'
import {
  Layout,
  DatePicker,
  Button,
  notification,
  Divider,
} from 'antd'
import {
  UpOutlined,
  LoadingOutlined,
} from '@ant-design/icons'
import 'antd/dist/antd.css'
import OldTable from '../Catalog/component/TableOld/TableOld'
import OldTable2 from '../Catalog/component/TableOld2/TableOld2'
import LaunchTable from "../Catalog/component/Table/Table"
import NextLaunchTable from '../Catalog/component/NextLaunchTable/NextLaunchTable'
import SliderMapChart from '../Catalog/component/SliderMapChart/SliderMapChart'
import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons'
import '../Layout/index.css' // стандарт
import '../Layout/index.scss' // прыгающие квадраты
import moment from 'moment'
import {
  animateScroll as scroll,
  scroller
} from 'react-scroll'
import MapChart from '../Catalog/component/MapChart/MapChart'
import Planets from '../Catalog/component/TestTable/Planets'

import LaunchCard from '../Catalog/component/Cards/OldCard'

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

const url = (name, wrap = false) => `${wrap ? 'url(' : ''}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${wrap ? ')' : ''}`
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
          ?










          <Parallax pages={3}>
            <ParallaxLayer offset={1} speed={1} style={{ backgroundColor: '#805E73' }} />
            <ParallaxLayer offset={2} speed={1} style={{ backgroundColor: '#87BCDE' }} />

            <ParallaxLayer offset={0} speed={0} factor={3}
              className='background-parallax'
              style={{
                backgroundImage: url('stars', true),
                backgroundSize: 'cover'
              }} />


            <ParallaxLayer offset={1} speed={0.8} style={{ opacity: 0.1 }}>
              <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '55%' }} />
              <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '15%' }} />
            </ParallaxLayer>

            <ParallaxLayer offset={1.75} speed={0.5} style={{ opacity: 0.1 }}>
              <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '70%' }} />
              <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '40%' }} />
            </ParallaxLayer>

            <ParallaxLayer offset={1} speed={0.2} style={{ opacity: 0.2 }}>
              <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '10%' }} />
              <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '75%' }} />
            </ParallaxLayer>

            <ParallaxLayer offset={1.6} speed={-0.1} style={{ opacity: 0.4 }}>
              <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '60%' }} />
              <img src={url('cloud')} style={{ display: 'block', width: '25%', marginLeft: '30%' }} />
              <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '80%' }} />
            </ParallaxLayer>

            <ParallaxLayer offset={0.1} speed={-0.7} style={{ pointerEvents: 'none' }}>
              <img src={url('satellite4')} style={{ width: '15%', marginRight: '70%' }} />
            </ParallaxLayer>
            <ParallaxLayer offset={2.5} speed={-0.4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
              <img src={'https://image.flaticon.com/icons/svg/2277/2277588.svg'} style={{ width: '60%' }} />
            </ParallaxLayer>

            <ParallaxLayer
              offset={0}
              speed={0.3}
              className='table1-parallax'>
              <LaunchTable launches={launchData.launches} />
            </ParallaxLayer>

            <ParallaxLayer
              offset={1.3}
              speed={0.3}
              className='table2-parallax'>
              <NextLaunchTable launches={NextlaunchData.launches} />
            </ParallaxLayer>

            <ParallaxLayer
              offset={2}
              speed={1}
              // style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              className='table3-parallax'
            >
              <OldTable2 launches={launchOldData.launches} loading={loading} />
              <Button type="primary"
                shape="circle"
                icon={< UpOutlined />}
                onClick={scroll.scrollToTop}
                id="myBtn"
                title="Наверх!"
              />
            </ParallaxLayer>

            {/* <ParallaxLayer
          offset={2}
          speed={-0}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={() => this.parallax.scrollTo(0)}>
          <RangePicker className="RangePicker"
                defaultValue={[moment(THIS_YEAR), moment()]}
                showToday={false, true}
                onChange={this.launchDateButtonOnChange}
                disabledDate={disabledDate}
                allowClear={false}
                style={{ margin: 10 }}
              />
              <Tooltip title={<p > Здесь можно настроить период запусков </p>}
                mouseEnterDelay={0.2}
                mouseLeaveDelay={0.5}
                placement="top" >
                <InfoCircleOutlined />
              </Tooltip>
              <Divider><h1 style={{ textAlign: 'center' }}>Состоявшиеся запуски</h1></Divider>
              <OldTable2 launches={launchOldData.launches} loading={loading} />
</ParallaxLayer> */}







            {/* <Button onClick={this.timeBeforeToShowMarkers} > ТЫК </Button>
              <MapChart launches={this.state.test} /> */}
          </Parallax>













          : <LoadingOutlined className='not-uploaded-content' />
        }

      </div>
    )
  }
}

export default MapLaunches