import { checkWebp } from './modules/gulpScripts.js';
import slickSlider  from './modules/slider.js';

import modals from './modules/modals.js';
import tabs from './modules/tabs.js';
import forms from './modules/forms.js';

window.addEventListener("DOMContentLoaded",() => {
  checkWebp();
  slickSlider();
  modals();
  tabs();
  forms();
});