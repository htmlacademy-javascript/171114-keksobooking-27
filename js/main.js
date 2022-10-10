function getRandomNumber(min, max) {
  if (min < 0 || max < 0) {
    return NaN;
  }
  if ((max - min) === 0) {
    return NaN;
  }
  const result = Math.random() * (max - min);
  if ((max - min) > 0) {
    return Math.round(result + min);
  }
  return Math.round(max - result);
}

function getRandomFloat(min, max, numberOfDecimalPlases) {
  if (min < 0 || max < 0 || numberOfDecimalPlases < 0) {
    return NaN;
  }

  if ((max - min) === 0) {
    return NaN;
  }
  let count = 1;
  for (let i = 0; i < numberOfDecimalPlases; i++) {
    count = count * 10;
  }
  const result = Math.random() * (max - min);

  if ((max - min) > 0) {

    return Math.round((result + min) * count) / count;
  }
  return Math.round((max - result) * count) / count;
}

const formatNumber = (input) => input < 10 ? `0${input}` : String(input);

function mockAd(index) {
  return `img/avatars/user${formatNumber(index)}.png`;
}

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

const SIMILAR_ADVERTISEMENT_COUNT = 10;

const createAuthor = (index) => ({
  avatar: mockAd(index),
});

const getRandomPositiveInteger = (a, b) => {
  if (a < 0 || b < 0) {
    return NaN;
  }
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const getRandomArray = (array) => {
  const number = getRandomNumber(0, (array.length - 1));
  const randomArray = [0];
  let element = getRandomArrayElement(array);
  for (let i = 0; i < number; i++) {
    while (randomArray.includes(element)) {
      element = getRandomArrayElement(array);
    }
    randomArray[i] = element;
  }
  return randomArray;
};

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
  title: `Beautiful ${type} for you!`,
  address: `${lat}, ${lng}`,
  price: getRandomNumber(100, 5000),
  type: type,
  rooms: getRandomNumber(1, 10),
  guests: getRandomNumber(1, 15),
  checkin: getRandomArrayElement(CHECK_TIME),
  checkout: getRandomArrayElement(CHECK_TIME),
  features: getRandomArray(FEATURES_LIST),
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  photos: getPhotosArray(10, PHOTOS_LIST),
});

const createLocation = () => ({
  lat: getRandomFloat(35.65000, 35.70000, 5),
  lng: getRandomFloat(139.70000, 139.80000, 5),
});

function createAdvertisement (avatarNumber) {
  const type = getRandomArrayElement(TYPES_LIST);
  const locationAdress = createLocation();
  const obj = {
    author: createAuthor(avatarNumber),
    offer: createOffer(type, locationAdress.lat, locationAdress.lng),
    location: locationAdress,
  };
  return obj;
}

const similarAdvertisements = Array.from({length: SIMILAR_ADVERTISEMENT_COUNT}, (_, index) => createAdvertisement(index + 1));

getRandomArrayElement(similarAdvertisements);
