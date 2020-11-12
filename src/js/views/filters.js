// IMPORTS //
import { elements } from './base';
import * as imagesView from './images';

// VARIABLES //
let allFilters = [];

// FUNCTIONS //
/**
 * Render all available filters and add event listener to renders images by specifies filter
 * @param {{ id: number, url: string, large_url: string, source_id: number, copyright: string, site: string }[]} images An array that stores objects with images
 */
export const renderFilters = (images) => {
  // Create temp Array
  const filters = [];

  // Push all filters from image to temp Array
  images.forEach((image) => {
    filters.push(image.site);
  });

  // Create Array with all filters without duplication
  allFilters = ['showall', ...new Set(filters)];

  // Render a single filter and add listener - renders images by specifies filter
  allFilters.forEach((filter) => {
    renderFilter(filter);

    document
      .querySelector(`.filter__button.${filter}`)
      .addEventListener('click', () => {
        imagesView.renderByFilter(filter);
        changeActiveFilter(filter);
      });
  });
};

/**
 * Render a single filter to HTML
 * @param {string} filter
 */
const renderFilter = (filter) => {
  const filterHTML = `
    <button class="filter__button ${filter} ${
    filter === 'showall' ? 'active' : null
  }">${filter}</button>
  `;

  elements.fillters.insertAdjacentHTML('beforeend', filterHTML);
};

/**
 * Change active filter button
 * @param {string} filter Specifies the name of the active filter
 * @example
 * changeActiveFilter('showall');
 */
const changeActiveFilter = (filter) => {
  document.querySelector('.filter__button.active').classList.remove('active');
  document.querySelector(`.filter__button.${filter}`).classList.add('active');
};
