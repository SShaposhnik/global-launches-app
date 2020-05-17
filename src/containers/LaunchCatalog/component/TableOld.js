import React, {Component} from 'react'
import {Table, Modal, Tooltip} from 'antd'
import MapChart from './MapChart'
import '../component/modal/modal.css'
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import moment from 'moment'
import 'moment/locale/ru'
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import 'moment/locale/en-au'
import '../styled/load.css'

moment.locale()
const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

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


class OldTable extends Component {
  constructor(props) {
      super(props)
      this.state = {
          markersLaunches: null
      }

      this.scrollToTop = this.scrollToTop.bind(this);
  }


  scrollToTop() {
      scroll.scrollToTop();
    }


    showModal = () => {
      this.setState({
        visible: true,
      })
    }

    handleOk = e => {
      // console.log(e)
      this.setState({
        visible: false,
      })
    }

    handleCancel = e => {
      // console.log(e)
      this.setState({
        visible: false,
      })
    }











  render () {

    const oldLaunch= this.props.launches.map(el => ({
        key: el.id,
        RocketAndMissionName: <a>{el.name}</a>,
        name: el.name,
        rocket: el.rocket.name,
        net: <Tooltip title = {
                <div>
                  <p style={{textAlign:'center'}}>Локальное время</p>
                  <p style={{textAlign:'center'}}>{moment(el.net).locale('ru').format('LLL Z')}</p>
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
              dataSource={oldLaunch}
              pagination={{
                position: ['bottomCenter'],
                defaultCurrent:1,
                // simple:"true",
                pageSizeOptions:['10', '50', '100'],
                showQuickJumper:"true",
              }}
              size="small"
              className="table"
              style={{margin:10}}
            >
              <Column title="Название запуска" dataIndex="RocketAndMissionName"   width="400"
                onCell={(selectedRows, selectedRowKeys) => {
                    return {
                      onClick: event => {
                      this.setState({markersLaunches: [selectedRows]})
                      this.showModal()
                      // console.log('markersLaunches = ',this.markersLaunches);
                      // как вывести markersLaunches

                    }, // click row
                    }
                  }}
                  fixed={true}
              >
              </Column>
                <Column title="Дата запуска"     dataIndex="net"                    width="200" ></Column>
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
                onFilter={ (value, record) => record.statusText.indexOf(value) === 0}
              >

              </Column>
              <Column title="Космодром"        dataIndex="pads"                   width="300"></Column>
            </Table>
            <Modal
              centered
              // title="Расположение запуска на карте"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              footer={null}
              width='65%'
              className="modal"
            >
              <MapChart launches={this.state.markersLaunches} />
            </Modal>
    </div>

    )
    }
}

export default OldTable
