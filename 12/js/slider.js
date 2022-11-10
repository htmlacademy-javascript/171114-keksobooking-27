const sliderElement = document.querySelector('.ad-form__slider');
const valueElement = document.querySelector('#price');

const MIN = 1000;
const MAX = 100000;

const createSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: MIN,
      max: MAX,
    },
    start: MIN,
    step: 0.01,
    connect: 'lower',
  });
};

const setOnSliderUpdate = () => {
  sliderElement.noUiSlider.on('update', () => {
    valueElement.value = sliderElement.noUiSlider.get();
  });
};

const updateSlider = (element) => {
  sliderElement.noUiSlider.set(element.value);
  if(!element.min) {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: MIN,
        max: MAX
      }
    });
  } else {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: parseInt(element.min, 10),
        max: MAX
      },
      start: parseInt(element.min, 10),
    });
  }
};

export {createSlider, setOnSliderUpdate, updateSlider};
