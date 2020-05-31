import React, { Component } from 'react'

import { Layout, DatePicker, Button, notification, Divider, Table, Tooltip } from 'antd'
import { UpOutlined, LoadingOutlined, InfoCircleOutlined } from '@ant-design/icons'
import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons'
import moment from 'moment'
import { animateScroll as scroll, scroller } from 'react-scroll'


import { Earth, Satellite2, Alien, Mars, Comet, Meteor, Satellite4, Stars, Cloud, Upi, Spaceship } from '../images'
import FinishedTable from './FinishedLaunches'
import AnnouncedTable from "./AnnouncedLaunches"
import ScheduledTable from './ScheduledLaunches'
import '../css/index.css'


const { Content } = Layout
const LIMIT = 10000
const { RangePicker } = DatePicker
const THIS_YEAR = moment().format('YYYY')

// следующие запуски с временем и датой
export const URL_FOR_ANNOUNCED = 'https://launchlibrary.net/1.4/launch/next/1000?status=1,2'

// следующие запуски с датой(без времени)
export const URL_FOR_SCHEDULED_LAUNCHES = 'https://launchlibrary.net/1.4/launch/next/1000?status=2'

// старые запуски
export let URLForFinishedLaunch = 'https://launchlibrary.net/1.4/launch?startdate=' + moment(THIS_YEAR).format('YYYY-MM-DD') + '&enddate=' + moment().format('YYYY-MM-DD') + '&limit=' + LIMIT + '&fields=name,net,location,status,rocket,mapURL,countryCode'



// const modals = Modal.warning({
//     content: `можно вывести стартовое сообщение!`,
//     maskClosable: "true"
// }
// )

const URL = (name, wrap = false) => `${wrap ? 'URL(' : ''}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${wrap ? ')' : ''}`
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

// function scrollFunction() {
//   if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
//     document.getElementById("myBtn").style.display = "block"
//   } else {
//     document.getElementById("myBtn").style.display = "none"
//   }
// }
// window.onscroll = function () { scrollFunction() };

class MapLaunches extends Component {
  constructor(props) {
    super(props)
    this.state = {
      AnnouncedData: null,
      ScheduledData: null,
      FinishedData: null,
      visible: false,
      loading: false,
      disabledSlider: false,
      test: [],
      show: false,

    }
    this.launchDateButtonOnChange = this.launchDateButtonOnChange.bind(this)
    this.timeBeforeToShowMarkers = this.timeBeforeToShowMarkers.bind(this)
    this.scrollToTop = this.scrollToTop.bind(this)
  }

  scrollToTop() {
    scroll.scrollToTop();
  }

