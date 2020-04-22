import React, {Component} from 'react'
import {Table} from 'antd'
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

export default ({launches}) => {
    const launchesWithTimer = launches.map(el => ({
        rocketName: el.rocket.name,
        missionsName: el.missions.map(els => (els.name)),
        net: el.net,
        status: launchStatus[el.status],
        timer: <Timer timeTillLaunch={el.net} />
    }))

    

    return (
        <Table dataSource={launchesWithTimer} pagination={{ pageSize: 5}} size="small">
            <ColumnGroup title="Name">
                <Column title="Название рокеты"     dataIndex="rocketName" />
                <Column title="Название миссии"    dataIndex="missionsName" />
            </ColumnGroup>
            <Column title="Дата запуска"            dataIndex="net" />
            <Column title="Статус запуска"          dataIndex="status" />
            <Column title="Таймер"                  dataIndex="timer" />
        </Table>
    )   
}