import {houseTypes} from './data.js';

const createCardElement = (advertisement) => {
  const templateFragment = document.querySelector('#card').content.querySelector('.popup');
  const fragmentList = document.createDocumentFragment();
  const advertisementElement = templateFragment.cloneNode(true);
  const features = advertisement.offer.features;
  const featureList = advertisementElement.querySelectorAll('.popup__feature');
  const photos = advertisementElement.querySelector('.popup__photos');
  const photo = photos.querySelector('img');
  advertisementElement.querySelector('.popup__title').textContent = advertisement.offer.title;
  if (advertisement.offer.address) {
    advertisementElement.querySelector('.popup__text--address').textContent = advertisement.offer.address;
  }
  if (advertisement.offer.price) {
    advertisementElement.querySelector('.popup__text--price').textContent = `${advertisement.offer.price} ₽/ночь`;
  }
  if (advertisement.offer.type) {
    advertisementElement.querySelector('.popup__type').textContent = houseTypes[advertisement.offer.type];
  }
  if (advertisement.offer.rooms || advertisement.offer.guests) {
    advertisementElement.querySelector('.popup__text--capacity').textContent = `${advertisement.offer.rooms} комнаты для ${advertisement.offer.guests} гостей`;
  }
  if (advertisement.offer.checkin || advertisement.offer.checkout) {
    advertisementElement.querySelector('.popup__text--time').textContent = `Заезд после ${advertisement.offer.checkin}, выезд до ${advertisement.offer.checkout}`;
  }
  if (features) {
    featureList.forEach((featureListItem) => {
      const isNecessary = features.some(
        (feature) => featureListItem.classList.contains(`popup__feature--${feature}`),
      );
      if (!isNecessary) {
        featureListItem.remove();
      }
    });
  }
  if (advertisement.offer.description) {
    advertisementElement.querySelector('.popup__description').textContent = advertisement.offer.description;
  }
  photos.innerHTML = '';
  if (advertisement.offer.photos) {
    advertisement.offer.photos.forEach((img) => {
      const photosElement = photo.cloneNode(true);
      photosElement.src = img;
      photos.appendChild(photosElement);
    });
  }
  if (advertisement.author.avatar) {
    advertisementElement.querySelector('.popup__avatar').setAttribute('src',advertisement.author.avatar);
  }
  advertisementElement.appendChild(fragmentList);
  return advertisementElement;
};

export {createCardElement};
