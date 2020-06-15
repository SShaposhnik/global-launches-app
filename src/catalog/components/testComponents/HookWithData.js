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
import YesOrNoPreloader from '../Catalog/component/TestTable/exportFunc'

import LaunchCard from '../Catalog/component/Cards/OldCard'

const { Content } = Layout
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
    placement,
  })
}


function HookWithData() {
  const arr = YesOrNoPreloader()
  const [announcedLaunches, setAnnouncedLaunches] = useState()
  const [scheduledLaunches, setScheduledLaunches] = useState()
  const [finishedLaunches,  setFinishedLaunches]  = useState()
  useEffect(() => {
    setAnnouncedLaunches(arr[0])
    setScheduledLaunches(arr[1])
    setFinishedLaunches (arr[2])
  })
// console.log(arr);

  // const announcedLaunches = data0
  // const scheduledLaunches = data1
  // const finishedLaunches =  data2
  console.log(announcedLaunches);
  console.log(scheduledLaunches);
  console.log(finishedLaunches);


  if (announcedLaunches && scheduledLaunches && finishedLaunches) {
    return (
      <div>
        <Button>CHECK</Button>
        <Content style={{ padding: '0 50px' }}>
          <div className="site-layout-content">

              <Divider><h1 style={{ textAlign: 'center' }}>Обьявленные запуски</h1></Divider>
              <LaunchTable launches={announcedLaunches.launches} />

              <Divider className="next-launch-table"><h1 style={{ textAlign: 'center' }}>Запланированные запуски</h1></Divider>
              <NextLaunchTable launches={scheduledLaunches.launches} />

              <Divider><h1 style={{ textAlign: 'center' }}>Состоявшиеся запуски</h1></Divider>
              <OldTable2 launches={finishedLaunches} />

          </div>
        </Content>

      </div>
    )
  } else return (<div></div>)
}

export default HookWithData
