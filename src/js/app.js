import { checkWebp } from './modules/gulpScripts.js';
import slickSlider  from './modules/slider.js';

import modals from './modules/modals.js';

window.addEventListener("DOMContentLoaded",() => {
  checkWebp();
  slickSlider();
  modals();
});