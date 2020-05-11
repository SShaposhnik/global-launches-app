import React from 'react'
import {Table, } from 'antd'
import Timer from './Timer'


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
    //   {
    //     title: 'Статус запуска',
    //     dataIndex: 'status',
    //     width: 200,
    //   },
      {
        title: 'Космодром',
        dataIndex: 'pads',
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
        missionsName: el.missions.map(els => (els.name)),
        RocketAndMissionName: el.name,
        pads: el.location.pads.map(p => (p.name)),
        net: el.net,
        status: launchStatus[el.status],
        timer: <Timer timeTillLaunch={el.net}/>
        // timer: moment(<Timer timeTillLaunch={el.net}/>)
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