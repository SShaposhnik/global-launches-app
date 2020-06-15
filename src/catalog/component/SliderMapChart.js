import React, { Component } from 'react'
import { Slider, Switch } from 'antd'
import moment from 'moment'
import 'moment/locale/ru'

import MapChart from './MapChart'
import '../css/index.css'

class SliderMapChart extends Component {
  constructor() {
    super()
    this.state = {
      markersLaunches: null,
      disabledSliderAndMap: false,
    }
  }



  render() {
    const MARKERS = this.props.launches.map(el => ({
      rocketName: el.rocket.name,
      flightStatus: el.status,
      coordinates: [el.location.pads.map(ele => (ele.longitude)), el.location.pads.map(ele => (ele.latitude))],
      net: moment(el.net).utc(0).locale('ru').format('YYYY-MM-DD'),
    }))

    return (
      <div>
          <MapChart launches={this.props.launches}/>
      </div>
    )
  }
}
export default SliderMapChart

// handleDisabledChange = disabledSliderAndMap => {
//   this.setState({ disabledSliderAndMap })
//   if (document.getElementById("slider").hidden == false) {
//     document.getElementById("slider").hidden = true
//   } else { document.getElementById("slider").hidden = false }
// }


    // const MAX_VALUE = MARKERS.length - 1

    // if (this.state.markersLaunches == null) {
    //   this.state.markersLaunches = [MARKERS[0]]
    // }


    // let markersChange = (value) => {

    //   this.setState({ markersLaunches: [MARKERS[value]] })
    //   tooltipFormat(value)
    // }

    // let markersChange2 = (value) => {

    //   let count = 0
    //   let newMarkers = []
    //   this.setState({ markersLaunches: [] })
    //   while (count < value) {
    //     newMarkers.push(MARKERS[count])
    //     count += 1
    //   }
    //   if (value == 0) {
    //     this.setState({ markersLaunches: [MARKERS[0]] })
    //   } else {
    //     this.setState({ markersLaunches: newMarkers })
    //   }
    //   tooltipFormat(value)
    // }

    // let markersChange3 = (value) => {

    //   let count = value[0]
    //   let newMarkers = []
    //   this.setState({ markersLaunches: [] })
    //   while (count <= value[1]) {
    //     newMarkers.push(MARKERS[count])
    //     count += 1
    //   }

    //   if (value[0] == 0 && value[1] == 0) {
    //     this.setState({ markersLaunches: [MARKERS[0]] })
    //   } else if (value[0] == value[1]) {
    //     this.setState({ markersLaunches: [MARKERS[value[0]]] })
    //   } else {
    //     this.setState({ markersLaunches: newMarkers })
    //   }
    //   tooltipFormat(value[0])
    // }


    // // this.setState({markersLaunches: [...this.markersLaunches , ]})

    // function tooltipFormat(value) {
    //   // return MARKERS[value].net
    //   return (<div></div>)
    // }


    {/* <Slider
              // range
              id="slider"
              tipFormatter={tooltipFormat}
              // tooltipVisible={true}
              max={[MAX_VALUE]}
              // min={[0]}
              defaultValue={[0]}
              onChange={markersChange}
            /><br /><br /><br />
            <div style={{ textAlign: 'center' }}>2 вариант</div>
            <Slider
              // range
              id="slider"
              // tooltipVisible={true}
              tipFormatter={tooltipFormat}
              max={[MAX_VALUE]}
              // min={[0]}
              defaultValue={[0]}
              onChange={markersChange2}
            /><br /><br /><br />
            <div style={{ textAlign: 'center' }}>3 вариант</div>
            <Slider
              range
              id="slider"
              // tooltipVisible={true}
              tipFormatter={tooltipFormat}
              max={[MAX_VALUE]}
              // min={[0]}
              defaultValue={[0, 0]}
              onChange={markersChange3}
            /> */}