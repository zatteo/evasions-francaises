/* eslint-disable */
const fs = require('fs');
const osmsm = require('osm-static-maps');

const loadedAlternatives = require('../assets/alternatives.json');

const generateMap = async (alternative) => {
  console.log(`Generating ${alternative.label}.jpg...`)
  const imageBinaryBuffer = await osmsm({
    geojson: {
      type: "Point",
      coordinates: [alternative.longitude, alternative.latitude]
    },
    center: '1.8752777777777778,46.6061111',
    zoom: 5,
    attribution: '© OpenStreetMap contributors',
    height: 380,
    width: 380,
    quality: 70,
    markerIconOptions: {
      iconUrl: 'http://localhost:8080/assets/marker.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32]
    }
  });

  console.log(`Writing ${alternative.label}.jpg...`)
  fs.writeFileSync(`./public/assets/maps/${alternative.label}.jpg`, imageBinaryBuffer, 'binary');
}

loadedAlternatives.forEach((alternative) => generateMap(alternative))

