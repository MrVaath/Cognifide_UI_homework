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
    imagesView.allFilters.forEach(element => {
      document.querySelector(`.${element}`).addEventListener('click', () => {
        imagesView.renderByFilter(allImages, element);
      });
    });
  } catch (error) {
    console.log(error);
  }
};

document.querySelector('.gallery').addEventListener('click', event => {
  // console.log(event.target.closest('.gallery__image'));
  const id = event.target.closest('.gallery__image').id;
  console.log(id);

  imagesView.renderLargeImage(id);
});

controlImages();
