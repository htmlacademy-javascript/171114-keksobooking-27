import {updateSlider} from './slider.js';

const adFormElement = document.querySelector('.ad-form');
const fieldsetElements = adFormElement.querySelectorAll('fieldset');
const sliderElement = adFormElement.querySelector('.ad-form__slider');
const submitButtonElement = adFormElement.querySelector('.ad-form__submit');
const timeinElement = adFormElement.querySelector('#timein');
const timeoutElement = adFormElement.querySelector('#timeout');
const roomNumberElement = adFormElement.querySelector('#room_number');
const capacityElement = adFormElement.querySelector('#capacity');
const typeElement = adFormElement.querySelector('#type');
const priceElement = adFormElement.querySelector('#price');
const addressElement = adFormElement.querySelector('#address');
const resetButtonElement = adFormElement.querySelector('.ad-form__reset');
const bodyElement = document.querySelector('body');
const successMessageTemplateElement = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplateElement = document.querySelector('#error').content.querySelector('.error');
const fileChooserAvatarElement = adFormElement.querySelector('#avatar');
const previewAvatarElement = adFormElement.querySelector('.ad-form-header__preview');
const fileChooserImagesElement = adFormElement.querySelector('#images');
const previewImageElement = adFormElement.querySelector('.ad-form__photo');

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const DEFAULT_AVATAR = 'img/muffin-grey.svg';

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

const guestsUnitByRule = {
  one: 'гостя',
  few: 'гостей',
  many: 'гостей',
  other: 'гостей'
};

const formatRooms = (roomsCount) => {
  const rule = pluralRuleSelector.select(roomsCount);

  return `${roomsUnitByRule[rule]}`;
};

const formatGuests = (guestsCount) => {
  const rule = pluralRuleSelector.select(guestsCount);

  return `${guestsUnitByRule[rule]}`;
};

const onAvatarChange = () => {
  const file = fileChooserAvatarElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    previewAvatarElement.innerHTML = '';
    previewAvatarElement.style.padding = '0';
    previewAvatarElement.style.width = '180px';
    const imageElement = document.createElement('img');
    imageElement.src = URL.createObjectURL(file);
    imageElement.style.maxWidth = '100%';
    imageElement.style.width = '100%';
    imageElement.style.height = 'auto';
    imageElement.style.padding = '0';
    imageElement.style.borderRadius = '5px';
    previewAvatarElement.append(imageElement);
  }
};

const onImageChange = () => {
  const file = fileChooserImagesElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    previewImageElement.innerHTML = '';
    const imageElement = document.createElement('img');
    imageElement.src = URL.createObjectURL(file);
    imageElement.style.maxWidth = '100%';
    imageElement.style.width = '100%';
    imageElement.style.height = 'auto';
    imageElement.style.padding = '0';
    imageElement.style.borderRadius = '5px';
    previewImageElement.append(imageElement);
  }
};

const pristine = new Pristine(
  adFormElement,
  {
    classTo: 'ad-form__element',
    errorClass: 'ad-form__element--invalid',
    errorTextParent: 'ad-form__element',
  },
  true
);

const validateCapacity = () => roomsToGuests[roomNumberElement.value].includes(capacityElement.value);
const validateRoomNumber = () => guestsToRooms[capacityElement.value].includes(roomNumberElement.value);

const getCapacityErorMessage = () => `Указанное количество комнат вмещает
  ${roomsToGuests[roomNumberElement.value].join(' или ')}
  ${formatGuests(roomNumberElement.value)}`;

const getRoomNumberErorMessage = () => `Для указанного количества гостей требуется
  ${guestsToRooms[capacityElement.value].join(' или ')}
  ${formatRooms(capacityElement.value)}`;

const validatePrice = () => priceOfTypes[typeElement.value] <= priceElement.value;

pristine.addValidator(
  capacityElement,
  validateCapacity,
  getCapacityErorMessage
);

pristine.addValidator(
  roomNumberElement,
  validateRoomNumber,
  getRoomNumberErorMessage
);

pristine.addValidator(
  priceElement,
  validatePrice,
  'Цена меньше минимальной'
);

timeinElement.addEventListener('change', (evt) => {
  evt.preventDefault();
  timeoutElement.value = timeinElement.value;
});

timeoutElement.addEventListener('change', (evt) => {
  evt.preventDefault();
  timeinElement.value = timeoutElement.value;
});

typeElement.addEventListener('change', (evt) => {
  evt.preventDefault();
  priceElement.min = `${priceOfTypes[typeElement.value]}`;
  priceElement.placeholder = `${priceOfTypes[typeElement.value]}`;
  updateSlider(priceElement);
});

priceElement.addEventListener('change', (evt) => {
  evt.preventDefault();
  priceElement.min = `${priceOfTypes[typeElement.value]}`;
  priceElement.placeholder = `${priceOfTypes[typeElement.value]}`;
});

fileChooserAvatarElement.addEventListener('change', onAvatarChange);

fileChooserImagesElement.addEventListener('change', onImageChange);

const setAddress = ({lat, lng}) => {
  lat = lat.toFixed(5);
  lng = lng.toFixed(5);
  addressElement.value = `${lat}, ${lng}`;
  addressElement.placeholder = `${lat}, ${lng}`;
};

const getAdFormDisabled = () => {
  adFormElement.classList.add('ad-form--disabled');
  sliderElement.classList.add('ad-form__slider--disabled');
  fieldsetElements.forEach((fieldset) => {
    fieldset.disabled = true;
  });
};

const getAdFormActive = () => {
  adFormElement.classList.remove('ad-form--disabled');
  sliderElement.classList.remove('ad-form__slider--disabled');
  fieldsetElements.forEach((fieldset) => {
    fieldset.disabled = false;
  });
};

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = 'Сохраняю...';
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = 'Сохранить';
};

const resetForm = () => {
  adFormElement.reset();
  pristine.reset();
  sliderElement.noUiSlider.set(priceElement.value);
  previewImageElement.innerHTML = '';
  previewAvatarElement.innerHTML = '';
  previewAvatarElement.style.padding = '0 15px';
  previewAvatarElement.style.width = '70px';
  const imageElement = document.createElement('img');
  imageElement.src = DEFAULT_AVATAR;
  imageElement.style.width = '40px';
  previewAvatarElement.append(imageElement);
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
  bodyElement.style.overflow = 'auto';
}

const showSuccessMessage = () => {
  const successElement = successMessageTemplateElement.cloneNode(true);
  document.addEventListener('keydown', onMessageEscKeydown);
  document.addEventListener('click', onOverlayClick);
  bodyElement.append(successElement);
  bodyElement.style.overflow = 'hidden';
};

const showErrorMessage = () => {
  const errorElement = errorMessageTemplateElement.cloneNode(true);
  document.addEventListener('keydown', onMessageEscKeydown);
  document.addEventListener('click', onOverlayClick);
  errorElement.querySelector('.error__button').addEventListener('click', onErrorButtonClick);
  bodyElement.append(errorElement);
  bodyElement.style.overflow = 'hidden';
};

const setOnFormSubmit = (cb) => {
  adFormElement.addEventListener('submit', async (evt) => {
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
  resetButtonElement.addEventListener('click', (evt) => {
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
