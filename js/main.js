import {setAddress} from './form.js';
import {getAdFormDisabled, getAdFormActive} from './ad-form.js';
import {createAdvertisements} from './data.js';
import {initMap, setAdPins, setOnMapLoad, setOnMainPinMove} from './map.js';
import {createSlider, setOnSliderUpdate} from './slider.js';

const START_COORDINATE = {
  lat: 35.66023,
  lng: 139.73007,
};

const similarAdv = createAdvertisements();

setOnMapLoad(() => {
  setOnMainPinMove(setAddress);
  setAddress(START_COORDINATE);
  getAdFormActive();
  setAdPins(similarAdv);
});

getAdFormDisabled();
initMap(START_COORDINATE);
createSlider();
setOnSliderUpdate();
