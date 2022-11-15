import {ALERT_SHOW_TIME, TIMEOUT_DELAY} from './constants.js';

const mapFilter = document.querySelector('.map__filters');
const mapSelects = mapFilter.querySelectorAll('select');
const mapInputs = mapFilter.querySelectorAll('input');

const turnFilterOff = () => {
  mapFilter.classList.add('map__filters--disabled');
  mapSelects.forEach((select) => {
    select.disabled = true;
  });
  mapInputs.forEach((input) => {
    input.disabled = true;
  });
};

const turnFilterOn = () => {
  mapFilter.classList.remove('map__filters--disabled');
  mapSelects.forEach((select) => {
    select.disabled = false;
  });
  mapInputs.forEach((input) => {
    input.disabled = false;
  });
};

const showAlert = (message) => {
  const alert = document.createElement('div');
  alert.style.position = 'absolute';
  alert.style.zIndex = '100';
  alert.style.left = '0';
  alert.style.top = '0';
  alert.style.right = '0';
  alert.style.padding = '10px 3px';
  alert.style.fontSize = '30px';
  alert.style.textAlign = 'center';
  alert.style.backgroundColor = 'red';
  alert.textContent = message;
  document.body.append(alert);

  setTimeout(() => {
    alert.remove();
  }, ALERT_SHOW_TIME);
};

const debounce = (callback, timeoutDelay = TIMEOUT_DELAY) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {showAlert, turnFilterOff, turnFilterOn, debounce};
