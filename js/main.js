import {setAddress, setAdFormSubmit, getAdFormDisabled, getAdFormActive, resetAdForm, resetForm, showSuccessMessage, showErrorMessage} from './ad-form.js';
import {initMap, setAdPins, setOnMapLoad, setOnMainPinMove, resetMap} from './map.js';
import {createSlider, setOnSliderUpdate} from './slider.js';
import {getData} from './api.js';
import {START_COORDINATE, SIMILAR_ADVERTISEMENT_COUNT} from './constants.js';

const onSendDataSuccess = () => {
  resetForm();
  resetMap();
  showSuccessMessage();
};

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
setAdFormSubmit();
resetAdForm();
