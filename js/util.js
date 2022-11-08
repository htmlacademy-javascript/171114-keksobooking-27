const getRandomNumber = (min, max) => {
  if (min < 0 || max < 0) {
    return NaN;
  }
  if ((max - min) === 0) {
    return NaN;
  }
  const result = Math.random() * (max - min);
  if ((max - min) > 0) {
    return Math.round(result + min);
  }
  return Math.round(max - result);
};

const getRandomFloat = (min, max, numberOfDecimalPlases) => {
  if (min < 0 || max < 0 || numberOfDecimalPlases < 0) {
    return NaN;
  }

  if ((max - min) === 0) {
    return NaN;
  }
  let count = 1;
  for (let i = 0; i < numberOfDecimalPlases; i++) {
    count = count * 10;
  }
  const result = Math.random() * (max - min);

  if ((max - min) > 0) {

    return Math.round((result + min) * count) / count;
  }
  return Math.round((max - result) * count) / count;
};

const getRandomPositiveInteger = (a, b) => {
  if (a < 0 || b < 0) {
    return NaN;
  }
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const getRandomArray = (array) => {
  const number = getRandomNumber(0, (array.length - 1));
  const randomArray = [0];
  let element = getRandomArrayElement(array);
  for (let i = 0; i < number; i++) {
    while (randomArray.includes(element)) {
      element = getRandomArrayElement(array);
    }
    randomArray[i] = element;
  }
  return randomArray;
};

const body = document.querySelector('body');

const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlert = () => {
  const templateFragment = document.querySelector('#error').content.querySelector('.error');
  const alertElement = templateFragment.cloneNode(true);
  const errorButton = alertElement.querySelector('.error__button');

  body.appendChild(alertElement);

  errorButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    body.removeChild(alertElement);
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      body.removeChild(alertElement);
      document.removeEventListener('keydown');
    }
  });
};

const showSuccess = () => {
  const templateFragment = document.querySelector('#success').content.querySelector('.success');
  const successElement = templateFragment.cloneNode(true);

  body.appendChild(successElement);

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      body.removeChild(successElement);
      document.removeEventListener('keydown');
    }
  });
};

export {getRandomNumber, getRandomFloat, getRandomArray, getRandomArrayElement, showAlert, showSuccess};
