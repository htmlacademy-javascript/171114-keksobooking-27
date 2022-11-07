import {getRandomNumber} from './util.js';
import {getRandomFloat} from './util.js';
import {getRandomArray} from './util.js';
import {getRandomArrayElement} from './util.js';

const TYPES_LIST = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const FEATURES_LIST = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const CHECK_TIME = [
  '12:00',
  '13:00',
  '14:00',
];

const PHOTOS_LIST = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const houseTypes = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};



const formatNumber = (input) => input < 10 ? `0${input}` : String(input);

const mockAd = (index) => `img/avatars/user${formatNumber(index)}.png`;

const createAuthor = (index) => ({
  avatar: mockAd(index),
});

const getPhotosArray = (count, array) => {
  const number = getRandomNumber(0, count);
  const randomArray = [0];
  for (let i = 0; i < number; i++) {
    const element = getRandomArrayElement(array);
    randomArray[i] = element;
  }
  return randomArray;
};

const createOffer = (type, lat, lng) => ({
  title: `Сдается ${houseTypes[type]}`,
  address: `${lat}, ${lng}`,
  price: getRandomNumber(100, 5000),
  type: type,
  rooms: getRandomNumber(1, 10),
  guests: getRandomNumber(2, 15),
  checkin: getRandomArrayElement(CHECK_TIME),
  checkout: getRandomArrayElement(CHECK_TIME),
  features: getRandomArray(FEATURES_LIST),
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  photos: getPhotosArray(10, PHOTOS_LIST),
});

const createLocation = () => ({
  lat: getRandomFloat(35.65000, 35.70000, 5),
  lng: getRandomFloat(139.70000, 139.80000, 5),
});

// function createAdvertisement (avatarNumber) {
//   const type = getRandomArrayElement(TYPES_LIST);
//   const locationAdress = createLocation();
//   const obj = {
//     author: createAuthor(avatarNumber),
//     offer: createOffer(type, locationAdress.lat, locationAdress.lng),
//     location: locationAdress,
//   };
//   return obj;
// }

// const createAdvertisements = () => Array.from({length: SIMILAR_ADVERTISEMENT_COUNT}, (_, index) => createAdvertisement(index + 1));

export {houseTypes};
