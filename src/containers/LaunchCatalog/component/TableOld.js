import React, {Component} from 'react'
import {Table} from 'antd'

const {Column} = Table;
const launchStatus = {
    1: 'Запланированы точные дата и время запуска',
    2: 'Дата и время будут объявлены позже',
    3: 'Запуск прошел успешно',
    4: 'Неудачный запуск',
    5: 'Незапланированная задержка',
    6: 'В полете',
    7: 'Во время запуска произошел частичный сбой',
}

export default ({launches}) => {
    const oldLaunch= launches.map(el => ({
        name: el.name,
        net: el.net,
        status: launchStatus[el.status],
        timer: el.location.pads.map(els => (els.name))
    }))
    return (
        <Table dataSource={oldLaunch} pagination={{ pageSize: 20}} size="small">
            <Column title="Название запуска"  dataIndex="name" />
            <Column title="Дата запуска "  dataIndex="net" />
            <Column title="Статус"  dataIndex="status" />
            <Column title="Космодром"  dataIndex="timer" />
        </Table>
    )   
}
