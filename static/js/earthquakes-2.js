import chroma from 'https://unpkg.com/chroma-js@3.0.0/index.js';

let minDepth = 0;
let maxDepth = 300;
let legendDepthIncrement = 3;
let colorGradients = ["#c0ff3e", "#ffff14", "#c04e01", "#840000"];
let circleScale = 10000;

function createMap(earthquakes, tectonics) {
  // Add a tile layer.
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  // Additional Google maps
  // valid values are 'roadmap', 'satellite', 'terrain' and 'hybrid'
  let roadmap = L.gridLayer.googleMutant({ type: "roadmap" });
  let satellite = L.gridLayer.googleMutant({ type: "satellite" });
  let terrain = L.gridLayer.googleMutant({ type: "terrain" });
  let hybrid = L.gridLayer.googleMutant({ type: "hybrid" });

  let baseMaps = {
    "Street": street,
    "Topographic": topo,
    "Google Roadmap": roadmap,
    "Google Satellite": satellite,
    "Google Terrain": terrain,
    "Google Hybrid": hybrid
  };

  let overlays = {
    "Earthquakes": earthquakes,
    "Tectonic Plates": tectonics
  }

  // Create a map object.
  let myMap = L.map("map", {
    center: [0,0],
    zoom: 3,
    layers: [street, tectonics, earthquakes]
  });

  L.control.layers(baseMaps, overlays, {
    collapsed: false,
    autoZIndex: false
  }).addTo(myMap);

  tectonics.addTo(myMap);
  createLegend(myMap);
}

function createMarkers(response) {
    let features = response.features;
    let earthquakes = [];

    for (let i = 0; i < features.length; i++) {
      let location = features[i].geometry;      
      
      if (location) {
        let magnitude = features[i].properties.mag;
        let coordinates = [location.coordinates[1], location.coordinates[0]];
        let depth = location.coordinates[2];
        
        let earthquake = L.circle(coordinates, {
          radius: getRadius(magnitude),
          color: "black",
          weight: 1,
          fillColor: getColor(depth),
          fillOpacity: 0.9
        }).bindPopup(getPopupData(features[i].properties, depth));
        earthquakes.push(earthquake);
      }
    }
    return L.layerGroup(earthquakes);
}

function createLegend(map) {
  let legend = L.control({ position: 'bottomright' })
  legend.onAdd = () => {
    let div = L.DomUtil.create('div', 'gradient');
    div.innerHTML = "Earthquake Depth<br>";

    for (let i = minDepth; i <= maxDepth; i += legendDepthIncrement) {
      div.innerHTML += `<span class="grad-step" style="background-color:${getColor(i)}"></span>`;
    }
    
    div.innerHTML += "<br><div>";
    div.innerHTML += `<span class="grad-min">${minDepth}m</span>`;
    div.innerHTML += `<span class="grad-max">${maxDepth}m</span></div>`;

    return div
  }
  legend.addTo(map);
}

function getColor(value) {
  value = Math.min(maxDepth, value);
  value = Math.max(value, minDepth);

  let colorScale = chroma.scale(colorGradients).domain([minDepth, maxDepth]);
  return colorScale(value).hex();
}

function getRadius(value) {
  return Math.max(value, 0.01) * circleScale;
}

function getPopupData(properties, depth) {
  return `<h3>${properties.place}</h3>
          <hr/><strong>Magnitude:</strong> ${properties.mag}
          <br/><strong>Depth:</strong> ${depth}m
          <br/><strong>Time:</strong> ${new Date(properties.time)}`;
}

function createTectonicPlates(response) {
  let style = {
    color: "orange",
    opacity: 0.5,
    fillOpacity: 0
  }
  return L.geoJson(response, { style: style });
}

function getData() {
  let tectonicsURL = "static/data/GeoJSON/PB2002_boundaries.json";
  let earthquakeURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
  d3.json(tectonicsURL).then(tectonicsResponse => {    
    d3.json(earthquakeURL).then(earthquakesResponse => {
      buildMap(earthquakesResponse, tectonicsResponse);
    });
  });
}

function buildMap(earthquakesResponse, tectonicsResponse) {
  let earthquakes = createMarkers(earthquakesResponse);
  let plates = createTectonicPlates(tectonicsResponse);
  createMap(earthquakes, plates);
}

getData();