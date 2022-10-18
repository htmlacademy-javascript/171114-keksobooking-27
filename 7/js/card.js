

const showAdvertisment = (advertisement) => {
  const templateFragment = document.querySelector('#card').content;
  const fragmentList = document.createDocumentFragment();
  const advertisementElement = templateFragment.cloneNode(true);
  const type = advertisement.offer.type;
  const features = advertisement.offer.features;
  const featureList = advertisementElement.querySelectorAll('.popup__feature');
  const photos = advertisementElement.querySelector('.popup__photos');
  const photo = photos.querySelector('img');
  advertisementElement.querySelector('.popup__title').textContent = advertisement.offer.title;
  advertisementElement.querySelector('.popup__text--address').textContent = advertisement.offer.address;
  advertisementElement.querySelector('.popup__text--price').textContent = `${advertisement.offer.price} ₽/ночь`;
  switch (type) {
    case 'flat':
      advertisementElement.querySelector('.popup__type').textContent = 'Квартира';
      break;
    case 'bungalow':
      advertisementElement.querySelector('.popup__type').textContent = 'Бунгало';
      break;
    case 'house':
      advertisementElement.querySelector('.popup__type').textContent = 'Дом';
      break;
    case 'palace':
      advertisementElement.querySelector('.popup__type').textContent = 'Дворец';
      break;
    case 'hotel':
      advertisementElement.querySelector('.popup__type').textContent = 'Отель';
  }
  advertisementElement.querySelector('.popup__text--capacity').textContent = `${advertisement.offer.rooms} комнаты для ${advertisement.offer.guests} гостей`;
  advertisementElement.querySelector('.popup__text--time').textContent = `Заезд после ${advertisement.offer.checkin}, выезд до ${advertisement.offer.checkout}`;
  featureList.forEach((featureListItem) => {
    const isNecessary = features.some(
      (feature) => featureListItem.classList.contains(`popup__feature--${feature}`),
    );

    if (!isNecessary) {
      featureListItem.remove();
    }
  });
  advertisementElement.querySelector('.popup__description').textContent = advertisement.offer.description;
  advertisement.offer.photos.forEach((img) => {
    const photosElement = photo.cloneNode(true);
    photosElement.setAttribute('src', img);
    photos.appendChild(photosElement);
  });
  advertisementElement.querySelector('.popup__avatar').setAttribute('src',advertisement.author.avatar);
  fragmentList.appendChild(advertisementElement);
  return fragmentList;
};

export {showAdvertisment};


