import React, { Component } from 'react'
import { Table, Modal, Tooltip, Input, Space, Button } from 'antd'
import MapChart from '../MapChart/MapChart'
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import moment from 'moment'
import 'moment/locale/ru'
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

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

class OldTable extends Component {
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
  });

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
    const columns = [
      {
        title: "Название запуска",
        dataIndex: "RocketAndMissionName",
        width: "400",
        ...this.getColumnSearchProps('Имя'),
        onCell: (selectedRows, selectedRowKeys) => {
          return {
            onClick: event => {
              this.setState({ markersLaunches: [selectedRows] })
              this.showModal()
            },
          }
        }
      },
      {
        title: "Дата запуска",
        dataIndex: "net",
      },
      {
        title: "Статус",
        dataIndex: "statusText",
        width: "100",
      },
      {
        title: "Космодром",
        dataIndex: "pads",
        width: "300"
      },
    ]
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
        {moment(el.net).utc(0).locale('ru').format('LLL Z')}
      </Tooltip>,
      statusText: launchStatus[el.status],
      statusNumber: el.status,
      pads: el.location.pads.map(els => (els.name)),
      longitude: el.location.pads.map(els => (els.longitude)),
      latitude: el.location.pads.map(els => (els.latitude)),
      PadsMapURL: el.location.pads.map(url => (url.mapURL)),
      PadsWikiURL: el.location.pads.map(url => (url.wikiURL)),
      RocketWikiURL: el.rocket.wikiURL,
    }))
    return (
      <div >
        <Table
          columns={columns}
          dataSource={oldLaunch}
          pagination={{
            position: ['bottomCenter'],
            defaultCurrent: 1,
            // simple:"true",
            pageSizeOptions: ['10', '50', '100'],
            showQuickJumper: "true",
          }}
          size="small"
          className="table"
          style={{ margin: 10 }}
          bordered="true"
        >
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

export default OldTable
