import React from 'react'
import {Table, Pagination} from 'antd'
import moment from 'moment'
import { LoadingOutlined } from '@ant-design/icons';
import './NextLaunchTable.css'
import 'moment/locale/ru'
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

const columns = [
    {
        title: 'Название запуска',
        dataIndex: 'RocketAndMissionName',
        width: '30%',
        align: 'center',
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

export default ({launches}) => {
    const launchesWithTimer = launches.map(el => ({
        RocketAndMissionName: <p className='launchText'>{el.name}</p>,
        location: <div>
                        {el.location.pads.map(els => (els.name.split(',')[0]))}<br/>
                        {el.location.name.split(',')[0]}
                  </div>,
        net: moment(el.net).locale('ru').format('MMMM YYYY'),
        status: launchStatus[el.status],
        pads: el.location.pads.map(els => (els.name)),
    }))
    return (
        <Table
            dataSource={launchesWithTimer}
            pagination={{
              position: ['bottomCenter'],
              showSizeChanger: false,
              defaultCurrent: 1,
              // simple:"true",
              showQuickJumper: false,
              hideOnSinglePage: "true",
            }}
            size="small"
            columns={columns}
            bordered="false"
        />
    )
}