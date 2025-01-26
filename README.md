# Module_15_Challenge : *Leaflet Challenge*

In this repository is a simple web site demonstrating data visualization utilizing Leaflet and JavaScript. The home page provides links for parts 1 and 2 of the challenge. Both pages display a Leaflet map with markers showing all earthquakes recorded within the past 7 days. Marker size is scaled by magnitude of the earthquake and color is scaled by its depth (in meters). The page for part 2 also contains a layer displaying fault lines, as well as more base map options retrieved from Google Maps.

## URL
The web page can be accessed with this URL:  
https://d-burke-data.github.io/Module_15_Challenge/

## Relevant Files
+ index.html *(HTML file for the home page)*

Part 1
+ Leaflet-Part-1/earthquakes.html *(HTML file for displaying the Leaflet map)*
+ Leaflet-Part-1/static/css/style.css *(CSS style sheet)*
+ Leaflet-Part-1/static/js/leaflet.js *(JavaScript file for handling data and Leaflet map display)*

Part 2
+ Leaflet-Part-2/earthquakes.html *(HTML file for displaying the Leaflet map, with fault lines and additional base map options)*
+ Leaflet-Part-2/static/css/style.css *(CSS style sheet)*
+ Leaflet-Part-2/static/js/leaflet.js *(JavaScript file for handling data and Leaflet map display)*

## Data Source
US Geological Survey (USGS): https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php

## Google API Note
Part 2 of the challenge utilizes the GoogleMutant plugin (https://gitlab.com/IvanSanchez/Leaflet.GridLayer.GoogleMutant) to incorporate additional maps from Google into Leaflet. No API key is provided to access these maps. They will load with a "For development purposes only" watermark, and the console will reflect warnings and errors regarding the missing API key. Since this page is simply for demonstration purposes, the lack of API key is of no other consequence. In a commercial product, the API key issues would be resolved before publication.
