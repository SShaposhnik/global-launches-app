import React from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

// const markers = [
//   { markerOffset: -10, name: "Launch Complex 39A, Kennedy Space Center, FL", coordinates: [-80.60428186,28.60822681] }

// ];
const markerOffset = -30

const MapChart = ({launches}) => {
  const markers = launches.map( el => ({
    name: el.name,
    status: el.status,
    markerOffset: markerOffset, 
    coordinates: [el.location.pads[0].longitude, el.location.pads[0].latitude]
  }))

  return (
    <ComposableMap
      projection="geoMercator"
      width="1200"
      height="600"
      
    >
      <ZoomableGroup zoom={1}>
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
      {markers.map(({ name, status, coordinates, markerOffset }) => (
        <Marker on key={name} coordinates={coordinates}>
          <circle r={1}  stroke="#fff"/>
          <text
            textAnchor="middle"
            
            y={markerOffset}
            style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
          >
            {name}
          </text>
        </Marker>
      ))}
      </ZoomableGroup>
    </ComposableMap>
  );
};

export default MapChart;
