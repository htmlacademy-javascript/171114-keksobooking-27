import {turnFilterOff} from './util.js';

const HOUSING_PRICE = {
  any: 0,
  low: 10000,
  middle: 50000,
  high: 50000,
};

const typeFilter = document.querySelector('#housing-type');
const priceFilter = document.querySelector('#housing-price');
const roomsFilter = document.querySelector('#housing-rooms');
const guestsFilter = document.querySelector('#housing-guests');
const featuresFilter = document.querySelector('#housing-features');
const featuresListFilter = featuresFilter.querySelectorAll('.map__checkbox');

const filterTypes = (advertisements) => {
  let filtered = advertisements;
  if(typeFilter.value !== 'any') {
    filtered = advertisements.filter((advertisement) => advertisement.offer.type === typeFilter.value);
  }
  return filtered;
};

const filterPrice = (advertisements) => {
  let filtered = advertisements;
  switch (priceFilter.value) {
    case 'low':
      filtered = advertisements.filter((advertisement) => parseInt(advertisement.offer.price, 10) < HOUSING_PRICE['low']);
      return filtered;
    case 'middle':
      filtered = advertisements.filter((advertisement) => parseInt(advertisement.offer.price, 10) > HOUSING_PRICE['low'] && parseInt(advertisement.offer.price, 10) < HOUSING_PRICE['high']);
      return filtered;
    case 'high':
      filtered = advertisements.filter((advertisement) => parseInt(advertisement.offer.price, 10) > HOUSING_PRICE['high']);
      return filtered;
    case 'any':
    default:
      return filtered;
  }
};

const filterRooms = (advertisements) => {
  let filtered = advertisements;
  if(roomsFilter.value !== 'any') {
    filtered = advertisements.filter((advertisement) => advertisement.offer.rooms === parseInt(roomsFilter.value, 10));
  }
  return filtered;
};

const filterGuests = (advertisements) => {
  let filtered = advertisements;
  if(guestsFilter.value !== 'any') {
    filtered = advertisements.filter((advertisement) => advertisement.offer.guests === parseInt(guestsFilter.value, 10));
  }
  return filtered;
};

const filterFeatures = (advertisements) => {
  const filtered = [];

  advertisements.forEach((advertisement) => {
    const features = advertisement.offer.features;
    if(features) {
      featuresListFilter.forEach((featureListItem) => {
        if(featureListItem.checked === true) {
          console.log(featureListItem.value);
          const isNecessary = features.some(
            (feature) => featureListItem.value === feature,
          );
          if (isNecessary) {
            filtered.push(advertisement);
          }
        }
      });
    }
  });

  return filtered;
};

const onChangeFilter = (cb) => {
  typeFilter.addEventListener('change', (evt) => {
    evt.preventDefault();
    turnFilterOff();
    cb();
  });

  priceFilter.addEventListener('change', (evt) => {
    evt.preventDefault();
    turnFilterOff();
    cb();
  });

  roomsFilter.addEventListener('change', (evt) => {
    evt.preventDefault();
    turnFilterOff();
    cb();
  });

  guestsFilter.addEventListener('change', (evt) => {
    evt.preventDefault();
    turnFilterOff();
    cb();
  });

  featuresListFilter.forEach((featureListItem) => {
    featureListItem.addEventListener('change', (evt) => {
      evt.preventDefault();
      turnFilterOff();
      cb();
    });
  });
};

export {filterTypes, filterPrice, filterRooms, filterGuests, filterFeatures, onChangeFilter};
