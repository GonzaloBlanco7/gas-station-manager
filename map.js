const OSM_layer = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

var map = L.map('map').setView([40.416775,-3.703790], 6);

L.tileLayer(OSM_layer, {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([40.416775,-3.703790]).addTo(map)
    .bindPopup('Madrid');