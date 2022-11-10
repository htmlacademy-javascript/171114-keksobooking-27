import {setAddress, getAdFormDisabled, getAdFormActive, onResetAdForm, resetForm, showSuccessMessage, showErrorMessage, setOnFormSubmit} from './ad-form.js';
import {initMap, setAdPins, setOnMapLoad, setOnMainPinMove, resetMap} from './map.js';
import {createSlider, setOnSliderUpdate} from './slider.js';
import {getData, sendData} from './api.js';
import {showAlert, turnFilterOff, turnFilterOn} from './util.js';
import {START_COORDINATE, SIMILAR_ADVERTISEMENT_COUNT} from './constants.js';

const onSendDataSuccess = () => {
  resetForm();
  resetMap();
  showSuccessMessage();
};

const onGetDataSuccess = (advertisements) => {
  setAdPins(advertisements.slice(0, SIMILAR_ADVERTISEMENT_COUNT));
  turnFilterOn();
};

setOnMapLoad(() => {
  setOnMainPinMove(setAddress);
  resetMap();
  getAdFormActive();
  turnFilterOn();
});

onResetAdForm(resetMap);

setOnFormSubmit(async (data) => {
  await sendData(onSendDataSuccess, showErrorMessage, data);
});

getAdFormDisabled();
turnFilterOff();
initMap(START_COORDINATE);
createSlider();
setOnSliderUpdate();
getData(onGetDataSuccess, showAlert);