  fetchAnnounced(url) {
    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({ AnnouncedData: data }))
  }

  fetchScheduled(url) {
    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({ ScheduledData: data }))
  }

  fetchFinished(url) {
    this.setState({ loading: true })
    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({ FinishedData: data, loading: false, }))
  }


  componentDidMount() {
    this.fetchAnnounced(URL_FOR_ANNOUNCED)
    this.fetchScheduled(URL_FOR_SCHEDULED_LAUNCHES)
    this.fetchFinished(URLForFinishedLaunch)
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
    URLForFinishedLaunch = `https://launchlibrary.net/1.4/launch?startdate=${dateString[0]}&enddate=${dateString[1]}&limit=${LIMIT}&fields=name,net,location,status,rocket,mapURL,countryCode`
    this.validationOfDate(URLForFinishedLaunch)
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
    let count = this.state.FinishedData.launches.length
    const timer = setInterval(() => {
      console.log(count)
      count--
      this.setState({ test: [this.state.FinishedData.launches[count]] })
      console.log(this.state.test);

    }, 1000)

    setTimeout(() => {
      clearInterval(timer)
      // this.showMarkers()
    }, count * 1000)
  }

  render() {
    const { AnnouncedData, ScheduledData, FinishedData, loading } = this.state
    return (
      <div>
        {AnnouncedData && ScheduledData && FinishedData
          ?
          <Parallax pages={3.15}>
            {/* Здесь лежат загружаемые модули (облака, планеты и т.д.) */}
            <ParallaxLayer offset={1} speed={1} style={{ backgroundColor: '#805E73' }} />

            <ParallaxLayer offset={2} speed={1} style={{ backgroundColor: '#87BCDE' }} />

            <ParallaxLayer offset={0} speed={0} factor={3.15} style={{ backgroundImage: URL('stars', true), backgroundSize: 'cover' }} className='background' />

            <ParallaxLayer offset={2.3} speed={-0.1} style={{ pointerEvents: 'none' }}>
              <img src={Satellite2} style={{ width: '15%', marginLeft: '70%' }} />
            </ParallaxLayer>

            <ParallaxLayer offset={2.4} speed={0} style={{ pointerEvents: 'none' }}>
              <img src={Alien} className='Alien' />
            </ParallaxLayer>

            <ParallaxLayer offset={2.5} speed={-0.3} style={{ pointerEvents: 'none' }}>
              <img src={Earth} style={{ width: '40%', marginLeft: '70%' }} />
            </ParallaxLayer>

            <ParallaxLayer offset={2.46} speed={-0.4} style={{ opacity: 0.9 }}>
              <img src={Cloud} style={{ display: 'block', width: '15%', marginLeft: '85%' }} />
            </ParallaxLayer>

            <ParallaxLayer offset={1} speed={0.8} style={{ opacity: 0.1 }}>
              <img src={Cloud} style={{ display: 'block', width: '20%', marginLeft: '55%' }} />
              <img src={Cloud} style={{ display: 'block', width: '10%', marginLeft: '15%' }} />
            </ParallaxLayer>

            <ParallaxLayer offset={1.75} speed={0.5} style={{ opacity: 0.1 }}>
              <img src={Cloud} style={{ display: 'block', width: '20%', marginLeft: '70%' }} />
              <img src={Cloud} style={{ display: 'block', width: '20%', marginLeft: '40%' }} />
            </ParallaxLayer>

            <ParallaxLayer offset={1} speed={0.2} style={{ opacity: 0.2 }}>
              <img src={Cloud} style={{ display: 'block', width: '10%', marginLeft: '10%' }} />
              <img src={Cloud} style={{ display: 'block', width: '20%', marginLeft: '75%' }} />
            </ParallaxLayer>

            <ParallaxLayer offset={1.6} speed={-0.1} style={{ opacity: 0.4 }}>
              <img src={Cloud} style={{ display: 'block', width: '20%', marginLeft: '60%' }} />
              <img src={Cloud} style={{ display: 'block', width: '25%', marginLeft: '30%' }} />
              <img src={Cloud} style={{ display: 'block', width: '10%', marginLeft: '80%' }} />
            </ParallaxLayer>

            <ParallaxLayer offset={2.6} speed={0.4} style={{ opacity: 0.6 }}>
              <img src={Cloud} style={{ display: 'block', width: '20%', marginLeft: '5%' }} />
              <img src={Cloud} style={{ display: 'block', width: '15%', marginLeft: '75%' }} />
            </ParallaxLayer>

            <ParallaxLayer offset={2.85} speed={0.4} style={{ opacity: 0.6 }}>
              <img src={Cloud} style={{ display: 'block', width: '10%', marginLeft: '37%' }} />
            </ParallaxLayer>

            <ParallaxLayer offset={0.1} speed={-0.6} style={{ pointerEvents: 'none' }}>
              <img src={Satellite4} style={{ width: '15%', marginRight: '65%' }} />
            </ParallaxLayer>

            <ParallaxLayer offset={1.17} speed={-1.5} style={{ pointerEvents: 'none' }}>
              <img src={Comet} style={{ width: '15%', marginLeft: '15%' }} />
            </ParallaxLayer>

            <ParallaxLayer offset={0.6} speed={-0.3} style={{ pointerEvents: 'none' }}>
              <img src={Upi} style={{ width: '10%', marginLeft: '55%' }} />
            </ParallaxLayer>

            <ParallaxLayer offset={2.65} speed={-0.4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
              <img src={Mars} style={{ width: '50%', marginRight: '47%' }} />
            </ParallaxLayer>




            {/*Здесь лежит таблицы */}
            <ParallaxLayer offset={0} speed={0.3} style={{ opacity: '80%', marginTop: '150px', }}>
              <h1 style={{ textAlign: 'center' }}>Обьявленные запуски</h1>
              <AnnouncedTable launches={AnnouncedData.launches} />
            </ParallaxLayer>

            <ParallaxLayer offset={1.1} speed={1} style={{ opacity: '80%', marginLeft: '10%', width: '80%' }}>
              <h1 style={{ textAlign: 'center' }}>Запланированные запуски</h1>
              <ScheduledTable launches={ScheduledData.launches} />
            </ParallaxLayer>

            <ParallaxLayer offset={2} speed={1} style={{ opacity: '80%', marginLeft: 'auto', marginRight: 'auto', width: '80%', marginLeft: '9%', }}>
              <h1 style={{ textAlign: 'center' }}>Состоявшиеся запуски</h1>
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
              <FinishedTable launches={FinishedData.launches} loading={loading} />
            </ParallaxLayer>

          </Parallax>
          : <div style={{ backgroundColor: '#253237', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <LoadingOutlined style={{ fontSize: '100px' }} />
          </div>
        }
      </div>
    )
  }
}

export default MapLaunches