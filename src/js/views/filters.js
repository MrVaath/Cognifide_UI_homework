// IMPORTS //
// Views
import { renderImagesByFilter } from './images';

// VARIABLES //
/**
 * Header filters container
 */
const filters = document.querySelector('.header__filters');

/**
 * Specifies previous active filter name
 */
let previousActiveFilter = 'showall';

// FUNCTIONS //
/**
 * Render a single filter to HTML and set event listener (click) to render images by specifies filter and change active class
 * @param {string} filterName Specifies the name of the filter
 * @example
 * renderFilter('unsplash');
 */
const renderFilter = (filterName) => {
  // Create button element
  const filterButton = document.createElement('button');

  // Add attributes to element like id, class, innerHTML (text) with event listener
  filterButton.id = filterName;
  filterButton.classList.add('filter__button');
  filterButton.innerHTML = filterName;
  filterButton.addEventListener('click', () => {
    if (previousActiveFilter !== filterName) {
      previousActiveFilter = filterName;
      renderImagesByFilter(filterName);
      changeActiveFilter(filterName);
    }
  });

  // Append button element to filters container (if exists)
  if (filters) {
    filters.appendChild(filterButton);
  }
};

/**
 * Render all available filters
 * @param {{ id: number, url: string, large_url: string, source_id: number, copyright: string, site: string }[]} allImages An array that stores objects with images
 * @example
 * renderFilters([{ id: 114, url: 'https://splashbase.s3.amazonaws.com', ... }, { id: 294, url: 'https://splashbase.s3.amazonaws.com', ... }]);
 */
export const renderFilters = (allImages) => {
  if (allImages && Array.isArray(allImages) && allImages.length) {
    // Create temp Array of all filters
    const tempFilters = [];

    // Push all available filters from image to temp Array
    allImages.forEach((image) => {
      if (image.site) {
        tempFilters.push(image.site);
      }
    });

    if (tempFilters.length) {
      // Create Array with all filters without duplication
      const allFilters = ['showall', ...new Set(tempFilters)];

      // Render a single filter
      allFilters.forEach(renderFilter);

      // Activate showall button
      changeActiveFilter('showall');
    }
  }
};

/**
 * Change active filter button
 * @param {string} activeFilterName Specifies the name of the active filter
 * @example
 * changeActiveFilter('showall');
 */
const changeActiveFilter = (activeFilterName) => {
  // Get previous and current elements
  const previousActive = document.querySelector('.filter__button.active');
  const currentActive = document.getElementById(activeFilterName);

  // Remove active class
  if (previousActive) {
    previousActive.classList.remove('active');
  }

  // Add active class
  if (currentActive) {
    currentActive.classList.add('active');
  }
};

/**
 * Remove all filters and container from HTML
 */
export const removeFilters = () => {
  // Remove element if exists
  if (filters) {
    filters.remove();
  }
};
