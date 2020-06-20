import React from 'react'

import { ComposableMap, Geographies, Geography, Marker, } from "react-simple-maps"
import { Tooltip } from 'antd'
import '../../css/index.css'


const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json"
const MARKER_OF_SET = - 30

// цвета маркеров
const LAUNCH_STATUS = {
  1: 'Запланированы точные дата и время запуска',
  2: 'Дата и время будут объявлены позже',
  3: '#36d325',
  4: '#791a1f',
  'Успешно': '#36d325',
  'Неудача': '#791a1f',
  5: 'Незапланированная задержка',
  6: 'В полете',
  7: 'Во время запуска произошел частичный сбой',
}

const MapChart = ({ data, whereData }) => {
  let markers = []
  console.log(whereData, data);
  switch (whereData) {
    case 'launchLibrary':
    markers = data.map(el => ({
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
    break

    case 'roscosmosAPI':
      markers = data.map(el  => ({
        RocketAndMissionNames: el.name,
        coordinates: el.coordinates,
        markerOffset: MARKER_OF_SET,
        status: el.statusText,
      }))
      break
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
