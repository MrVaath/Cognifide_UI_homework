// IMPORTS //
// Views
import { renderFilters, removeFilters } from './filters';
import { renderButton, removeButton, changeButtonState } from './button';

// Shared
import { container, gallery } from '../shared/elements';

// VARIABLES //
/**
 * Store all images separated by filters
 */
const allImages = {};

/**
 * Specifies the name of the active filter
 */
let activeFilter;

/**
 * Specifies where to start rendering images
 */
let start = 0;

/**
 * Specifies the upper limit of image rendering
 */
let limit = 10;

// FUNCTIONS //
/**
 * Save all images to the system, render them and all available filters (if array of images aren't empty - otherwise render an empty page)
 * @param {{ id: number, url: string, large_url: string, source_id: number, copyright: string, site: string }[]} images An array that stores objects with images
 * @example
 * onInitialized([{ id: 114, url: 'https://splashbase.s3.amazonaws.com', ... }, { id: 294, url: 'https://splashbase.s3.amazonaws.com', ... }]);
 */
export const onInitialized = (images) => {
  // Clear gallery
  clearGallery();

  if (images.length) {
    // Set active filter and assign images
    activeFilter = 'showall';
    allImages[activeFilter] = images;

    // Render filters and images
    renderFilters(images);
    renderImages(images);
  } else {
    // Render an empty page
    renderEmptyPage();
  }
};

/**
 * Render a single image to HTML and set event listener (click) to render modal with enlarge picture
 * @param {{ id: number, url: string, large_url: string, source_id: number, copyright: string, site: string }} image Object that stores the image data
 * @param {'small' | 'large'} imageSize Specifies the size of the image
 * @example
 * renderImage({ id: 114, url: 'https://splashbase.s3.amazonaws.com', ... }, 'large');
 */
const renderImage = (image, imageSize) => {
  // Create div conainer and image elements
  const imageContainer = document.createElement('div');
  const imageElements = `
    <div class="image__overlay">
      <span class="overlay__text--${imageSize}">#${image.site}</span>
    </div>
    <img src="${image.url}" />
    `;

  // Add id, classes and event listener to image container
  imageContainer.id = image.id;
  imageContainer.classList.add(
    'gallery__image',
    `gallery__image--${imageSize}`
  );
  imageContainer.addEventListener('click', () => {
    const imageURL = image.large_url ? image.large_url : image.url;

    renderImageModal(imageURL);
  });

  // Append image container to gallery container (if exists)
  imageContainer.insertAdjacentHTML('afterbegin', imageElements);

  if (gallery) {
    gallery.appendChild(imageContainer);
  }
};

/**
 * Render all images transferred in the function
 * @param {{ id: number, url: string, large_url: string, source_id: number, copyright: string, site: string }[]} images An array that stores objects with images
 * @example
 * renderImages([{ id: 114, url: 'https://splashbase.s3.amazonaws.com', ... }, { id: 294, url: 'https://splashbase.s3.amazonaws.com', ... }]);
 */
const renderImages = (images) => {
  // Get upper limit of rendering
  const newLimit = limit < images.length ? limit : images.length;

  // Render or remove button depending on limit
  newLimit === images.length ? removeButton() : renderButton();

  // Render images from start to upper limit
  for (start; start < newLimit; start++) {
    // Check if is it a 5 or 9 picture to create large object (add different class)
    if (start % 10 === 4 || start % 10 === 8) {
      renderImage(images[start], 'large');
    } else {
      renderImage(images[start], 'small');

      // Check if is it a 8 or 10 picture to add mobile class (fix displaying on small screen)
      if (start % 10 === 7 || start % 10 === 9) {
        document.getElementById(`${images[start].id}`).classList.add('mobile');
      }
    }
  }
};

/**
 * Render a single modal with enlarge picture and set event listener (click) to close modal
 * @param {string} imageSrc Specifies the path to the image
 * @example
 * renderImageModal('https://splashbase.s3.amazonaws.com');
 */
const renderImageModal = (imageSrc) => {
  // Create div conainer and modal elements
  const modalContainer = document.createElement('div');
  const modalElements = `
    <div class="modal__close">
      <button class="fas fa-times close__button"></button>
    </div>
    <img class="modal__content" src="${imageSrc}">
  `;

  // Add class and event listener to modal container
  modalContainer.classList.add('modal');
  modalContainer.addEventListener('click', (event) => {
    if (event.target.tagName !== 'IMG') {
      modalContainer.remove();
    }
  });

  // Append modal container to main container (if exists)
  modalContainer.insertAdjacentHTML('afterbegin', modalElements);

  if (container) {
    container.appendChild(modalContainer);
  }
};

/**
 * Render all images depending on filter name
 * @param {string} filterName Specifies the name of the filter
 * @example
 * renderImagesByFilter('littlevisuals');
 */
export const renderImagesByFilter = (filterName) => {
  // Reset variables (including limit)
  start = 0;
  limit = 10;

  // Change active filter name
  activeFilter = filterName;

  // Filter images by image's site (if doesn't exists at object)
  if (!allImages[activeFilter]) {
    allImages[activeFilter] = allImages.showall.filter(
      (image) => image.site === activeFilter
    );
  }

  // Clear gallery and render new images (by filter)
  clearGallery();
  renderImages(allImages[activeFilter]);
};

/**
 * Render more results of images. Increase the limit and change button state
 */
export const renderMoreImage = () => {
  // Increase the limit by 10
  limit += 10;

  // Change button to loading state
  changeButtonState('loading');

  // After 500 ms - render more images and change button to default state
  setTimeout(() => {
    renderImages(allImages[activeFilter]);
    changeButtonState('text');
  }, 500);
};

/**
 * Render a container for a blank page. Display a message and remove the buttons (show more and filters)
 */
const renderEmptyPage = () => {
  // Create no data element
  const noData = `
    <div class="gallery__empty">Brak danych (no data)</div>
  `;

  // Append no data element to gallery container (if exists) and remove buttons
  if (gallery) {
    gallery.insertAdjacentHTML('afterbegin', noData);
    removeFilters();
    removeButton();
  }
};

/**
 * Clear all gallery results (images)
 */
const clearGallery = () => {
  gallery.innerHTML = '';
};
