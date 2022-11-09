import {setAddress, setAdFormSubmit, getAdFormDisabled, getAdFormActive, resetAdForm, reset} from './ad-form.js';
import {initMap, setAdPins, setOnMapLoad, setOnMainPinMove} from './map.js';
import {createSlider, setOnSliderUpdate} from './slider.js';
import {getData} from './api.js';

const START_COORDINATE = {
  lat: 35.66023,
  lng: 139.73007,
};

const SIMILAR_ADVERTISEMENT_COUNT = 10;

setOnMapLoad(() => {
  setOnMainPinMove(setAddress);
  setAddress(START_COORDINATE);
  getAdFormActive();
  getData((advertisements) => {
    setAdPins(advertisements.slice(0, SIMILAR_ADVERTISEMENT_COUNT));
  });
});

getAdFormDisabled();
initMap(START_COORDINATE);
createSlider();
setOnSliderUpdate();
setAdFormSubmit(reset);
resetAdForm();
