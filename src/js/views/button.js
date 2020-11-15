// IMPORTS //
// Views
import { renderMoreImage } from './images';

// Shared
import { container } from '../shared/elements';

// FUNCTIONS //
/**
 * Get show more button container
 * @returns {HTMLElement} Container displaying show more button
 */
const getButton = () => {
  return document.querySelector('.show-more');
};

/**
 * Render a show more button (if doesn't exists) to HTML and set event listener (click) to render more images
 */
export const renderButton = () => {
  if (!getButton()) {
    // Create div container and button element
    const showMore = document.createElement('div');
    const showMoreButton = document.createElement('button');

    // Add class to show more container, set innerHTML (text) and class with event listener to button element
    showMore.classList.add('show-more');
    showMoreButton.classList.add('show-more__button');
    showMoreButton.innerHTML = '<span>Show more</span>';
    showMoreButton.addEventListener('click', () => {
      renderMoreImage();
    });

    // Append show more container to main container (if exists)
    showMore.appendChild(showMoreButton);

    if (container) {
      container.appendChild(showMore);
    }
  }
};

/**
 * Change button state depending on param
 * @param {'loading' | 'text'} state Specifies button state
 * @example
 * changeButtonState('loading');
 */
export const changeButtonState = (state) => {
  // Get button element
  const button = document.querySelector('.show-more__button');

  if (button) {
    // Create button inner HTML depending on param
    const buttonInnerHTML =
      state === 'loading'
        ? '<i class="fa fa-spinner fa-spin"></i>'
        : '<span>Show more</span>';

    // Set button inner HTML
    button.innerHTML = buttonInnerHTML;
  }
};

/**
 * Remove a show more button container from HTML
 */
export const removeButton = () => {
  // Get container
  const showMore = getButton();

  // Remove element if exists
  if (showMore) {
    showMore.remove();
  }
};
