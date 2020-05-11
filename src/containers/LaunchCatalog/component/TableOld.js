import React, {Component} from 'react'
import {Table, Modal} from 'antd'
import MapChart from './MapChart'
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import '../styled/RadioStyle.css'
import '../styled/tablestyle.css'
import {LoadingOutlined } from '@ant-design/icons'
import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import './tableOldCss.css'
const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json"




// const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin/>

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
  // {
  //   title: 'id',
  //   dataIndex: 'key',
  //   width: 400,
  // },
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

      this.scrollToTop = this.scrollToTop.bind(this);
  }


  scrollToTop() {
      scroll.scrollToTop();
    }

  scrollToMap() {
      scroller.scrollTo('scroll-to-Map', {
        duration: 800,
        delay: 100,
        smooth: 'easeInOutQuart',
      })
    }
    scrollToTable() {
      scroller.scrollTo('scroll-to-Table', {
        duration: 800,
        delay: 100,
        smooth: 'easeInOutQuart',
      })
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
        rocket: el.rocket.name,
        net: el.net,
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
        <Link to="anchor12">якорь 12</Link>
        
        {/* <Element name="scroll-to-Table"> */}
          <Table
              onRow={(selectedRows, selectedRowKeys) => {
                return {
                  onClick: event => {console.log('onRow = ', selectedRows)
                  this.setState({markersLaunches: [selectedRows]})
                  this.showModal()
                  }, // click row
                }
              }}



              dataSource={oldLaunch} 
              pagination={{ 
                position: ['bottomCenter'], 
                defaultCurrent:1, 
                simple:"true", 
                // pageSize:"100",
                pageSizeOptions:['10', '50', '100'],
                showQuickJumper:"true",
              }} 
              size="small" 
              columns={columns}
              className="table" 
          />
        {/* </Element> */}

    {/* <Element name="scroll-to-Map">
      {this.state.markersLaunches
          ? <div className="noClick"> <MapChart launches={this.state.markersLaunches}/></div>
          : <div>ВЫБЕРИТЕ ЗАПУСК</div>
      }
    </Element> */}


                  <Modal
                    centered
                    // title="Расположение запуска на карте"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                    width={1000}
                    // bodyStyle={modal}
                    
                  >
                    <MapChart launches={this.state.markersLaunches}/>
                  </Modal>
    <a onClick={this.scrollToTable} >To element!</a> <br></br>
    <a onClick={this.scrollToTop}>To the top!   </a> <br></br>
    <div id="anchor12">якорь 12</div>
    </div>
    )
    }
}

export default OldTable
