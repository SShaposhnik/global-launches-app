import React from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const markers = [
  { markerOffset: -10, name: "Launch Complex 39A, Kennedy Space Center, FL", coordinates: [-80.60428186,28.60822681] }

];

let MapChart = () => {
  return (
    <ComposableMap
      projection="geoMercator"
      width="1200"
      height="600"
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
      {markers.map(({ name, coordinates, markerOffset }) => (
        <Marker key={name} coordinates={coordinates}>
          <circle r={3} fill="green" stroke="#fff"/>
          <text
            textAnchor="middle"
            
            y={markerOffset}
            style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
          >
            {name}
          </text>
        </Marker>
      ))}
      
    </ComposableMap>
  );
};

export default MapChart;
