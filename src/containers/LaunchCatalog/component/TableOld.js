import React, {Component} from 'react'
import {Table} from 'antd'
import Timer from './Timer'

const { Column} = Table;

export default ({launches}) => {
    const launchesWithTimer = launches.map(el => ({
        ...el,
        timer: <Timer timeTillLaunch={el.net} />
    }))
    return (
        <Table dataSource={launchesWithTimer} pagination={{ pageSize: 5 }}>
            <Column title="Launch name"  dataIndex="name" />
            <Column title="Launch date"  dataIndex="net" />
            <Column title="Timer"  dataIndex="timer" />
        </Table>
    )   
}
