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
import LaunchTable from '../Catalog/component/Table/Table'
import NextLaunchTable from '../Catalog/component/NextLaunchTable/NextLaunchTable'
import SliderMapChart from '../Catalog/component/SliderMapChart/SliderMapChart'
import '../Layout/index.css' // стандарт
import '../Layout/index.scss' // прыгающие квадраты
import moment from 'moment'
import {
  animateScroll as scroll, scroller
} from 'react-scroll'
import MapChart from '../Catalog/component/MapChart/MapChart'
import { sayHi, announcedLaunchesFetch } from '../Catalog/component/LoadLaunchData'
import Menu from '../Catalog/component/TestTable/Menu'
import Planets from '../Catalog/component/TestTable/Planets'

import LaunchCard from '../Catalog/component/Cards/OldCard'
import { css } from 'styled-components'

const { Content } = Layout
const { RangePicker } = DatePicker
const LIMIT = 10000
const THIS_YEAR = moment().format('YYYY')

// следующие запуски с временем и датой
export const URL = 'https://launchlibrary.net/1.4/launch/next/1000?status=1,2'

// следующие запуски с датой(без времени)
export const NEXT_URL = 'https://launchlibrary.net/1.4/launch/next/1000?status=2'

// старые запуски
export let oldUrl = 'https://launchlibrary.net/1.4/launch?startdate=' + moment(THIS_YEAR).format('YYYY-MM-DD') + '&enddate=' + moment().format('YYYY-MM-DD') + '&limit=' + LIMIT + '&fields=name,net,location,status,rocket,mapURL,countryCode'

const notificationForInvalidDate = (placement) => {
  notification.warning({
    message: <strong>Похоже, что за выбранный период времени запусков нет</strong>,
    //   description: <strong>За выбранный период времени запусков нет!</strong>,
    placement,
  })
}

function scrollFunction() {
  if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
    document.getElementById("myBtn").style.display = "block"
  } else {
    document.getElementById("myBtn").style.display = "none"
  }
}
window.onscroll = function () { scrollFunction() };

function disabledDate(current) {
  return ((current && current > moment().endOf('day')) || (current && current < moment('1961-01-01').endOf('day')))
}


function HookFunction() {
  const [announcedLaunches, setAnnouncedLaunches] = useState(null)
  const [scheduledLaunches, setScheduledLaunches] = useState(null)
  const [finishedLaunches, setFinishedLaunches] = useState(null)
  const [test, setTest] = useState([])
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchLaunches(URL)
    fetchNextLaunches(NEXT_URL)
    fetchOldLaunches(oldUrl)
  }, [])

  function fetchLaunches(url) {
    fetch(url)
      .then(res => res.json())
      .then(res => setAnnouncedLaunches(res))
  }

  function fetchNextLaunches(url) {
    fetch(url)
      .then(res => res.json())
      .then(res => setScheduledLaunches(res))
  }

  function fetchOldLaunches(url) {
    setLoading(true)
    fetch(url)
      .then(res => res.json())
      .then(res => setFinishedLaunches(res), setLoading(false))
  }

  function validationOfDate(url) {
    setLoading(true)
    fetch(url)
      .then(function (res) {
        if (res.ok) {
          fetchOldLaunches(url)
        } else {
          notificationForInvalidDate('topRight')
          setLoading(false)
        }
      })
  }

  function launchDateButtonOnChange(date, dateString) {
    oldUrl = `https://launchlibrary.net/1.4/launch?startdate=${dateString[0]}&enddate=${dateString[1]}&limit=${LIMIT}&fields=name,net,location,status,rocket,mapURL,countryCode`
    validationOfDate(oldUrl)
  }

  if (announcedLaunches && scheduledLaunches && finishedLaunches) {
    function timeBeforeToShowMarkers() {
      let secondsToGo = 1
      console.log(finishedLaunches.launches[0])
      const timer = setInterval(() => {
        secondsToGo -= 1
      }, 1000);

      setTimeout(() => {
        clearInterval(timer)
        func()
      }, secondsToGo * 1000)

    }
function n () {
  setTest([finishedLaunches.launches[0]])
}
    function showMarkers() {
      let count = 0
      const timer = setInterval(() => {
        setTest([finishedLaunches.launches[finishedLaunches.launches.length - 1]])
        count++
      }, 1000)

      setTimeout(() => {
        clearInterval(timer)
        func()
      }, count * 1000)
    }

    function func() {
      let count = finishedLaunches.launches.length - 1
      const timer = setInterval(() =>{
        count--
        setTest([finishedLaunches.launches[count]])
      }, 1000)

      setTimeout(() => {
        clearInterval(timer)
        showMarkers()
      }, count * 1000)
    }
    return (
      <div>
        {console.log(test)}
        <Content style={{ padding: '0 50px' }}>
          <div className="site-layout-content">
            <div>
              <p>Вы кликнули {count} раз(а)</p>
              <button onClick={() => setCount(count + 1)}>
                Нажми на меня
       </button>
            </div>

            {/* <Divider><h1 style={{ textAlign: 'center' }}>Обьявленные запуски</h1></Divider>
            <LaunchTable launches={announcedLaunches.launches} />

            <Divider className="next-launch-table"><h1 style={{ textAlign: 'center' }}>Запланированные запуски</h1></Divider>
            <NextLaunchTable launches={scheduledLaunches.launches} /> */}

            <Divider><h1 style={{ textAlign: 'center' }}>Состоявшиеся запуски</h1></Divider>
            <RangePicker className="RangePicker"
              defaultValue={[moment(THIS_YEAR), moment()]}
              showToday={false, true}
              onChange={launchDateButtonOnChange}
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

            <Button onClick={timeBeforeToShowMarkers} > ТЫК </Button>
            <MapChart launches={test} />

            <OldTable2 launches={finishedLaunches.launches} loading={loading} />
          </div>
          <Button
            type="primary"
            shape="circle"
            icon={<UpOutlined />}
            onClick={scroll.scrollToTop}
            id="myBtn"
            title="Наверх!"
          />
        </Content>

      </div>
    )
  } else return (<div></div>)
}

export default HookFunction
