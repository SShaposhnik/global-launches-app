import React from 'react'
import {Table} from 'antd'
import moment from 'moment'

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
        dataIndex: 'pads',
        width: 300,
      },
]

export default ({launches}) => {
    const launchesWithTimer = launches.map(el => ({
        RocketAndMissionName: el.name,
        net: moment(el.net).format('MMMM-YYYY'),
        status: launchStatus[el.status],
        pads: el.location.pads.map(els => (els.name))
    }))
    return (
        <Table  
            dataSource={launchesWithTimer} 
            pagination={{ pageSize: 10 , position: ['bottomCenter']}} 
            size="small" 
            columns={columns}
        />
    )   
}