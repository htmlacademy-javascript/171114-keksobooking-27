import {ADVERTISEMENT_COUNT} from './constants.js';

const Price = {
  MIDDLE: 10000,
  HIGH: 50000,
};

const filterElement = document.querySelector('.map__filters');
const typeFilter = filterElement.querySelector('#housing-type');
const priceFilter = filterElement.querySelector('#housing-price');
const roomsFilter = filterElement.querySelector('#housing-rooms');
const guestsFilter = filterElement.querySelector('#housing-guests');
const featuresCheckboxes = filterElement.querySelectorAll('.map__checkbox');

const filterByTypes = (offer, type) => type === 'any' || offer.offer.type === type;

const filterByPrice = (offer, price) => {
  switch (price) {
    case 'any':
      return true;
    case 'low':
      return offer.offer.price < Price.MIDDLE;
    case 'middle':
      return (offer.offer.price < Price.HIGH && offer.offer.price > Price.MIDDLE);
    case 'high':
      return offer.offer.price > Price.HIGH;
  }
};

const filterByRooms = (offer, rooms) => rooms === 'any' || offer.offer.rooms === parseInt(rooms, 10);

const filterByGuests = (offer, guests) => guests === 'any' || offer.offer.guests === parseInt(guests, 10);

const filterByFeatures = (offer, features) => {
  if(!features.length) {
    return true;
  }

  if(!offer.offer.features) {
    return false;
  }

  return features.every((feature) => offer.offer.features.includes(feature));
};

const getFilteredOffers = (offers) => {
  const selectedType = typeFilter.value;
  const selectedPrice = priceFilter.value;
  const selectedRooms = roomsFilter.value;
  const selectedGuests = guestsFilter.value;

  const selectedFeatures = [];
  featuresCheckboxes.forEach((checkbox) => {
    if(checkbox.checked) {
      selectedFeatures.push(checkbox.value);
    }
  });

  const filtetredOffers = [];
  for (const offer of offers) {
    if(filtetredOffers.length >= ADVERTISEMENT_COUNT) {
      break;
    }
    if(
      filterByTypes(offer, selectedType) &&
      filterByPrice(offer, selectedPrice) &&
      filterByRooms(offer, selectedRooms) &&
      filterByGuests(offer, selectedGuests) &&
      filterByFeatures(offer, selectedFeatures)
    ) {
      filtetredOffers.push(offer);
    }
  }
  return filtetredOffers;
};

const setOnFilterChange = (cb) => {
  filterElement.addEventListener('change', () => {
    cb();
  });
};

export {setOnFilterChange, getFilteredOffers};
