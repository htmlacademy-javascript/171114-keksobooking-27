const adForm = document.querySelector('.ad-form');
const timein = adForm.querySelector('#timein');
const timeout = adForm.querySelector('#timeout');

const MAX_ROOM_NUMBER = '100';
const NOT_FOR_GUEST = '0';

const priceOfTypes = {
  flat: 1000,
  bungalow: 0,
  house: 5000,
  palace: 10000,
  hotel: 3000,
};

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'has-danger',
  successClass: 'has-success',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'div',
  errorTextClass: 'ad-form__error'
});

const roomNumber = adForm.querySelector('#room_number');
const type = adForm.querySelector('#type');
const price = adForm.querySelector('#price');

const validateCapacity = (value) => {
  if (roomNumber.value === MAX_ROOM_NUMBER) {
    return value === NOT_FOR_GUEST;
  }
  if (value === NOT_FOR_GUEST) {
    return roomNumber.value === MAX_ROOM_NUMBER;
  }
  return value <= roomNumber.value;
};

const validatePrice = () => {
  price.min = `${priceOfTypes[type.value]}`;
  if (priceOfTypes[type.value] <= price.value)
    return true;
  return false;
};

pristine.addValidator(
  adForm.querySelector('#capacity'),
  validateCapacity,
  'Количество мест меньше или равно количеству комнат. 100 комнат — не для гостей (0 гостей)'
);

pristine.addValidator(
  price,
  validatePrice,
  `Минимальная цена - ${priceOfTypes[type.value]}`
);

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

timein.addEventListener('change', (evt) => {
  evt.preventDefault();
  timeout.value = timein.value;
});

timeout.addEventListener('change', (evt) => {
  evt.preventDefault();
  timein.value = timeout.value;
});