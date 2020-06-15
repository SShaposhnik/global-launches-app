import React, { Component } from 'react'

import { Layout, DatePicker, Button, notification, Divider, Alert, Tooltip, Switch } from 'antd'
import { UpOutlined, LoadingOutlined, InfoCircleOutlined, GithubOutlined } from '@ant-design/icons'
import moment from 'moment'
import { animateScroll as scroll, scroller } from 'react-scroll'

import { Earth, Satellite2, Alien, Mars, Comet, Meteor, Satellite4, Stars, Cloud, Upi, Spaceship, RocketButton } from '../images'
import FinishedTable from './FinishedLaunches'
import AnnouncedTable from "./AnnouncedLaunches"
import ScheduledTable from './ScheduledLaunches'
import { FetchData } from './FetchData'

import MapChart from './MapChart'
import 'antd/dist/antd.css'
import '../css/index.css'

const { Content, Footer } = Layout
const LIMIT = 10000
const { RangePicker } = DatePicker
const THIS_YEAR = moment().format('YYYY')

// следующие запуски с временем и датой
export const URL_FOR_ANNOUNCED = 'https://launchlibrary.net/1.4/launch/next/1000?status=1,2'
// export const URL_FOR_ANNOUNCED = 'https://launchlibrary.net/1.4/launch//1000?status=1,2'

// следующие запуски с датой(без времени)
export const URL_FOR_SCHEDULED_LAUNCHES = 'https://launchlibrary.net/1.4/launch/next/1000?status=2'

// старые запуски
export let URLForFinishedLaunch = 'https://launchlibrary.net/1.4/launch?startdate=' + moment(THIS_YEAR).format('YYYY-MM-DD') + '&enddate=' + moment().format('YYYY-MM-DD') + '&limit=' + LIMIT + '&fields=name,net,location,status,rocket,lsp'

const URL = (name, wrap = false) => `${wrap ? 'URL(' : ''}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${wrap ? ')' : ''}`
const notificationForInvalidDate = (placement) => {
  notification.warning({
    message: <strong> Похоже,что за выбранный период времени запусков нет </strong>,
    placement,
  })
}

function disabledDate(current) {
  return ((current && current > moment().endOf('day')) || (current && current < moment('1961-01-01').endOf('day')))
}


function scrollFunction() {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    document.getElementById("myBtn").style.display = "block"

  } else {
    document.getElementById("myBtn").style.display = "none"

  }
}

export default class LaunchesTables extends Component {
  constructor(props) {
    super(props)
    this.state = {
      AnnouncedData: null,
      ScheduledData: null,
      FinishedData: null,
      visible: false,
      loading: false,
      disabledSlider: false,
      dataArrayForMarkers: [],
      show: false,
      testArr: [777],

    }
    this.launchDateButtonOnChange = this.launchDateButtonOnChange.bind(this)
    this.timeBeforeToShowMarkers = this.timeBeforeToShowMarkers.bind(this)
    this.func = this.func.bind(this)
    this.scrollToTop = this.scrollToTop.bind(this)
  }

  scrollToTop() {
    scroll.scrollToTop();
  }

  fetchAnnounced(url) {
    fetch(url)
      .then((res) => {
        if (res.ok) {
          fetch(url)
            .then(res => res.json())
            .then(res => this.setState({ AnnouncedData: res }))
        }
      })
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
    let res = await fetch(url)
    if (res.ok) { // если HTTP-статус в диапазоне 200-299 получаем новые данные иначе Notification
      this.fetchFinished(url)
    } else {
      notificationForInvalidDate('topRight')
      this.setState({ loading: false })
    }
  }

  launchDateButtonOnChange(date, dateString) {
    URLForFinishedLaunch = `https://launchlibrary.net/1.4/launch?startdate=${dateString[0]}&enddate=${dateString[1]}&limit=${LIMIT}&fields=name,net,location,status,rocket,lsp`
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

  scrollToTop() {
    scroll.scrollToTop();
  }

  func() {
    let count = this.state.FinishedData.launches.length
    const timer = setInterval(() => {
      console.log(count)
      count--
      this.setState({ dataArrayForMarkers: [this.state.FinishedData.launches[count]] })
      console.log(this.state.dataArrayForMarkers);
    }, 1000)

    setTimeout(() => {
      clearInterval(timer)
      console.log(this.state.FinishedData);
    }, count * 1000)
  }

  render() {
    const { AnnouncedData, ScheduledData, FinishedData, loading, dataArrayForMarkers } = this.state
    console.log(FinishedData);
    

    return (
      <div  >
        {ScheduledData && FinishedData
          ?
          <div>
            <br />
            {AnnouncedData
              ? <div>
                <Divider >
                  <h1 style={{
                    textAlign: 'center',
                    fontSize: "4.2rem",
                    fontWeight: "600",
                    display: "inline-block",
                    position: "relative",
                  }}
                  >Обьявленные запуски</h1></Divider>
                <AnnouncedTable launches={AnnouncedData.launches} /></div>
              : <Alert className='alert-if-no-launch'
                message="Ближайших запусков не найдено!"
                description="Похоже, вам придётся зайти в другое время!"
                type="warning"
                showIcon
              />
            }
            <br /><br />
            <Divider>
              <h1 style={{
                textAlign: 'center',
                fontSize: "4.2rem",
                fontWeight: "600",
                display: "inline-block",
                position: "relative",
              }}
              >Запланированные запуски</h1></Divider>
            <ScheduledTable launches={ScheduledData.launches} />

            <Divider>
              <h1 style={{
                textAlign: 'center',
                fontSize: "4.2rem",
                fontWeight: "600",
                display: "inline-block",
                position: "relative",
              }}>Состоявшиеся запуски</h1></Divider>

              <div className='finished-table-content'>
              <RangePicker className="RangePicker"
                defaultValue={[moment(THIS_YEAR), moment()]}
                showToday={false, true}
                onChange={this.launchDateButtonOnChange}
                disabledDate={disabledDate}
                allowClear={false}
              // style={{ margin: 10}}
              />
              <Tooltip title={<p > Здесь можно настроить период запусков </p>}
                mouseEnterDelay={0.2}
                mouseLeaveDelay={0.5}
                placement="top"
              >
                <InfoCircleOutlined style={{ marginLeft: '10px' }} />
              </Tooltip>
              <FinishedTable launches={FinishedData.launches} loading={loading} />
            </div>



            <br /><br />
            <Button
              type="primary"
              shape="circle"
              icon={<UpOutlined />}
              onClick={() => this.parallax.scrollTo(0)}
              // id="myBtn"
              title="Наверх!"
              className='myBtn'
            />

          </div>
          : <div style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <LoadingOutlined style={{ fontSize: '100px' }} />
          </div>
        }
      </div>
    )
  }
}