import './form.js';
import {getAdFormDisabled} from './ad-form.js';
import {getAdFormActive} from './ad-form.js';
import {createAdvertisements} from './data.js';
import {showAdvertisment} from './card.js';

const mapCanvas = document.querySelector('#map-canvas');
const similarAdvertisements = createAdvertisements();
mapCanvas.appendChild(showAdvertisment(similarAdvertisements[0]));

getAdFormDisabled();
getAdFormActive();
