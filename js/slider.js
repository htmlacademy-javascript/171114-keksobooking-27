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
    start: MAX * 0.4,
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
  if(element.min === undefined) {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: MIN,
      }
    });
  } else {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: parseInt(element.min, 10),
      }
    });
  }
};

export {createSlider, setOnSliderUpdate, updateSlider};
