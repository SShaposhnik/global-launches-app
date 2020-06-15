import React from 'react'

import { ComposableMap, Geographies, Geography, Marker, } from "react-simple-maps"
import { Tooltip } from 'antd'
import Popover from "@material-ui/core/Popover";
import '../css/index.css'


const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json"
const MARKER_OF_SET = - 30

// цвета маркеров
const LAUNCH_STATUS = {
  1: 'Запланированы точные дата и время запуска',
  2: 'Дата и время будут объявлены позже',
  3: '#36d325',
  4: '#791a1f',
  5: 'Незапланированная задержка',
  6: 'В полете',
  7: 'Во время запуска произошел частичный сбой',
}

const MapChart = ({ launches, flag, tableData }) => {
  let markers = []
  
  if (launches == null && tableData == null) {
    console.log('Markers not found!');
  } else if (flag) {
    markers = tableData.map(el => ({
      RocketAndMissionNames: el.name,
      rocketName: el.rocketName,
      status: el.statusNumber,
      markerOffset: MARKER_OF_SET,
      coordinates: [el.longitude, el.latitude],
      padsMapURL: el.padsMapURL,
      padsWikiURL: el.padsWikiURL,
      rocketwikiURL: el.rocketwikiURL,
      latitude: el.latitude,
      longitude: el.longitude,
    }))
  } else {
    markers = launches.map(el => ({
      RocketAndMissionNames: el.name,
      rocketName: el.rocket.name,
      status: el.status,
      markerOffset: MARKER_OF_SET,
      coordinates: [el.location.pads.map(els => (els.longitude)), el.location.pads.map(els => (els.latitude))],
      padsMapURL: el.location.pads.map(els => (els.mapURL)),
      padsWikiURL: el.location.pads.map(els => (els.wikiURL)),
      rocketwikiURL: el.rocket.wikiURL,
      latitude: el.location.pads.map(els => (els.latitude)),
      longitude: el.location.pads.map(els => (els.longitude)),
    }))
  }
  return (
    <ComposableMap
      projection="geoMercator"
      width="1000"
      height="600"
      className="MapChartStyle"
    >
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map(geo => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill="#EAEAEC"
              stroke="#D6D6DA"
            />
          ))
        }
      </Geographies>
      {markers.map(({ rocketName, status, coordinates, markerOffset, padsWikiURL, rocketwikiURL, latitude, longitude, RocketAndMissionNames }) => (
        <Marker on coordinates={coordinates}>
          <Tooltip
            overlayClassName="tooltipInMapChart"
            title={
              <div>
                <a href={"http://maps.google.com/maps?q=" + latitude + "," + longitude} target="_blank">Google Maps</a><br></br>
                <a href={padsWikiURL} target="_blank">Космодром вики</a><br></br>
                <a href={rocketwikiURL} target="_blank">Ракета вики</a><br></br>
              </div>

            }
            placement="bottom"
            mouseLeaveDelay="0.3"
          >
            <circle r={5} fill={LAUNCH_STATUS[status]} className='MarkersSryle'/>
          </Tooltip>
          <text
            textAnchor="middle"
            y={markerOffset}
            style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
          >
            {RocketAndMissionNames.split('|')[0]}
          </text>
        </Marker>
      )
      )}
    </ComposableMap>
  )
}

export default MapChart
