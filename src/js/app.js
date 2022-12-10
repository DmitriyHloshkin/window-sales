import { checkWebp } from './modules/gulpScripts.js';
import slickSlider  from './modules/slider.js';

import modals from './modules/modals.js';
import tabs from './modules/tabs.js';

window.addEventListener("DOMContentLoaded",() => {
  checkWebp();
  slickSlider();
  modals();
  tabs();
});