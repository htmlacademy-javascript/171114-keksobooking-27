import {setAddress, getAdFormDisabled, getAdFormActive, onResetAdForm, resetForm, showSuccessMessage, showErrorMessage, setOnFormSubmit} from './ad-form.js';
import {initMap, setAdPins, setOnMapLoad, setOnMainPinMove, resetMap} from './map.js';
import {createSlider, setOnSliderUpdate} from './slider.js';
import {getData, sendData} from './api.js';
import {showAlert, turnFilterOff, turnFilterOn} from './util.js';
import {START_COORDINATE, SIMILAR_ADVERTISEMENT_COUNT} from './constants.js';
import {filterTypes, filterPrice, filterRooms, filterGuests, filterFeatures, onChangeFilter} from './filters.js';

const onSendDataSuccess = () => {
  resetForm();
  resetMap();
  showSuccessMessage();
};

const onGetDataSuccess = (advertisements) => {
  setAdPins(advertisements.slice(0, SIMILAR_ADVERTISEMENT_COUNT));
  turnFilterOn();
};

const onFilterAdv = (advertisements) => {
  let adv = advertisements.slice(0, SIMILAR_ADVERTISEMENT_COUNT);
  adv = filterTypes(adv);
  adv = filterPrice(adv);
  adv = filterRooms(adv);
  adv = filterGuests(adv);
  adv = filterFeatures(adv);
  setAdPins(adv);
  turnFilterOn();
};

setOnMapLoad(() => {
  setOnMainPinMove(setAddress);
  resetMap();
  getAdFormActive();
});

onResetAdForm(resetMap);

setOnFormSubmit(async (data) => {
  await sendData(onSendDataSuccess, showErrorMessage, data);
});

onChangeFilter(async () => {
  await getData(onFilterAdv, showAlert);
});

getAdFormDisabled();
turnFilterOff();
initMap(START_COORDINATE);
createSlider();
setOnSliderUpdate();
getData(onGetDataSuccess, showAlert);
