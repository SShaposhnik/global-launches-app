import React from 'react'
import {Table, Pagination} from 'antd'
import moment from 'moment'
import { LoadingOutlined } from '@ant-design/icons';
import 'moment/locale/ru'
moment.locale()

const antIcon = <LoadingOutlined style={{ fontSize: 240 }} spin />;
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
        align: 'left'
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
        // align: 'right'
      },
]

export default ({launches}) => {
    const launchesWithTimer = launches.map(el => ({
        RocketAndMissionName: el.name,
        net: moment(el.net).locale('ru').format('MMMM YYYY'),
        status: launchStatus[el.status],
        pads: el.location.pads.map(els => (els.name)),
    }))
    return (
        <Table
            dataSource={launchesWithTimer}
            pagination={{ position: ['bottomCenter'], }}
            size="small"
            columns={columns}
        />
    )
}

// {this.state.markersLaunches
//     ? <MapChart launches={this.state.markersLaunches} />
//     : <h1>НАДО ВЫБРАТЬ ЗАПУСК</h1>
// }