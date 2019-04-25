import Images from './models/Images';
import * as imagesView from './views/imagesView';
import { elements, renderLoader, clearLoader } from './views/base';

// Create new images object
const images = new Images();

const controlImages = async () => {
  // Prepare UI for results
  imagesView.clearImage();
  renderLoader(elements.images);

  try {
    // Get images data
    await images.getImages();

    // Create copy of all images
    let allImages = images.result.slice();

    // Render results on UI - 10 elements and render fillters (nav)
    clearLoader();
    imagesView.renderResults(images.result);
    imagesView.renderFilters(allImages);

    // Render results by filters
    // All
    elements.headerButton.addEventListener('click', () => {
      imagesView.renderResults(allImages);
    });

    // Other filters
    imagesView.allFilters.forEach(element => {
      document.querySelector(`.${element}`).addEventListener('click', () => {
        imagesView.renderByFilter(allImages, element);
      });
    });
  } catch (error) {
    console.log(error);
  }
};

const test = () => {
  // Get ID from url
  const id = window.location.hash.replace('#', '');
  console.log(`ID: ${id}`);
};

controlImages();

document.querySelector('.gallery').addEventListener('click', event => {
  console.log(event.target.closest('.gallery__image'));
  console.log('działa');
});
