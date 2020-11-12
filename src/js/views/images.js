import { elements, toggleButton } from './base';
import { loadingButton, clearLoadingButton } from './loader';

let allImages = [];
let limit, start;
start = 0;
limit = 10;

// IMAGES //
export const saveImages = (images) => {
  allImages = images;
};

/**
 * Render all available images
 * @param {{ id: number, url: string, large_url: string, source_id: number, copyright: string, site: string }[]} images An array that stores objects with images
 */
export const renderImages = (images) => {
  toggleButton(false);

  if (limit < images.length) {
    for (start; start < limit; start++) {
      // Check if is it a 5 or 9 picture to create large object (add different class)
      if (start % 10 === 4 || start % 10 === 8) {
        renderImage(images[start], 'large');
        // Check if is it a 8 or 10 picture to add mobile class (fix displaying on small screen)
      } else if (start % 10 === 7 || start % 10 === 9) {
        renderImage(images[start], 'small');
        document.getElementById(`${images[start].id}`).classList.add('mobile');
      } else {
        renderImage(images[start], 'small');
      }
    }
  } else {
    for (start; start < images.length; start++) {
      if (start % 10 === 4 || start % 10 === 8) {
        renderImage(images[start], 'large');
      } else if (start % 10 === 7 || start % 10 === 9) {
        renderImage(images[start], 'small');
        document.getElementById(`${images[start].id}`).classList.add('mobile');
      } else {
        renderImage(images[start], 'small');
      }
    }
    toggleButton(true);
  }
};

/**
 * Render a single image to HTML
 * @param {{ id: number, url: string, large_url: string, source_id: number, copyright: string, site: string }} image Object that stores the image data
 * @param {'small' | 'large'} imageSize Specifies the size of the image
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

  elements.images.insertAdjacentHTML('beforeend', imageHTML);
};

/**
 * Render a single modal with enlarge picture
 * @param {string} imageSrc Specifies the path to the image
 */
const renderImageModal = (imageSrc) => {
  const imageModalHTML = `
    <div class="modal">
      <span class="modal__close">&times;</span>
      <img class="modal__content" src="${imageSrc}">
    </div>
  `;

  elements.container.insertAdjacentHTML('beforeend', imageModalHTML);

  // When the user clicks on <span> (x), close the modal
  document.querySelector('.modal__close').addEventListener('click', (event) => {
    event.target.parentElement.remove();
  });
};

// Render all images by filter on nav
export const renderByFilter = (filter) => {
  let filterImages = [];
  start = 0;
  limit = 10;

  clearImage();
  if (filter === 'showall') {
    filterImages = allImages;
  } else {
    allImages.forEach((image) => {
      if (image.site === filter) {
        filterImages.push(image);
      }
    });
  }

  renderImages(filterImages);
};

// Show more button function
const renderMore = (images) => {
  limit += 10;
  loadingButton();
  setTimeout(() => {
    renderImages(images);
    clearLoadingButton();
  }, 500);
};

// Clear all gallery
export const clearImage = () => {
  elements.images.innerHTML = '';
};

// GLOBAL //
// Gallery listener - render modal with single image
elements.images.addEventListener('click', (event) => {
  const imageObj = event.target.closest('.gallery__image');
  const imageURL =
    imageObj.dataset.large !== 'null'
      ? imageObj.dataset.large
      : imageObj.children[1].src;

  renderImageModal(imageURL);
});

// Show more button listener - render more images
elements.button.addEventListener('click', () => {
  renderMore(allImages);
});
