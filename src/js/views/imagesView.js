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
      <a class="gallery__image gallery__image--large" id="${image.id}" href="#${
      image.id
    }" data-large="${image.large_url}"
    }">
      <div class="overlay">
        <div class="text--large">#${image.site}</div>
      </div>
        <img src="${image.url}" alt="${image.site}" />
      </a>
    `;
    elements.images.insertAdjacentHTML('beforeend', imageLarge);
  } else {
    const imageSmall = `
      <a class="gallery__image gallery__image--small" id="${image.id}" href="#${
      image.id
    }" data-large="${image.large_url}"
    }">
      <div class="overlay">
        <div class="text--small">#${image.site}</div>
      </div>
        <img src="${image.url}" alt="${image.site}" />
      </a>
    `;
    elements.images.insertAdjacentHTML('beforeend', imageSmall);
  }
};

export const renderLargeImage = url => {
  const largeImage = `
    <div class="modal">
      <span class="close">&times;</span>
      <img class="modal-content" src="${url}">
    </div>
  `;
  elements.images.insertAdjacentHTML('beforeend', largeImage);

  document.querySelector('.modal').addEventListener('click', event => {
    event.stopPropagation();
  });

  // When the user clicks on <span> (x), close the modal
  document.querySelector('.close').addEventListener('click', function() {
    this.parentElement.remove();
  });
};

export const renderResults = images => {
  newImages = images;
  toggleButton(false);
  if (limit < newImages.length) {
    for (start; start < limit; start++) {
      if (start % 10 === 4 || start % 10 === 8) {
        renderImage(newImages[start], true);
      } else {
        renderImage(newImages[start], false);
      }
    }
  } else {
    for (start; start < newImages.length; start++) {
      if (start % 10 === 4 || start % 10 === 8) {
        renderImage(newImages[start], true);
      } else {
        renderImage(newImages[start], false);
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
  if (filter === 'showall') {
    newImages = images;
    renderResults(newImages);
  } else {
    for (let i = 0; i < images.length; i++) {
      if (images[i].site === filter) {
        newImages.push(images[i]);
      }
    }
    renderResults(newImages);
  }
};

// Button
elements.button.addEventListener('click', () => {
  renderMore(newImages);
});

// Show more button
export const renderMore = images => {
  limit += 10;
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
