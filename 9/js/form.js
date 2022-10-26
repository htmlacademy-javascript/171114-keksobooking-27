const adForm = document.querySelector('.ad-form');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'has-danger',
  successClass: 'has-success',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'div',
  errorTextClass: 'ad-form__error'
});

const roomNumber = adForm.querySelector('#room_number');

const validateCapacity = (value) => {
  if (roomNumber.value === '100') {
    return value === '0';
  }
  if (value === '0') {
    return roomNumber.value === '100';
  }
  return value <= roomNumber.value;
};

pristine.addValidator(
  adForm.querySelector('#capacity'),
  validateCapacity,
  'Количество мест меньше или равно количеству комнат. 100 комнат — не для гостей (0 гостей)'
);

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
