import React, { Component } from 'react'
import { Table, Modal, Tooltip, Input, Button, Space } from 'antd'
import Highlighter from 'react-highlight-words';
import MapChart from '../MapChart/MapChart'
import moment from 'moment'
import 'moment/locale/ru'
import './TableOld2.css'
import swal from '@sweetalert/with-react'
import { ClearOutlined, CheckOutlined, SearchOutlined } from '@ant-design/icons'

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

const COUNTRY = {
  USA: 'США',
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
      markersLaunches: null,
      searchText: '',
      searchedColumn: '',
      show: false,
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
          placeholder={`Search ${dataIndex}`}
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
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
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
      searchedColumn: dataIndex.name,
    })
  }

  handleReset = clearFilters => {
    clearFilters()
    this.setState({ searchText: '' })
  }

  render() {
    const columns = [
      {
        title: "Название запуска",
        dataIndex: "RocketAndMissionName",
        className: 'Name-launch-style',
        width: '30%',
        align: 'center',
        ...this.getColumnSearchProps('Имя'),
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
              // swal({
              //   // icon: 'error',
              //   buttons: false,
              //   content: (
              //     <MapChart tableData={[selectedRows] } flag={true}/>
              //   )
              // })
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
          // {
          //   text: 'Фильтр по космодромам',
          //   value: 'Submenu',
          //   children: [
          //     {
          //       text: 'Cape Canaveral',
          //       value: 'Cape Canaveral',
          //     },
          //     {
          //       text: 'Jiuquan',
          //       value: 'Jiuquan',
          //     },
          //   ],
          // }
        ],
        onFilter: (value, record) => { return record.countryCode.indexOf(value) === 0 },
      },
    ]
    const loading = this.props.loading

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

    return (
      <div >
        <Table
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
          // bordered="true"
        >
        </Table>









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

export default OldTable2
