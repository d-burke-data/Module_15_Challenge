# Module_15_Challenge : *Leaflet Challenge*

In this repository is a simple web site demonstrating data visualization utilizing Leaflet and JavaScript. The home page provides links for parts 1 and 2 of the challenge. Both pages display a Leaflet map with markers showing all earthquakes recorded within the past 7 days. Marker size is scaled by magnitude of the earthquake and color is scaled by its depth (in meters). The page for part 2 also contains a layer displaying fault lines, as well as more base map options retrieved from Google Maps.

## URL
The web page can be accessed with this URL:  
https://d-burke-data.github.io/Module_15_Challenge/

## Relevant Files
+ index.html *(HTML file for the home page)*
+ static/css/style.css *(CSS style sheet)*

Part 1
+ earthquakes-1.html *(HTML file for displaying the Leaflet map)*
+ static/js/earthquakes-1.js *(JavaScript file for handling data and Leaflet map display)*

Part 2
+ earthquakes-2.html *(HTML file for displaying the Leaflet map, with fault lines and additional base map options)*
+ static/js/earthquakes-2.js *(JavaScript file for handling data and Leaflet map display)*
+ static/data/GeoJSON/PB2002_boundaries.json *(JSON file containing fault line shape data)*

## Data Source
+ Earthquakes from US Geological Survey (USGS): https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php
+ Tectonic Plates from fraxen (Hugo Ahlenius): https://github.com/fraxen/tectonicplates

## Plugins
+ Leaflet https://leafletjs.com/
+ Chroma.js https://gka.github.io/chroma.js/
+ L.GridLayer.GoogleMutant https://gitlab.com/IvanSanchez/Leaflet.GridLayer.GoogleMutant

## Google API Note
Part 2 of the challenge utilizes the GoogleMutant plugin to incorporate additional maps from Google into Leaflet. No API key is provided to access these maps. They will load with a "For development purposes only" watermark, and the console will reflect warnings and errors regarding the missing API key. Since this page is simply for demonstration purposes, the lack of API key is of no other consequence. In a commercial product, the API key issues would be resolved before publication.
