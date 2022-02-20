import React from 'react'

import { Table, Tooltip } from 'antd'
import moment from 'moment'
import 'moment/locale/ru'

import Timer from '../Timer/Timer'
import { usaFlag, chinaFlag, franceFlag, indiaFlag, iranFlag, japanFlag, kazakhstanFlag, newzealandFlag, russiaFlag, ukFlag } from '../../../assets/images/index'
import '../../css/index.css'
// import nextLaunch from '../../nextLaunch.json'
// import nextLaunch2 from '../../nextLaunch2.json'


moment.locale()
const { Column, ColumnGroup } = Table;

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
    align: 'left',
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

export default ({ launches,  whoseData}) => {
  let launchesWithTimer = []
  switch (whoseData) {
    case 'launchLibrary':
      launchesWithTimer = launches.map(el => ({
        location: <div>
                    {el.pad.name}<br />
                    {el.pad.location.name}
                  </div>,
        RocketAndMissionName: <span>
                                <img src={COUNTRY_FLAG[el.pad.location.country_code]} style={{ width: '10%', marginRight: '10px' }} />
                                {el.name}
                              </span>,
        net: <Tooltip
                title={
                  <div>
                    <p style={{ textAlign: 'center' }}>Локальное время</p>
                    <p style={{ textAlign: 'center' }}>{moment(el.net).locale('ru').format('LLL')}</p>
                  </div>
                }
              >
                {moment(el.net).utc(0).locale('ru').format('LLL z')}
              </Tooltip>,
        timer: <Timer timeTillLaunch={el.net} />
      }))
        break;
      default:
        break; // some code
  }
  return (
    <div>
      <Table
        className="announced-table"
        dataSource={launchesWithTimer}
        pagination={false}
        size="small"
        columns={columns}
      />
    </div>
  )
}