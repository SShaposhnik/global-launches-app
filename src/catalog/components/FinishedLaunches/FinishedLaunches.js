import React, { Component } from 'react'

import { Table, Modal, Tooltip, Input, Button, Space } from 'antd'
import { ClearOutlined, CheckOutlined, SearchOutlined, SettingFilled } from '@ant-design/icons'
import Popover from "@material-ui/core/Popover";
import Highlighter from 'react-highlight-words'
import moment from 'moment'
import 'moment/locale/ru'

import MapChart from '../MapChart/MapChart'

import {usaFlag, chinaFlag, franceFlag, indiaFlag, iranFlag, japanFlag, kazakhstanFlag, newzealandFlag, russiaFlag, ukFlag} from '../../../assets/images/index'
import agencies from '../../agency.json'
import '../../css/index.css'

moment.locale()

const { Column } = Table
const LAUNCH_STATUS = {
  1: 'Запуск скоро состоится',
  2: 'Дата и время будут объявлены позже',
  3: 'Успешно',
  4: 'Неудача',
  5: 'Задержка',
  6: 'В полете',
  7: 'Произошел сбой',
}

const COUNTRY_FLAG = {
  USA: usaFlag,
  CHN: chinaFlag,
  KAZ: kazakhstanFlag,
  IRN: iranFlag,
  RUS: russiaFlag,
  FRA: franceFlag,
  JPN: japanFlag,
  NZL: newzealandFlag,
  IND: indiaFlag,
  UNK: ukFlag,

}

let listIDandCountryCode = {}
let count = 0
while (count <= agencies.agencies.length - 1) {
  listIDandCountryCode[agencies.agencies[count].id] = (agencies.agencies[count].countryCode)
  count++
}

console.log(listIDandCountryCode);


class FinishedTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      markersLaunches: null,
      searchText: '',
      searchedColumn: '',
      show: false,
      anchorElRight: null,
      finishedLaunches: null,
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

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Поиск
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Сбросить
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) => record.name.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
          text
        ),
  })
  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm()
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: toString(dataIndex),
    })
  }

  handleReset = clearFilters => {
    clearFilters()
    this.setState({ searchText: '' })
  }

  render() {
    const {anchorElRight} = this.state
    const loading = this.props.loading
    const oldLaunch = this.props.launches.map(el => ({
      key: el.id,
      RocketAndMissionName: <span><img src={COUNTRY_FLAG[listIDandCountryCode[el.lsp]]} style={{width: '10%', marginRight: '10px'}}/>  <a>{el.name}</a></span>,
      name: el.name,
      rocket: el.rocket.name,
      net: <Tooltip title={
        <div>
          <p style={{ textAlign: 'center' }}>Локальное время</p>
          <p style={{ textAlign: 'center' }}>{moment(el.net).locale('ru').format('LLL')}</p>
        </div>}>
        {moment(el.net).utc(0).locale('ru').format('LLL z')}
      </Tooltip>,
      statusText: LAUNCH_STATUS[el.status],
      statusNumber: el.status,
      location: <div>
        {el.location.pads.map(els => (els.name.split(',')[0]))}<br />
        {el.location.name.split(',')[0]}
      </div>,
      locationWithoutPads: el.location.name,
      spaceortName: el.location.name.split(',')[0],
      longitude: el.location.pads.map(els => (els.longitude)),
      latitude: el.location.pads.map(els => (els.latitude)),
      PadsMapURL: el.location.pads.map(url => (url.mapURL)),
      PadsWikiURL: el.location.pads.map(url => (url.wikiURL)),
      RocketWikiURL: el.rocket.wikiURL,
      countryCode: el.location.countryCode,
    }))

    const oldLaunch2 = this.props.launches.map(el => ({
      key: el.id,
      RocketAndMissionName: <span><img src={COUNTRY_FLAG[listIDandCountryCode[el.lsp]]} style={{width: '10%', marginRight: '10px'}}/> <a>{el.name}</a></span>,
      name: el.name,
      rocket: el.rocket.name,
      net: <Tooltip title={
        <div>
          <p style={{ textAlign: 'center' }}>Локальное время</p>
          <p style={{ textAlign: 'center' }}>{moment(el.net).locale('ru').format('LLL')}</p>
        </div>}>
        {moment(el.net).utc(0).locale('ru').format('LLL z')}
      </Tooltip>,
      statusText: LAUNCH_STATUS[el.status],
      statusNumber: el.status,
      location: <div>
        {el.location.pads.map(els => (els.name.split(',')[0]))}<br />
        {el.location.name.split(',')[0]}
      </div>,
      locationWithoutPads: el.location.name,
      spaceortName: el.location.name.split(',')[0],
      longitude: el.location.pads.map(els => (els.longitude)),
      latitude: el.location.pads.map(els => (els.latitude)),
      PadsMapURL: el.location.pads.map(url => (url.mapURL)),
      PadsWikiURL: el.location.pads.map(url => (url.wikiURL)),
      RocketWikiURL: el.rocket.wikiURL,
      countryCode: el.location.countryCode,
    }))
    // переверачиваем дату, не особо важно. Влияет только на вывод
    oldLaunch.reverse() 
    oldLaunch2.reverse()

    const columns = [
      {
        title: "Название запуска",
        dataIndex: "RocketAndMissionName",
        className: 'Name-launch-style',
        width: '30%',
        align: 'left',
        ...this.getColumnSearchProps('Название запуска'),
        onCell: (selectedRows, selectedRowKeys) => {
          // selectedRowKeys -> number
          // selectedRows    -> data
          return {
            onClick: event => {
              // console.log(selectedRowKeys);
              // console.log(selectedRows);
              // this.setState({ markersLaunches: [selectedRows] })
              this.setState({ markersLaunches: [selectedRows] })
              this.showModal()
              // swal (
              //   <div>
              //     {/* <h1>{this.props.launches[0].name}</h1>
              //     <p>Время: {this.props.launches[0].net}</p>
              //     <p>Космодром: {this.props.launches[0].location.name}</p>
              //     <img src={Alien} style={{width: '50%'}}/> */}
              //     <LaunchCard launches={this.props.launches[0]} />
              //     {/* <MapChart tableData={this.state.markersLaunches} flag={true} /> */}
              //   </div>, 
              //   {button: false,}
              // )
            },
          }
        }
      },
      {
        title: "Дата запуска",
        dataIndex: "net",
        align: 'center',
        width: '25%',

      },
      {
        title: "Статус",
        dataIndex: "statusText",
        align: 'center',
        filters: [
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
        ],
        onFilter: (value, record) => { return record.statusText.indexOf(value) === 0 }
      },
      {
        title: "Площадка / Космодром",
        dataIndex: "location",
        width: '30%',
        align: 'center',
        filters: [
          {
            text: 'США',
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
        ],
        onFilter: (value, record) => { return record.countryCode.indexOf(value) === 0 },
      },
    ]
    const columns2 = [
      {
        title: "Название запуска",
        dataIndex: "RocketAndMissionName",
        className: 'Name-launch-style',
        width: '30%',
        align: 'left',
        ...this.getColumnSearchProps('Название запуска'),
        onCell: (selectedRows, selectedRowKeys) => {
          return {
            onClick: event => {
              this.setState({markersLaunches: [selectedRows]})
              this.setState({anchorElRight: event.currentTarget})
            },
          }
        }
      },
      {
        title: "Дата запуска",
        dataIndex: "net",
        align: 'center',
        width: '25%',

      },
      {
        title: "Статус",
        dataIndex: "statusText",
        align: 'center',
        filters: [
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
        ],
        onFilter: (value, record) => { return record.statusText.indexOf(value) === 0 }
      },
      {
        title: "Площадка / Космодром",
        dataIndex: "location",
        width: '30%',
        align: 'center',
        filters: [
          {
            text: 'США',
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
        ],
        onFilter: (value, record) => { return record.countryCode.indexOf(value) === 0 },
      },
    ]

    return (
      <div >
        <Table
          className='fineshed-launches-table'
          columns={columns}
          dataSource={oldLaunch}
          pagination={{
            position: ['bottomCenter'],
            defaultCurrent: 1,
            simple:"true",
            pageSizeOptions: ['10', '50', '100'],
            // showQuickJumper: "true",
            // hideOnSinglePage: "true",
          }}
          size="small"
          locale={{
            filterReset: <ClearOutlined />,
            filterConfirm: <CheckOutlined />,
          }}
          loading={loading}
          // bordered='true'
        >
        </Table>


        <Table
          className='fineshed-launches-table'
          columns={columns2}
          dataSource={oldLaunch2}
          pagination={{
            position: ['bottomCenter'],
            defaultCurrent: 1,
            simple:"true",
            pageSizeOptions: ['10', '50', '100'],
            // showQuickJumper: "true",
            // hideOnSinglePage: "true",
          }}
          size="small"
          locale={{
            filterReset: <ClearOutlined />,
            filterConfirm: <CheckOutlined />,
          }}
          loading={loading}
          // bordered='true'
        >
        </Table>

        <Popover
                open={Boolean(anchorElRight)}
                anchorEl={anchorElRight}
                onClose={() => this.setState({anchorElRight: null})}
                anchorOrigin={{
                  vertical: "center",
                  horizontal: "right"
                }}
                transformOrigin={{
                  vertical: "center",
                  horizontal: "left"
                }}
              >
                  <div className='custom-popover'>
                  <MapChart tableData={this.state.markersLaunches} flag={true} />
                  </div>
          </Popover>








        <Modal
          className='modal-style-from-oldTable2'
          centered
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
          width='70%'
          closable={false}
        >
          <MapChart tableData={this.state.markersLaunches} flag={true} />
        </Modal>
      </div>

    )
  }
}

export default FinishedTable
