// IMPORTS //
// Shared
import { gallery } from '../shared/elements';

// VARIABLES //
/**
 * Type of loader
 */
const loaderType = 'lds-ring';

// FUNCTIONS //
/**
 * Render a loader to HTML
 */
export const renderLoader = () => {
  // Create loader element
  const loader = `
    <div class="${loaderType}">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  `;

  // Append loader element to gallery container (if exists)
  if (gallery) {
    gallery.insertAdjacentHTML('afterbegin', loader);
  }
};

/**
 * Remove current loader
 */
export const removeLoader = () => {
  // Get loader element
  const loader = document.querySelector(`.${loaderType}`);

  // Remove loader
  if (loader) {
    loader.remove();
  }
};
