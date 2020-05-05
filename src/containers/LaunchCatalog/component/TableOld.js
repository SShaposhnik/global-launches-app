import React, {Component} from 'react'
import {Table} from 'antd'
import MapChart from './MapChart'
import { Pagination } from 'antd';

const {Column} = Table;
const launchStatus = {
    1: 'Дата и время определены',
    2: 'Дата и время будут объявлены позже',
    3: 'Успешно',
    4: 'Неудача',
    5: 'Задержка',
    6: 'В полете',
    7: 'Произошел сбой',
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
        title: 'Статус',
        dataIndex: 'statusText',
        width: 100,
      },
      {
        title: 'Космодром',
        dataIndex: 'pads',
        width: 300,
      },
]

class OldTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            markersLaunches: null
        }
    }

    onTableChange(selectedRowKeys, selectedRows) {
        const launch = this.props.launches.find(el => el.key === selectedRows[0].id)
        this.setState({markersLaunches: launch})
        console.log(selectedRows[0], this.state.markersLaunches);
    }

    render () {

        const oldLaunch= this.props.launches.map(el => ({
            key: el.id,
            RocketAndMissionName: el.name,
            rocket: el.rocket.name,
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
                        this.setState({markersLaunches: selectedRows})
                    },
                }}
                
                dataSource={oldLaunch} 
                pagination={{ pageSize: 10, position: ['bottomCenter'], }} 
                size="small" 
                columns={columns}
                // scroll={{ x: 1500 }}
            />

        {this.state.markersLaunches
            ? <MapChart launches={this.state.markersLaunches} />
            : null
        }
        </>
        )
    }
}

export default OldTable
