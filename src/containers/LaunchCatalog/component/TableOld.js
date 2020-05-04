import React, {Component} from 'react'
import {Table, Card} from 'antd'
import MapChart from './MapChart'

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


class OldTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            markersLaunches: null,
        }
    }

    onTableChange(selectedRowKeys, selectedRows) {
        // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows),
        const launch = this.props.launches.find(el => el.key === selectedRows[0].id)
        this.setState({markersLaunches: launch})
        console.log(selectedRows[0], this.state.markersLaunches);
    }

    render () {

        const oldLaunch= this.props.launches.map(el => ({
            key: el.id,
            name: el.name,
            net: el.net,
            statusText: launchStatus[el.status],
            statusNumber: el.status,
            pads: el.location.pads.map(els => (els.name)), 
            longitude: el.location.pads.map(els => (els.longitude)),
            latitude: el.location.pads.map(els => (els.latitude)),
        }))

        return (
            <>
            <Table 
            rowSelection=
            {{
                type: 'radio', 
                onChange: (selectedRowKeys, selectedRows) => {
                    // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows),
                    this.setState({markersLaunches: selectedRows})
                    console.log(this.state.markersLaunches);
                },
            }}
            dataSource={oldLaunch} 
            pagination={{ pageSize: 10,}} 
            size="small" 
            scroll={{ x: 1500 }}
        >
                <Column title="id" dataIndex="key"/>
                <Column title="Название запуска"  dataIndex="name" />
                <Column title="Дата запуска "  dataIndex="net" />
                <Column title="Статус"  dataIndex="statusText" />
                <Column title="Космодром"  dataIndex="pads" />
        </Table>

        {this.state.markersLaunches
            ? <MapChart launches={this.state.markersLaunches} />
            : <p>WTF</p>
        }
        </>
        )
    }
}

export default OldTable
