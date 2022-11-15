const ALERT_SHOW_TIME = 700;
const TIMEOUT_DELAY = 500;

const mapFilterElement = document.querySelector('.map__filters');
const mapSelectElements = mapFilterElement.querySelectorAll('select');
const mapInputElements = mapFilterElement.querySelectorAll('input');

const turnFilterOff = () => {
  mapFilterElement.classList.add('map__filters--disabled');
  mapSelectElements.forEach((select) => {
    select.disabled = true;
  });
  mapInputElements.forEach((input) => {
    input.disabled = true;
  });
};

const turnFilterOn = () => {
  mapFilterElement.classList.remove('map__filters--disabled');
  mapSelectElements.forEach((select) => {
    select.disabled = false;
  });
  mapInputElements.forEach((input) => {
    input.disabled = false;
  });
};

const showAlert = (message) => {
  const alertElement = document.createElement('div');
  alertElement.style.position = 'absolute';
  alertElement.style.zIndex = '100';
  alertElement.style.left = '0';
  alertElement.style.top = '0';
  alertElement.style.right = '0';
  alertElement.style.padding = '10px 3px';
  alertElement.style.fontSize = '30px';
  alertElement.style.textAlign = 'center';
  alertElement.style.backgroundColor = 'red';
  alertElement.textContent = message;
  document.body.append(alertElement);

  setTimeout(() => {
    alertElement.remove();
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
