// IMPORTS //
import * as imagesView from './images';

// VARIABLES //
/**
 * Header filters element
 */
const filters = document.querySelector('.header__filters');

// FUNCTIONS //
/**
 * Render all available filters and add event listener to renders images by specifies filter
 * @param {{ id: number, url: string, large_url: string, source_id: number, copyright: string, site: string }[]} allImages An array that stores objects with images
 * @example
 * renderFilters([{ id: 114, url: 'https://splashbase.s3.amazonaws.com', ... }, { id: 294, url: 'https://splashbase.s3.amazonaws.com', ... }]);
 */
export const renderFilters = (allImages) => {
  // Create temp Array
  const filters = [];

  // Push all filters from image to temp Array
  allImages.forEach((image) => {
    filters.push(image.site);
  });

  // Create Array with all filters without duplication
  const allFilters = ['showall', ...new Set(filters)];

  // Render a single filter and add listener - renders images by specifies filter
  allFilters.forEach((filter) => {
    renderFilter(filter);

    document
      .querySelector(`.filter__button.${filter}`)
      .addEventListener('click', () => {
        imagesView.renderImagesByFilter(filter);
        changeActiveFilter(filter);
      });
  });

  // Activate showall button
  changeActiveFilter('showall');
};

/**
 * Render a single filter to HTML
 * @param {string} filterName Specifies the name of the filter
 * @example
 * renderFilter('unsplash');
 */
const renderFilter = (filterName) => {
  const filterHTML = `
    <button class="filter__button ${filterName}">${filterName}</button>
  `;

  filters.insertAdjacentHTML('beforeend', filterHTML);
};

/**
 * Change active filter button
 * @param {string} activeFilterName Specifies the name of the active filter
 * @example
 * changeActiveFilter('showall');
 */
const changeActiveFilter = (activeFilterName) => {
  const activeFilter = document.querySelector('.filter__button.active');

  if (activeFilter) {
    activeFilter.classList.remove('active');
  }

  document
    .querySelector(`.filter__button.${activeFilterName}`)
    .classList.add('active');
};
