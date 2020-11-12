// IMPORTS //
import { images, button } from './images';

// VARIABLES //
/**
 * Type of loader
 */
const loaderType = 'lds-ring';

// FUNCTIONS //
/**
 * Render the loader
 */
export const renderLoader = () => {
  const loader = `
    <div class="${loaderType}">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  `;

  images.insertAdjacentHTML('beforeend', loader);
};

/**
 * Clear current loader
 */
export const clearLoader = () => {
  const loader = document.querySelector(`.${loaderType}`);

  if (loader) {
    loader.parentElement.removeChild(loader);
  }
};

/**
 * Change button to loading state (render loading)
 */
export const loadingButton = () => {
  button.innerHTML = `<i class="fa fa-spinner fa-spin"></i>`;
};

/**
 * Change button to default state (clear loading)
 */
export const clearLoadingButton = () => {
  button.innerHTML = `<span>Show more</span>`;
};
