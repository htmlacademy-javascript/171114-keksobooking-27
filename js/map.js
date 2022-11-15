import {createCardElement} from './card.js';
import {setAddress} from './ad-form.js';

const START_COORDINATE = {
  lat: 35.66023,
  lng: 139.73007,
};

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
    START_COORDINATE,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const initMap = () => {
  map.setView(START_COORDINATE, 10);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  mainMarker.setLatLng(START_COORDINATE);
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
  creataAdPinMarkers(advertisements);
};

const setOnMapLoad = (cb) => {
  map.on('load', cb);
};

const setOnMainPinMove = (cb) => {
  mainMarker.on('move', (evt) => cb(evt.target.getLatLng()));
};

const resetMap = () => {
  mainMarker.setLatLng(START_COORDINATE);
  map.setView(START_COORDINATE, 10);
  setAddress(START_COORDINATE);
};


export {initMap, setAdPins, setOnMapLoad, setOnMainPinMove, resetMap};
