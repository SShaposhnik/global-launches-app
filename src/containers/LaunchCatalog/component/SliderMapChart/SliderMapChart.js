import React, { Component } from 'react'
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker,
} from "react-simple-maps"
import './SliderMapChart.css'
import { Slider, Modal } from 'antd'
import MapChartt from '../SliderMapChart/MapChart'

const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json"
const markerOffset = - 30

// цвета маркеров
const launchStatus = {
    1: 'Запланированы точные дата и время запуска',
    2: 'Дата и время будут объявлены позже',
    3: 'green',
    4: 'red',
    5: 'Незапланированная задержка',
    6: 'В полете',
    7: 'Во время запуска произошел частичный сбой',
}

class SliderMapChart extends Component {
    constructor(props) {
        super(props)
        this.state = {
          markersLaunches: null,
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
        const MARKERS = this.props.launches.map(el => ({
            rocketName: el.rocket.name,
            flightStatus: el.status,
            coordinates: [el.location.pads.map(ele => (ele.longitude)), el.location.pads.map(ele => (ele.latitude))],
            markerOffset: markerOffset,
        }))
        const MAX_VALUE = MARKERS.length - 1

        const markersChange = (value) => {
            let markers = [MARKERS[value]]
            this.setState({ markersLaunches : markers})
            // console.log(markers);
            
            // console.log(this.state.markersLaunches[value]);
        }

        return (
            <div>
                <Slider
                    // range
                    max={[MAX_VALUE]}
                    defaultValue={[0]}
                    // disabled={disabled}
                    tooltipVisible={true}
                    onChange={markersChange}
                />
                {this.state.markersLaunches
                    ? <MapChartt launches={this.state.markersLaunches} />
                    : <p>WTF</p>
                }
                {/* <Modal
                    centered
                    // title="Расположение запуска на карте"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                    width='70%'
                    closable={false}
                    >
                    <MapChartt launches={this.state.markersLaunches} />
                </Modal> */}
                {/* {this.state.markersData != null
                    ?<MapChartt launches={MARKERs} />
                    : <div>обожди</div>
                } */}
            </div>
        )

    }
}
export default SliderMapChart


// export default ({ launches }) => {
//     const markers = launches.map(el => ({
//         rocketName: el.rocket.name,
//         flightStatus: el.status,
//         coordinates: [el.location.pads.map(ele => (ele.longitude)), el.location.pads.map(ele => (ele.latitude))],
//         markerOffset: markerOffset,
//     }))
//     // console.log(markers);
//     // markerFillun (){

//     // }
//     }
//     return (
//         <div>
//             <ComposableMap
//                 projection="geoMercator"
//                 width="1000"
//                 height="600"
//                 className="MapChartStyle"
//             >
//                 <Geographies geography={geoUrl}>
//                     {({ geographies }) =>
//                         geographies.map(geo => (
//                             <Geography
//                                 key={geo.rsmKey}
//                                 geography={geo}
//                                 fill="#EAEAEC"
//                                 stroke="#D6D6DA"
//                             />
//                         ))
//                     }

//                 </Geographies>
//                 {markers.map(({ rocketName, flightStatus, coordinates, markerOffset }) => (
//                     <Marker on coordinates={coordinates}
//                         className="MarkersSryle"
//                     >
//                         <g
//                             fill={launchStatus[flightStatus]}
//                             stroke="none"
//                             strokeWidth="3"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             transform="translate(-12, -24)"
//                         >
//                             <circle cx="12" cy="10" r="3" />
//                             <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
//                         </g>
//                     </Marker>
//                 )
//                 )}
//             </ComposableMap>
//             <Slider
//                 max={[maxValue]}
//                 defaultValue={[1]}
//                 tooltipVisible={true}
//                 // onChange={this.markerFilling}
//             />
//         </div>
//     )