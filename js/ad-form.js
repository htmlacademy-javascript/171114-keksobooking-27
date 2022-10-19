const adForm = document.querySelector('.ad-form');
const fieldsets = adForm.querySelectorAll('fieldset');
const slider = adForm.querySelector('.ad-form__slider');
const mapFilter = document.querySelector('.map__filters');
const mapSelects = mapFilter.querySelectorAll('select');
const mapInputs = mapFilter.querySelectorAll('input');

const getAdFormDisabled = () => {
  adForm.classList.add('ad-form--disabled');
  mapFilter.classList.add('map__filters--disabled');
  slider.classList.add('ad-form__slider--disabled');
  fieldsets.forEach((fieldset) => {
    fieldset.disabled = true;
  });
  mapSelects.forEach((select) => {
    select.disabled = true;
  });
  mapInputs.forEach((input) => {
    input.disabled = true;
  });
};

const getAdFormActive = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFilter.classList.remove('map__filters--disabled');
  slider.classList.remove('ad-form__slider--disabled');
  fieldsets.forEach((fieldset) => {
    fieldset.disabled = false;
  });
  mapSelects.forEach((select) => {
    select.disabled = false;
  });
  mapInputs.forEach((input) => {
    input.disabled = false;
  });
};

export {getAdFormDisabled};
export {getAdFormActive};
