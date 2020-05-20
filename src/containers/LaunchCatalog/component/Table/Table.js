import React from 'react'
import {Table, Tooltip} from 'antd'
import Timer from '../Timer/Timer'
import 'moment/locale/ru'
// import 'moment/locale/en-au'
import moment from 'moment'
import './Table.css'
moment.locale()


const { Column, ColumnGroup} = Table;

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
        width: 400,
      },
      {
        title: 'Дата запуска',
        dataIndex: 'net',
        width: 200,
      },
      {
        title: 'Космодром',
        dataIndex: 'padsName',
        width: 300,
      },
      {
        title: 'Таймер',
        dataIndex: 'timer',
        width: 200,
      },
]

export default ({launches}) => {
    const launchesWithTimer = launches.map(el => ({
        rocketName: el.rocket.name,
        padsName: el.location.name.split(',')[0],
        missionsName: el.missions.map(els => (els.name)),
        RocketAndMissionName: el.name,
        pads: el.location.pads.map(p => (p.name)),
        net: <Tooltip title = {<div><p style={{textAlign:'center'}}>Локальное время</p> <p style={{textAlign:'center'}}>{moment(el.net).locale('ru').format('LLL')}</p></div>}>{moment(el.net).utc(0).locale('ru').format('LLL z')}</Tooltip>,
        status: launchStatus[el.status],
        timer: <Timer timeTillLaunch={el.net}/>
    }))
    return (
        <Table
            dataSource={launchesWithTimer}
            pagination={false}
            size="small"
            columns={columns}
        />
    )
}