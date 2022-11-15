import {formatRooms, formatGuests} from './ad-form.js';

const houseTypes = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const createCardElement = (advertisement) => {
  const templateFragmentElement = document.querySelector('#card').content.querySelector('.popup');
  const fragmentListElements = document.createDocumentFragment();
  const advertisementElement = templateFragmentElement.cloneNode(true);
  const features = advertisement.offer.features;
  const featureListElements = advertisementElement.querySelectorAll('.popup__feature');
  const photoElements = advertisementElement.querySelector('.popup__photos');
  const photoElement = photoElements.querySelector('img');
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
    advertisementElement.querySelector('.popup__text--capacity').textContent = `${advertisement.offer.rooms} ${formatRooms(advertisement.offer.rooms)} для ${advertisement.offer.guests} ${formatGuests(advertisement.offer.guests)}`;
  }
  if (advertisement.offer.checkin || advertisement.offer.checkout) {
    advertisementElement.querySelector('.popup__text--time').textContent = `Заезд после ${advertisement.offer.checkin}, выезд до ${advertisement.offer.checkout}`;
  }
  if (features) {
    featureListElements.forEach((featureListElement) => {
      const isNecessary = features.some(
        (feature) => featureListElement.classList.contains(`popup__feature--${feature}`),
      );
      if (!isNecessary) {
        featureListElement.remove();
      }
    });
  }
  if (advertisement.offer.description) {
    advertisementElement.querySelector('.popup__description').textContent = advertisement.offer.description;
  }
  photoElements.innerHTML = '';
  if (advertisement.offer.photos) {
    advertisement.offer.photos.forEach((img) => {
      const photo = photoElement.cloneNode(true);
      photo.src = img;
      photoElements.appendChild(photo);
    });
  }
  if (advertisement.author.avatar) {
    advertisementElement.querySelector('.popup__avatar').setAttribute('src',advertisement.author.avatar);
  }
  advertisementElement.appendChild(fragmentListElements);
  return advertisementElement;
};

export {createCardElement};
