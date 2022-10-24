const adForm = document.querySelector('.ad-form');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form',
  errorClass: 'error',
  successClass: 'success',
  errorTextParent: 'error',
  errorTextClass: 'error__message',
});

const validateTitle = (value) => value.length >= 30 && value.length <= 100;
pristine.addValidator(
  adForm.querySelector('#title'),
  validateTitle,
  'От 30 до 100 символов'
);

const validatePrice = (value) => value <= 100000;
pristine.addValidator(
  adForm.querySelector('#price'),
  validatePrice ,
  'Максимальная цена 100 000'
);

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
