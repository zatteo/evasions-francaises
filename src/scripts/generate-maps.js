/* eslint-disable */
const fs = require('fs');
const osmsm = require('osm-static-maps');

const loadedAlternatives = require('../assets/alternatives.json');

const generateMap = (alternative) => {
  console.log(alternative)
  osmsm({
    geojson: {
      type: "Point",
      coordinates: [alternative.longitude, alternative.latitude]
    },
    center: '1.8752777777777778,46.6061111',
    zoom: 5,
    attribution: '© OpenStreetMap contributors'
  }).then(function (imageBinaryBuffer) {
    fs.writeFile(`./public/assets/maps/${alternative.label}.jpg`, imageBinaryBuffer, 'binary', function(err) {
      console.log(err);
    });
  }).catch(function (error) { console.log(err) })
}

generateMap(loadedAlternatives[0])
