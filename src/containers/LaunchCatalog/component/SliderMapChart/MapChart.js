import React from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps"
import { Tooltip } from 'antd'

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json"
const markerOffset =  - 30

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

const MapChartt = ({ launches }) => {
  const markers = launches.map(el => ({
    rocketName: el.rocketName,
    flightStatus: el.flightStatus,
    coordinates: el.coordinates,
    markerOffset: markerOffset,
  }))

  return (
    <div>
    <ComposableMap
      projection="geoMercator"
      width="1800"
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
      {markers.map(({ rocketName, flightStatus, coordinates, markerOffset  }) => (
        <Marker on coordinates={coordinates}
        className="MarkersSryle"
        >
            <g
              fill={launchStatus[flightStatus]}
              stroke="none"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="translate(-12, -24)"
            >
              <circle cx="12" cy="10" r="3" />
              <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
            </g>
            <text
            textAnchor="middle"
            y={markerOffset}
            style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
          >
            {rocketName}
          </text>
        </Marker>
      )
      )}
    </ComposableMap>
    </div>
  )
}

export default MapChartt
