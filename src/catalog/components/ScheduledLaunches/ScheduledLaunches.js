import React from 'react'

import { Table, Pagination } from 'antd'
import moment from 'moment'
import 'moment/locale/ru'
import { LoadingOutlined } from '@ant-design/icons'

import {usaFlag, chinaFlag, franceFlag, indiaFlag, iranFlag, japanFlag, kazakhstanFlag, newzealandFlag, russiaFlag, ukFlag} from '../../../assets/images/index'
import '../../css/index.css'
moment.locale()


const launchStatus = {
  1: 'Запланированы точные дата и время запуска',
  2: 'Дата и время будут объявлены позже',
  3: 'Запуск прошел успешно',
  4: 'Неудачный запуск',
  5: 'Незапланированная задержка',
  6: 'В полете',
  7: 'Во время запуска произошел частичный сбой',
}
const COUNTRY_FLAG = {
  USA: usaFlag,
  CHN: chinaFlag,
  KAZ: kazakhstanFlag,
  IRN: iranFlag,
  RUS: russiaFlag,
  FRA: franceFlag,
  JPN: japanFlag,
  NZL: newzealandFlag,
  IND: indiaFlag,
  UNK: ukFlag,

}
const columns = [
  {
    title: 'Название запуска',
    dataIndex: 'RocketAndMissionName',
    width: '30%',
    align: 'left',
    className: 'launch-name-nextlaunch'
  },
  {
    title: 'Дата запуска',
    dataIndex: 'net',
    align: 'center',
    width: '25%',
  },
  {
    title: 'Площадка / Космодром',
    dataIndex: 'location',
    width: '30%',
    align: 'center',
  },
]

export default ({ launches }) => {
  const launchesWithTimer = launches.map(el => ({
    RocketAndMissionName: <span><img src={COUNTRY_FLAG[el.pad.location.country_code]} style={{width: '9%', marginRight: '10px'}}/> {el.name}</span>,
    location: <div>
      {el.pad.name}<br />
      {el.pad.location.name}
    </div>,
    net: moment(el.net).locale('ru').format('MMMM YYYY'),
    status: launchStatus[el.status],
    pads: el.pad.name,
  }))
  return (
    <Table
      dataSource={launchesWithTimer}
      pagination={{
        position: ['bottomCenter'],
        defaultCurrent: 1,
        simple: "true",
        pageSizeOptions: ['10', '50', '100'],
      }}
      // size="small"
      columns={columns}
      style={{width: '80%', marginLeft: 'auto', marginRight: 'auto'}}
      // bordered="false"
    />
  )
}