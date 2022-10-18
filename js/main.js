import {createAdvertisements} from './data.js';
import {showAdvertisment} from './card.js';

const mapCanvas = document.querySelector('#map-canvas');
const similarAdvertisements = createAdvertisements();
mapCanvas.appendChild(showAdvertisment(similarAdvertisements[0]));
