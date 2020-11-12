// IMPORTS //
import * as loaderView from './loader';

// VARIABLES //
/**
 * Store all images
 */
let allImages = [];

/**
 * Store only displayed images
 */
let displayedImages = [];

/**
 * Specifies where to start rendering images
 */
let start = 0;

/**
 * Specifies the upper limit of image rendering
 */
let limit = 10;

/**
 * Container element
 */
const container = document.querySelector('.container');

/**
 * Gallery element
 */
export const images = document.querySelector('.gallery');

/**
 * Show more button element
 */
export const button = document.querySelector('.show-more__button');

// FUNCTIONS //
/**
 * Save all images to the system
 * @param {{ id: number, url: string, large_url: string, source_id: number, copyright: string, site: string }[]} images An array that stores objects with images
 * @example
 * saveImages([{ id: 114, url: 'https://splashbase.s3.amazonaws.com', ... }, { id: 294, url: 'https://splashbase.s3.amazonaws.com', ... }]);
 */
export const saveImages = (images) => {
  allImages = images;
  displayedImages = images;
};

/**
 * Render the images transferred in the function
 * @param {{ id: number, url: string, large_url: string, source_id: number, copyright: string, site: string }[]} images An array that stores objects with images
 * @example
 * renderImages([{ id: 114, url: 'https://splashbase.s3.amazonaws.com', ... }, { id: 294, url: 'https://splashbase.s3.amazonaws.com', ... }]);
 */
export const renderImages = (images) => {
  const newLimit = limit < images.length ? limit : images.length;

  newLimit === images.length ? toggleButton(true) : toggleButton(false);

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
 * Render a single image to HTML
 * @param {{ id: number, url: string, large_url: string, source_id: number, copyright: string, site: string }} image Object that stores the image data
 * @param {'small' | 'large'} imageSize Specifies the size of the image
 * @example
 * renderImage({ id: 114, url: 'https://splashbase.s3.amazonaws.com', ... }, 'large');
 */
const renderImage = (image, imageSize) => {
  const imageHTML = `
    <div id="${image.id}" class="gallery__image gallery__image--${imageSize}" data-large="${image.large_url}">
      <div class="image__overlay">
        <span class="overlay__text--${imageSize}">#${image.site}</span>
      </div>
      <img class="overlay__image--${imageSize}" src="${image.url}" />
    </div>
  `;

  images.insertAdjacentHTML('beforeend', imageHTML);
};

/**
 * Render a single modal with enlarge picture
 * @param {string} imageSrc Specifies the path to the image
 * @example
 * renderImageModal('https://splashbase.s3.amazonaws.com');
 */
const renderImageModal = (imageSrc) => {
  const imageModalHTML = `
    <div class="modal">
      <span class="modal__close">&times;</span>
      <img class="modal__content" src="${imageSrc}">
    </div>
  `;

  container.insertAdjacentHTML('beforeend', imageModalHTML);

  // When the user clicks on <span> (x), close the modal
  document.querySelector('.modal__close').addEventListener('click', (event) => {
    event.target.parentElement.remove();
  });
};

/**
 * Render all images by filter transferred in the function
 * @param {string} filterName Specifies the name of the filter
 * @example
 * renderImagesByFilter('littlevisuals');
 */
export const renderImagesByFilter = (filterName) => {
  displayedImages = [];
  start = 0;
  limit = 10;

  clearImage();

  if (filterName === 'showall') {
    displayedImages = allImages;
  } else {
    allImages.forEach((image) => {
      if (image.site === filterName) {
        displayedImages.push(image);
      }
    });
  }

  renderImages(displayedImages);
};

/**
 * Render more results of images. Increase the limit and show loading button
 */
const renderMoreImage = () => {
  limit += 10;
  loaderView.loadingButton();

  setTimeout(() => {
    renderImages(displayedImages);
    loaderView.clearLoadingButton();
  }, 500);
};

/**
 * Change button visibility
 * @param {boolean} toggle Specifies button visibility
 * @example
 * toggleButton(false);
 */
const toggleButton = (toggle) => {
  button.hidden = toggle;
};

/**
 * Clear all gallery results (images)
 */
export const clearImage = () => {
  images.innerHTML = '';
};

// GLOBAL //
// Gallery listener - render modal with single image
images.addEventListener('click', (event) => {
  const imageObj = event.target.closest('.gallery__image');
  const imageURL =
    imageObj.dataset.large !== 'null'
      ? imageObj.dataset.large
      : imageObj.children[1].src;

  renderImageModal(imageURL);
});

// Show more button listener - render more images
button.addEventListener('click', () => {
  renderMoreImage();
});
