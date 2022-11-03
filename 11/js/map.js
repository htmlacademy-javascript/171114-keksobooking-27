import {createCardElement} from './card.js';

const ADVERTISEMENTS_COUNT = 10;
const map = L.map('map-canvas');
const markerGroup = L.layerGroup().addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const adPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainMarker = L.marker(
  {
    lat: 35.6895,
    lng: 139.692,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const initMap = (coordinate) => {
  map.setView(coordinate, 10);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  mainMarker.setLatLng(coordinate);
  mainMarker.addTo(map);
};

const creataAdPinMarkers = (advertisements) => {
  advertisements.forEach((advertisement) => {
    const marker = L.marker(
      {
        lat: advertisement.location.lat,
        lng: advertisement.location.lng,
      },
      {
        icon: adPinIcon,
      },
    );

    marker.addTo(markerGroup).bindPopup(createCardElement(advertisement));
  });
};

const setAdPins = (advertisements) => {
  markerGroup.clearLayers();
  creataAdPinMarkers(advertisements.slice(0, ADVERTISEMENTS_COUNT));
};

const setOnMapLoad = (cb) => {
  map.on('load', cb);
};

const setOnMainPinMove = (cb) => {
  mainMarker.on('move', (evt) => cb(evt.target.getLatLng()));
};

export {initMap, setAdPins, setOnMapLoad, setOnMainPinMove};