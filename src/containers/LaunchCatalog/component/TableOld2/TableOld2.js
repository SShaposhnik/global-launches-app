import React, { Component } from 'react'
import { Table, Modal, Tooltip } from 'antd'
import MapChart from '../MapChart/MapChart'
import moment from 'moment'
import 'moment/locale/ru'
import './TableOld2.css'
import {ClearOutlined, CheckOutlined} from '@ant-design/icons'

moment.locale()
const { Column } = Table;
const launchStatus = {
  1: 'Дата и время определены',
  2: 'Дата и время будут объявлены позже',
  3: 'Успешно',
  4: 'Неудача',
  5: 'Задержка',
  6: 'В полете',
  7: 'Произошел сбой',
}

const country = {
  USA: 'Америка',
  CHN: 'Китай',
  KAZ: 'Казахстан',
  IRN: 'Иран',
  RUS: 'Россия',
  GUF: 'Французская Гвиана',
  JPN: 'Япония',
  NZL: 'Новая Зеландия',
  IND: 'Индия',
  UNK: 'Великобритания',
}

class OldTable2 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      markersLaunches: null
    }
  }

  showModal = () => {
    this.setState({
      visible: true,
    })
  }

  handleOk = e => {
    this.setState({
      visible: false,
    })
  }

  handleCancel = e => {
    this.setState({
      visible: false,
    })
  }

  render() {

    const oldLaunch = this.props.launches.map(el => ({
      key: el.id,
      RocketAndMissionName: <a>{el.name}</a>,
      name: el.name,
      rocket: el.rocket.name,
      net: <Tooltip title={
        <div>
          <p style={{ textAlign: 'center' }}>Локальное время</p>
          <p style={{ textAlign: 'center' }}>{moment(el.net).locale('ru').format('LLL')}</p>
        </div>}>
        {moment(el.net).utc(0).locale('ru').format('LLL z')}
      </Tooltip>,

      statusText: launchStatus[el.status],
      statusNumber: el.status,
      pads: el.location.name.split(',')[0],
      locationWithoutPads: el.location.name,
      longitude: el.location.pads.map(els => (els.longitude)),
      latitude: el.location.pads.map(els => (els.latitude)),
      PadsMapURL: el.location.pads.map(url => (url.mapURL)),
      PadsWikiURL: el.location.pads.map(url => (url.wikiURL)),
      RocketWikiURL: el.rocket.wikiURL,
      countryCode: el.location.countryCode,
    }))

    // перевернуть дату
    // oldLaunch.reverse()

    return (
      <div >
        <Table
          dataSource={oldLaunch}
          pagination={{
            position: ['bottomCenter'],
            defaultCurrent: 1,
            // simple:"true",
            pageSizeOptions: ['10', '50', '100'],
            showQuickJumper: "true",
            hideOnSinglePage: "true",
          }}
          size="small"
          className="table"
          style={{ margin: 10 }}
          locale={{
            filterReset: <ClearOutlined />,
            filterConfirm: <CheckOutlined />,
          }}
        >
          <Column title="Название запуска" dataIndex="RocketAndMissionName" width="400"
            onCell={(selectedRows, selectedRowKeys) => {
              return {
                onClick: event => {
                  this.setState({ markersLaunches: [selectedRows] })
                  this.showModal()
                },
              }
            }}
            fixed={true}
          >
          </Column>
          <Column title="Дата запуска" dataIndex="net" width="200" ></Column>
          <Column
            title="Статус"
            dataIndex="statusText"
            width="100"
            filters={[
              {
                text: 'Успешно',
                value: 'Успешно',
              },
              {
                text: 'Неудача',
                value: 'Неудача',
              },
              {
                text: 'Произошел сбой',
                value: 'Произошел сбой',
              },
            ]}
            onFilter={(value, record) => record.statusText.indexOf(value) === 0}
          >

          </Column>

          <Column
            title="Космодром"
            dataIndex="pads"
            width="300"
            filters={[
              {
                text: 'Америка',
                value: 'USA',
              },
              {
                text: 'Китай',
                value: 'CHN',
              },
              {
                text: 'Казахстан',
                value: 'KAZ',
              },
              {
                text: 'Иран',
                value: 'IRN',
              },
              {
                text: 'Россия',
                value: 'RUS',
              },
              {
                text: 'Французская Гвиана',
                value: 'GUF',
              },
              {
                text: 'Япония',
                value: 'JPN',
              },
              {
                text: 'Новая Зеландия',
                value: 'NZL',
              },
              {
                text: 'Индия',
                value: 'IND',
              },
              {
                text: 'Великобритания',
                value: 'UNK',
              },
              {
                text: 'Тут можно сделать добавить фильтр, если нужно',
                value: 'Submenu',
                children: [
                  {
                    text: 'Green',
                    value: 'Green',
                  },
                  {
                    text: 'Black',
                    value: 'Black',
                  },
                ],
              }
            ]}

            onFilter={(value, record) => record.countryCode.indexOf(value) === 0}
          >

          </Column>
        </Table>
        <Modal
          centered
          // title="Расположение запуска на карте"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
          width='65%'
        >

          <MapChart launches={this.state.markersLaunches} />
        </Modal>
      </div>

    )
  }
}

export default OldTable2
