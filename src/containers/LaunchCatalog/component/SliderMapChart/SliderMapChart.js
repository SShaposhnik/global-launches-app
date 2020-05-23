import React, { Component } from 'react'
import './SliderMapChart.css'
import { Slider, Switch } from 'antd'
import MapChartt from '../SliderMapChart/MapChart'
import moment from 'moment'
import 'moment/locale/ru'

class SliderMapChart extends Component {
    constructor(props) {
        super(props)
        this.state = {
          markersLaunches: null,
          disabledSliderAndMap: false,
        }
      }

    handleDisabledChange = disabledSliderAndMap => {
        this.setState({ disabledSliderAndMap })
        if (document.getElementById("slider").hidden == false) {
            document.getElementById("slider").hidden = true
        } else {document.getElementById("slider").hidden = false}
    }

    render() {
        const { disabledSliderAndMap } = this.state

        const MARKERS = this.props.launches.map(el => ({
            rocketName: el.rocket.name,
            flightStatus: el.status,
            coordinates: [el.location.pads.map(ele => (ele.longitude)), el.location.pads.map(ele => (ele.latitude))],
            net: moment(el.net).utc(0).locale('ru').format('YYYY-MM-DD'),
        }))

        const MAX_VALUE = MARKERS.length - 1
        if (this.state.markersLaunches == null){
            this.state.markersLaunches = [MARKERS[0]]
        }

        let markersChange = (value) => {
            this.setState({ markersLaunches : [MARKERS[value]]})
            tooltipFormat(value)
        }

        function tooltipFormat (value) {
            return MARKERS[value].net
        }



        let mark = (count, value0, value1) => {
            while (count > 0) {
                this.setState({markersLaunches : [MARKERS[value0]]})
                count -= 1
            }
        }
        let markersChange2 = (value) => {
            let count = value[1] - value[0]
            if (count == 0) {
                count = 1
            }
            this.setState({markersLaunches : [MARKERS[value[0]]]})
            console.log(this.state.markersLaunches)
            markersChange3(value[1])
            tooltipFormat(value[0])
        }

        let markersChange3 = (value) => {
            let count = value[1] - value[0]
            if (count == 0) {
                count = 1
            }
            this.setState({markersLaunches : [MARKERS[value]]})
            
            tooltipFormat(value[0])
        }





        let func = () => {
            console.log('check')
        }





        return (
            <div>
                Slider: <Switch size="small" checked={disabledSliderAndMap} onChange={this.handleDisabledChange}/>
            {/* <div id = "slider" hidden> */}
            <div id = "slider" >
                <button onClick={func}>ТЫК</button>
                <Slider
                    // range
                    id="slider"
                    tipFormatter={tooltipFormat}
                    max={[MAX_VALUE]}
                    defaultValue={[0]}
                    onChange={markersChange}
                />
                <Slider
                    tipFormatter={tooltipFormat}
                    range
                    id="slider"
                    max={[MAX_VALUE]}
                    defaultValue={[0, 0]}
                    onChange={markersChange2}
                />
                <MapChartt launches={this.state.markersLaunches} />
            </div>
            </div>
        )

    }
}
export default SliderMapChart