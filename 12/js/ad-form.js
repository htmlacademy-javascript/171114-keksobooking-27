import {updateSlider} from './slider.js';

const adForm = document.querySelector('.ad-form');
const fieldsets = adForm.querySelectorAll('fieldset');
const slider = adForm.querySelector('.ad-form__slider');
const submitButton = adForm.querySelector('.ad-form__submit');
const timein = adForm.querySelector('#timein');
const timeout = adForm.querySelector('#timeout');
const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const type = adForm.querySelector('#type');
const price = adForm.querySelector('#price');
const address = adForm.querySelector('#address');
const resetButton = document.querySelector('.ad-form__reset');
const body = document.querySelector('body');
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

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

const getAdFormDisabled = () => {
  adForm.classList.add('ad-form--disabled');
  slider.classList.add('ad-form__slider--disabled');
  fieldsets.forEach((fieldset) => {
    fieldset.disabled = true;
  });
};

const getAdFormActive = () => {
  adForm.classList.remove('ad-form--disabled');
  slider.classList.remove('ad-form__slider--disabled');
  fieldsets.forEach((fieldset) => {
    fieldset.disabled = false;
  });
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Сохраняю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Сохранить';
};

const resetForm = () => {
  adForm.reset();
  slider.noUiSlider.set(price.value);
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const onMessageEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideMessage();
  }
};

const onOverlayClick = () => {
  hideMessage();
};

const onErrorButtonClick = () => {
  hideMessage();
};

function hideMessage() {
  const messageElement =
    document.querySelector('.success') || document.querySelector('.error');
  messageElement.remove();
  document.removeEventListener('keydown', onMessageEscKeydown);
  document.removeEventListener('click', onOverlayClick);
  body.style.overflow = 'auto';
}

const showSuccessMessage = () => {
  const successElement = successMessageTemplate.cloneNode(true);
  document.addEventListener('keydown', onMessageEscKeydown);
  document.addEventListener('click', onOverlayClick);
  body.append(successElement);
  body.style.overflow = 'hidden';
};

const showErrorMessage = () => {
  const errorElement = errorMessageTemplate.cloneNode(true);
  document.addEventListener('keydown', onMessageEscKeydown);
  errorElement.querySelector('.error__button').addEventListener('click', onErrorButtonClick);
  body.append(errorElement);
  body.style.overflow = 'hidden';
};

const setOnFormSubmit = (cb) => {
  adForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      await cb (new FormData(evt.target));
      unblockSubmitButton();
    }
  });
};

const onResetAdForm = (reset) => {
  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetForm();
    reset();
  });
};

export {
  setAddress,
  formatRooms,
  formatGuests,
  getAdFormDisabled,
  getAdFormActive,
  setOnFormSubmit,
  onResetAdForm,
  resetForm,
  showSuccessMessage,
  showErrorMessage
};
