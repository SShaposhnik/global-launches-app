import React, { Component, useState, useEffect } from 'react'
import {
  Layout,
  DatePicker,
  Button,
  Tooltip,
  notification,
  Divider,
  Modal,
  Menu
} from 'antd'
import swal from '@sweetalert/with-react'
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
import './index.css'
import OldTable from '../TableOld/TableOld'
import OldTable2 from '../TableOld2/TableOld2'
import LaunchTable from '../Table/Table'
import NextLaunchTable from '../NextLaunchTable/NextLaunchTable'
import SliderMapChart from '../SliderMapChart/SliderMapChart'
import '../Layout/index.css' // стандарт
import '../Layout/index.scss' // прыгающие квадраты
import moment from 'moment'
import {
  animateScroll as scroll, scroller
} from 'react-scroll'
import MapChart from '../MapChart/MapChart'
import { sayHi, announcedLaunchesFetch } from '../LoadLaunchData'
import Planets from '../TestTable/Planets'
import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons'

import LaunchCard from '../Cards/OldCard'
import { css } from 'styled-components'

const { Content, Sider } = Layout;
const { RangePicker } = DatePicker
const { SubMenu } = Menu;
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



// function scrollFunction() {
//   if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
//     document.getElementById("myBtn").style.display = "block"
//   } else {
//     document.getElementById("myBtn").style.display = "none"
//   }
// }
// window.onscroll = function () { scrollFunction() };

function disabledDate(current) {
  return ((current && current > moment().endOf('day')) || (current && current < moment('1961-01-01').endOf('day')))
}

// const modals = Modal.warning({
//     content: `Забыл сказать, посмотрите на такое меню`,
//     maskClosable: "true"
// }
// )


const url = (name, wrap = false) => `${wrap ? 'url(' : ''}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${wrap ? ')' : ''}`
const Pink = ({ children }) => <span style={{ color: '#FF6AC1' }}>{children}</span>
const Yellow = ({ children }) => <span style={{ color: '#EFF59B' }}>{children}</span>
const Lightblue = ({ children }) => <span style={{ color: '#9AEDFE' }}>{children}</span>
const Green = ({ children }) => <span style={{ color: '#57EE89' }}>{children}</span>
const Blue = ({ children }) => <span style={{ color: '#57C7FF' }}>{children}</span>
const Gray = ({ children }) => <span style={{ color: '#909090' }}>{children}</span>










function HookFunction() {
  const [announcedLaunches, setAnnouncedLaunches] = useState(null)
  const [scheduledLaunches, setScheduledLaunches] = useState(null)
  const [finishedLaunches, setFinishedLaunches] = useState(null)
  const [test, setTest] = useState([])
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    fetchLaunches(URL)
    fetchNextLaunches(NEXT_URL)
    fetchOldLaunches(oldUrl)
  }, [])

  function onCollapse(collapsed) {
    setCollapsed(collapsed)
  }

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

    function showMarkers() {
      let count = 0
      const timer = setInterval(() => {
        setTest([finishedLaunches.launches[finishedLaunches.launches.length - 1]])
        count++
      }, 2000)

      setTimeout(() => {
        clearInterval(timer)
        func()
      }, count * 2000)
    }

    function func() {
      let count = finishedLaunches.launches.length - 1
      const timer = setInterval(() => {
        count--
        setTest([finishedLaunches.launches[count]])
      }, 2000)

      setTimeout(() => {
        clearInterval(timer)
        showMarkers()
      }, count * 2000)
    }

    return (
      <div>

<Parallax pages={5}>
        <ParallaxLayer offset={1} speed={1} style={{ backgroundColor: '#805E73' }} />
        <ParallaxLayer offset={2} speed={1} style={{ backgroundColor: '#87BCDE' }} />

        <ParallaxLayer offset={0} speed={0} factor={3} style={{ backgroundImage: url('stars'), backgroundSize: 'cover' }} />

        <ParallaxLayer offset={1.3} speed={-0.3} style={{ pointerEvents: 'none' }}>
          <img src={url('satellite4')} style={{ width: '15%', marginLeft: '70%' }} />
        </ParallaxLayer>

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

        <ParallaxLayer offset={2.6} speed={0.4} style={{ opacity: 0.6 }}>
          <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '5%' }} />
          <img src={url('cloud')} style={{ display: 'block', width: '15%', marginLeft: '75%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={2.5} speed={-0.4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
          <img src={url('earth')} style={{ width: '60%' }} />
        </ParallaxLayer>

        <ParallaxLayer
          offset={2}
          speed={-0.3}
          style={{
            backgroundSize: '80%',
            backgroundPosition: 'center',
            backgroundImage: url('clients', true)
          }}
        />

        <ParallaxLayer
          offset={0}
          speed={0.1}
          style={{ display: 'flex', alignItems: 'bottom', justifyContent: 'right' }}
          >
          <img src={url('satellite2')} style={{ width: '20%' }} />
          <LaunchTable launches={announcedLaunches.launches}/>
        </ParallaxLayer>

        <ParallaxLayer
          offset={1}
          speed={0.1}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* <img src={url('bash')} style={{ width: '40%' }} /> */}
        </ParallaxLayer>

        <ParallaxLayer
          offset={2}
          speed={-0}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={url('clients-main')} style={{ width: '10%' }} />
        </ParallaxLayer>
      </Parallax>








        {/* <Content style={{ padding: '0 50px' }}>
          <div className="site-layout-content">

          
            Простейший <a class="tooltip" href="#">Tooltip<span><LaunchCard launches={[announcedLaunches.launches[0]]} /></span></a>
            <div className="table1">
              <Divider><h1 style={{ textAlign: 'center' }}>Обьявленные запуски</h1></Divider>
              <LaunchTable launches={announcedLaunches.launches} />
            </div>
             <Divider className="next-launch-table"><h1 style={{ textAlign: 'center' }}>Запланированные запуски</h1></Divider>
            <NextLaunchTable launches={scheduledLaunches.launches} />

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
            <OldTable2 launches={finishedLaunches.launches} loading={loading} />
            <Button onClick={timeBeforeToShowMarkers} > ТЫК </Button>
            <MapChart launches={test} />

            
          </div>
          <Button
            type="primary"
            shape="circle"
            icon={<UpOutlined />}
            onClick={scroll.scrollToTop}
            id="myBtn"
            title="Наверх!"
          />
        </Content> */}

      </div>
    )
  } else return (<div></div>)
}

export default HookFunction
