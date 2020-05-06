import React, {Component} from 'react'
import {Table, Divider, Button, Tooltip} from 'antd'
import MapChart from './MapChart'
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import '../styled/RadioStyle.css'
import '../styled/tablestyle.css'
import { SmileOutlined,LoadingOutlined } from '@ant-design/icons'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin/>

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
          smooth: 'easeInOutQuart'
        })
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
            PadsMapURL: el.location.pads.map(url => (url.mapURL)),
            PadsWikiURL: el.location.pads.map(url => (url.wikiURL)),
            RocketWikiURL: el.rocket.wikiURL,

        }))

        return (
            <>
                {/* <Pagination total={123} className="index"/> */}

                {/* <div className="table">Animated CSS Gradient Border ></div> */}
            <Element name="scroll-to-Table" className="element">
            <Table 
                rowSelection={{
                    type: 'radio', 
                    onChange: (selectedRowKeys, selectedRows) => {
                        this.setState({markersLaunches: selectedRows})
                    },
                    onSelect: (this.scrollToMap),
                }}

                dataSource={oldLaunch} 

                pagination={{ 
                  position: ['bottomCenter'], 
                  defaultCurrent:1, 
                  simple:"true", 
                  pageSizeOptions:"false",
                }} 

                size="small" 
                columns={columns}
                className="table"
                
            />
            </Element>
        <Element name="scroll-to-Map" className="element">
            {this.state.markersLaunches
                ? <div className="noClick"> <MapChart launches={this.state.markersLaunches}/></div>
                : <p></p>
            }
        </Element>
        
        <a onClick={this.scrollToTable} >To element!</a> <br></br>
        <a onClick={this.scrollToTop}>To the top!</a><br></br>

        </>
        )
    }
}

export default OldTable
