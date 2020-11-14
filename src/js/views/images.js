// IMPORTS //
import * as filtersView from './filters';
import * as loaderView from './loader';

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

/**
 * Container element
 */
const container = document.querySelector('.container');

/**
 * Gallery element
 */
export const gallery = document.querySelector('.gallery');

/**
 * Show more container
 */
const showMoreContainer = document.querySelector('.show-more');

/**
 * Show more button element
 */
export const showMoreButton = document.querySelector('.show-more__button');

// FUNCTIONS //
/**
 * Save all images to the system, render them and available filters and set listeners (if array of images aren't empty - otherwise render an empty page)
 * @param {{ id: number, url: string, large_url: string, source_id: number, copyright: string, site: string }[]} images An array that stores objects with images
 * @example
 * saveImages([{ id: 114, url: 'https://splashbase.s3.amazonaws.com', ... }, { id: 294, url: 'https://splashbase.s3.amazonaws.com', ... }]);
 */
export const onInitialized = (images) => {
  if (images.length) {
    activeFilter = 'showall';
    allImages[activeFilter] = images;

    renderImages(images);
    filtersView.renderFilters(images);

    setModalClick();
    setButtonClick();
  } else {
    renderEmptyPage();
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

  gallery.insertAdjacentHTML('beforeend', imageHTML);
};

/**
 * Render all images transferred in the function
 * @param {{ id: number, url: string, large_url: string, source_id: number, copyright: string, site: string }[]} images An array that stores objects with images
 * @example
 * renderImages([{ id: 114, url: 'https://splashbase.s3.amazonaws.com', ... }, { id: 294, url: 'https://splashbase.s3.amazonaws.com', ... }]);
 */
const renderImages = (images) => {
  const newLimit = limit < images.length ? limit : images.length;

  newLimit === images.length
    ? isShowMoreButtonVisible(false)
    : isShowMoreButtonVisible(true);

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
 * Render a single modal with enlarge picture
 * @param {string} imageSrc Specifies the path to the image
 * @example
 * renderImageModal('https://splashbase.s3.amazonaws.com');
 */
const renderImageModal = (imageSrc) => {
  const imageModalHTML = `
    <div class="modal">
      <div class="modal__close">
        <button class="fas fa-times close__button"></button>
      </div>
      <img class="modal__content" src="${imageSrc}">
    </div>
  `;

  container.insertAdjacentHTML('beforeend', imageModalHTML);

  document.querySelector('.modal').addEventListener('click', (event) => {
    if (event.target.tagName !== 'IMG') {
      event.target.closest('.modal').remove();
    }
  });
};

/**
 * Set photos click listener - render modal with single image
 */
const setModalClick = () => {
  gallery.addEventListener('click', (event) => {
    const imageObj = event.target.closest('.gallery__image');
    const imageURL =
      imageObj.dataset.large !== 'null'
        ? imageObj.dataset.large
        : imageObj.children[1].src;

    renderImageModal(imageURL);
  });
};

/**
 * Render all images by filter transferred in the function
 * @param {string} filterName Specifies the name of the filter
 * @example
 * renderImagesByFilter('littlevisuals');
 */
export const renderImagesByFilter = (filterName) => {
  start = 0;
  limit = 10;

  activeFilter = filterName;

  if (!allImages[activeFilter]) {
    allImages[activeFilter] = allImages.showall.filter(
      (image) => image.site === activeFilter
    );
  }

  clearImage();
  renderImages(allImages[activeFilter]);
};

/**
 * Render more results of images. Increase the limit and show loading button
 */
const renderMoreImage = () => {
  limit += 10;
  loaderView.loadingButton();

  setTimeout(() => {
    renderImages(allImages[activeFilter]);
    loaderView.clearLoadingButton();
  }, 500);
};

/**
 * Set show more button listener - render more images
 */
const setButtonClick = () => {
  showMoreButton.addEventListener('click', () => {
    renderMoreImage();
  });
};

/**
 * Change show more button visibility
 * @param {boolean} toggle Specifies button visibility
 * @example
 * isShowMoreButtonVisible(false);
 */
const isShowMoreButtonVisible = (toggle) => {
  const displayedStyle = toggle ? 'flex' : 'none';

  showMoreContainer.setAttribute('style', `display: ${displayedStyle};`);
};

/**
 * Clear all gallery results (images)
 */
export const clearImage = () => {
  gallery.innerHTML = '';
};

/**
 * Render a container for a blank page. Display a message and remove the buttons (show more and filters)
 */
const renderEmptyPage = () => {
  const noData = `
    <div class="gallery__empty">Brak danych (no data)</div>
  `;

  gallery.insertAdjacentHTML('beforeend', noData);
  showMoreContainer.remove();
  filtersView.filters.remove();
};
