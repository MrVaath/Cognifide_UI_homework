import { elements, toggleButton } from './base';

let limit, start, cutFilters, newImages;
export let allFilters;
start = 0;
limit = 10;

// DYNAMIC CODE FOR RENDERING FILTER FROM IMAGE OBJECT
// export const renderFilter = filter => {
//   const filterHTML = `
//     <button class="header__btn ${filter}">${filter}</button>
//   `;
//   elements.fillters.insertAdjacentHTML('beforeend', filterHTML);
// };

// FILTERS
export const renderFilters = images => {
  // Create temp array
  let filters = [];

  // Push all filters from image to this Array
  images.forEach(element => {
    filters.push(element.site);
  });

  // Delete repeating elements and push it to the new Array
  cutFilters = [...new Set(filters)];

  // Render all filter
  // cutFilters.forEach(renderFilter);

  // Create Array with all filters
  allFilters = ['showall', ...cutFilters];
};

// IMAGES
export const renderImage = (image, large) => {
  if (large) {
    const imageLarge = `
      <a class="gallery__image gallery__image--large" href="#${image.id}">
      <div class="overlay">
        <div class="text--large">#${image.site}</div>
      </div>
        <img src="${image.url}" alt="${image.site}" />
      </a>
    `;
    elements.images.insertAdjacentHTML('beforeend', imageLarge);
  } else {
    const imageSmall = `
      <a class="gallery__image gallery__image--small" href="#${image.id}">
      <div class="overlay">
        <div class="text--small">#${image.site}</div>
      </div>
        <img src="${image.url}" alt="${image.site}" />
      </a>
    `;
    elements.images.insertAdjacentHTML('beforeend', imageSmall);
  }
};

export const renderLargeImage = image => {};

export const renderResults = images => {
  toggleButton(false);
  if (limit < images.length) {
    for (start; start < limit; start++) {
      if (start % 10 === 4 || start % 10 === 8) {
        renderImage(images[start], true);
      } else {
        renderImage(images[start], false);
      }
    }
  } else {
    for (start; start < images.length; start++) {
      if (start % 10 === 4 || start % 10 === 8) {
        renderImage(images[start], true);
      } else {
        renderImage(images[start], false);
      }
    }
    toggleButton(true);
  }
};

export const renderByFilter = (images, filter) => {
  // Show by filters
  newImages = [];
  start = 0;
  limit = 10;
  changeActive(allFilters, filter);
  clearImage();
  for (let i = 0; i < images.length; i++) {
    if (images[i].site === filter) {
      newImages.push(images[i]);
    }
  }
  renderResults(newImages);
};

// Button
elements.button.addEventListener('click', () => {
  limit += 10;
  renderMore(newImages);
});

// Show more button
export const renderMore = images => {
  // limit += 10;
  renderResults(images);
};

// Clear all gallery
export const clearImage = () => {
  elements.images.innerHTML = '';
};

// Change active page - css
const changeActive = (filters, filter) => {
  filters.forEach(element => {
    if (document.querySelector(`.${element}`).classList.contains('active')) {
      document.querySelector(`.${element}`).classList.remove('active');
    }
    document.querySelector(`.${filter}`).classList.add('active');
  });
};
