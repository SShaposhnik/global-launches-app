import React from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const markerOffset = -10

const launchStatus = {
  1: 'Запланированы точные дата и время запуска',
  2: 'Дата и время будут объявлены позже',
  3: 'green',
  4: 'red',
  5: 'Незапланированная задержка',
  6: 'В полете',
  7: 'Во время запуска произошел частичный сбой',
}


const MapChart = ({launches}) => {
  const markers = launches.map( el => ({
    id: el.id,
    RocketAndMissionName: el.name,
    rocketName: el.rocket,
    status: el.statusNumber,
    markerOffset: markerOffset, 
    coordinates: [el.longitude, el.latitude],
  }))
  
  
  
  return (
    <ComposableMap
      projection="geoMercator"
      width="1800"
      height="1000"
      className="mapChart"
    >
  
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies
            .map(geo => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#EAEAEC"
                stroke="#D6D6DA"
              />
            ))
        }
      </Geographies>
      
      

      {markers.map(({rocketName, status, coordinates, markerOffset }) => (
        <Marker on coordinates={coordinates}>
          <circle r={4} fill={launchStatus[status]} stroke="#fff" strokeWidth={1}/>
          
          <text
            textAnchor="middle"
            y={markerOffset}
            style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
          >
            {rocketName}
          </text>
        </Marker>
      ))}
    </ComposableMap>
  )
}

export default MapChart;
