import {updateSlider} from './slider.js';

const adForm = document.querySelector('.ad-form');
const timein = adForm.querySelector('#timein');
const timeout = adForm.querySelector('#timeout');
const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const type = adForm.querySelector('#type');
const price = adForm.querySelector('#price');
const address = document.querySelector('#address');

const priceOfTypes = {
  flat: 1000,
  bungalow: 0,
  house: 5000,
  palace: 10000,
  hotel: 3000,
};

const roomsToGuests = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};

const guestsToRooms = {
  0: ['100'],
  1: ['1', '2', '3'],
  2: ['2', '3'],
  3: ['3'],
};

const pluralRuleSelector = new Intl.PluralRules('ru');

const roomsUnitByRule = {
  one: 'комната',
  few: 'комнаты',
  many: 'комнат',
  other: 'комнат'
};

const formatRooms = (roomsCount) => {
  const rule = pluralRuleSelector.select(roomsCount);

  return `${roomsUnitByRule[rule]}`;
};

const guestsUnitByRule = {
  one: 'гостя',
  few: 'гостей',
  many: 'гостей',
  other: 'гостей'
};

const formatGuests = (guestsCount) => {
  const rule = pluralRuleSelector.select(guestsCount);

  return `${guestsUnitByRule[rule]}`;
};

const pristine = new Pristine(
  adForm,
  {
    classTo: 'ad-form__element',
    errorClass: 'ad-form__element--invalid',
    errorTextParent: 'ad-form__element',
  },
  true
);


const validateCapacity = () => roomsToGuests[roomNumber.value].includes(capacity.value);
const validateRoomNumber = () => guestsToRooms[capacity.value].includes(roomNumber.value);

const getCapacityErorMessage = () => `Указанное количество комнат вмещает
  ${roomsToGuests[roomNumber.value].join(' или ')}
  ${formatGuests(roomNumber.value)}`;

const getRoomNumberErorMessage = () => `Для указанного количества гостей требуется
  ${guestsToRooms[capacity.value].join(' или ')}
  ${formatRooms(capacity.value)}`;

const validatePrice = () => priceOfTypes[type.value] <= price.value;

pristine.addValidator(
  capacity,
  validateCapacity,
  getCapacityErorMessage
);

pristine.addValidator(
  roomNumber,
  validateRoomNumber,
  getRoomNumberErorMessage
);

pristine.addValidator(
  price,
  validatePrice,
  'Цена меньше минимальной'
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

type.addEventListener('change', (evt) => {
  evt.preventDefault();
  price.min = `${priceOfTypes[type.value]}`;
  price.placeholder = `${priceOfTypes[type.value]}`;
  updateSlider(price);
});

price.addEventListener('change', (evt) => {
  evt.preventDefault();
  price.min = `${priceOfTypes[type.value]}`;
  price.placeholder = `${priceOfTypes[type.value]}`;
});

const setAddress = ({lat, lng}) => {
  lat = lat.toFixed(5);
  lng = lng.toFixed(5);
  address.value = `${lat}, ${lng}`;
  address.placeholder = `${lat}, ${lng}`;
};

export {setAddress};
