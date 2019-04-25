import Images from './models/Images';
import * as imagesView from './views/imagesView';
import { elements, renderLoader, clearLoader } from './views/base';

// Create new images object
const images = new Images();

const controlImages = async () => {
  // Prepare UI for results - clearing and displaing loader
  imagesView.clearImage();
  renderLoader(elements.images);

  try {
    // Try to get images data
    await images.getImages();

    // Create copy of all images
    let allImages = images.result.slice();

    // Render results on UI - 10 elements and render fillters (nav)
    clearLoader();
    imagesView.renderResults(images.result);
    imagesView.renderFilters(allImages);

    // Render results by filters - click listener
    imagesView.allFilters.forEach(element => {
      document.querySelector(`.${element}`).addEventListener('click', () => {
        imagesView.renderByFilter(allImages, element);
      });
    });
  } catch (error) {
    console.log(error);
  }
};

// Function to display large img
document.querySelector('.gallery').addEventListener('click', event => {
  const imageObj = event.target.closest('.gallery__image');
  let imageURL =
    imageObj.dataset.large !== 'null'
      ? imageObj.dataset.large
      : imageObj.children[1].src;
  imagesView.renderLargeImage(imageURL);
});

// Initialization
controlImages();
