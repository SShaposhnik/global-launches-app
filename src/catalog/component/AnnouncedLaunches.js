import React from 'react'

import { Table, Tooltip, Modal, Button, Space, notification } from 'antd'
import moment from 'moment'
import 'moment/locale/ru'

import Timer from './Timer'
import '../css/index.css'

moment.locale()
const { Column, ColumnGroup } = Table;

const launchStatus = {
  1: 'Запланированы точные дата и время запуска',
  2: 'Дата и время будут объявлены позже',
  3: 'Запуск прошел успешно',
  4: 'Неудачный запуск',
  5: 'Незапланированная задержка',
  6: 'В полете',
  7: 'Во время запуска произошел частичный сбой',
}
const columns = [
  {
    title: 'Название запуска',
    dataIndex: 'RocketAndMissionName',
    width: '30%',
    align: 'center',
  },
  {
    title: 'Дата запуска',
    dataIndex: 'net',
    align: 'center',
    width: '25%',
  },
  {
    title: 'Таймер',
    dataIndex: 'timer',
    align: 'center',
    width: '20%'
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
  rocketName: el.rocket.name,
    location: <div>
      {el.location.pads.map(els => (els.name.split(',')[0]))}<br />
      {el.location.name.split(',')[0]}
    </div>,
    missionsName: el.missions.map(els => (els.name)),
    RocketAndMissionName: el.name,
    pads: el.location.pads.map(p => (p.name)),
    net: <Tooltip title={<div><p style={{ textAlign: 'center' }}>Локальное время</p> <p style={{ textAlign: 'center' }}>{moment(el.net).locale('ru').format('LLL')}</p></div>}>{moment(el.net).utc(0).locale('ru').format('LLL z')}</Tooltip>,
    status: launchStatus[el.status],
    timer: <Timer timeTillLaunch={el.net} />
  }))

  return (
    <div>
      <Table
        className="announced-table"
        dataSource={launchesWithTimer}
        pagination={false}
        size="small"
        columns={columns}
        bordered="true"
      />
    </div>
  )
}