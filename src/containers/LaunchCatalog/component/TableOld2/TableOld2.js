import React, { Component } from 'react'
import { Table, Modal, Tooltip, Input, Button, Space } from 'antd'
import Highlighter from 'react-highlight-words';
import MapChart from '../MapChart/MapChart'
import moment from 'moment'
import 'moment/locale/ru'
import './TableOld2.css'
import { ClearOutlined, CheckOutlined, SearchOutlined } from '@ant-design/icons'
const loadingIcon = <SearchOutlined style={{ fontSize: 30 }} spin />;


moment.locale()
const { Column } = Table
const launchStatus = {
  1: 'Запуск скоро состоится',
  2: 'Дата и время будут объявлены позже',
  3: 'Успешно',
  4: 'Неудача',
  5: 'Задержка',
  6: 'В полете',
  7: 'Произошел сбой',
}

const country = {
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
    onFilter: (value, record) =>
      record.name.toString().toLowerCase().includes(value.toLowerCase()),
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
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex.name,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  render() {
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

      statusText: launchStatus[el.status],
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
    // перевернуть дату
    oldLaunch.reverse()
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
            filterReset: <ClearOutlined spin/>,
            filterConfirm: <CheckOutlined/>,
          }}
          loading={loading}
        >
          <Column
            title="Название запуска"
            dataIndex="RocketAndMissionName"
            width="400"
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
            title="Площадка / Космодром"
            dataIndex="location"
            width="300"
            filters={[
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
          width='70%'
          closable={false}
        >
          <MapChart launches={this.state.markersLaunches} />
        </Modal>
      </div>

    )
  }
}

export default OldTable2
