import Images from './models/Images';
import * as imagesView from './views/images';
import * as loaderView from './views/loader';
import * as filtersView from './views/filters';

// Create new images object
const images = new Images();

const controlImages = async () => {
  // Prepare UI for results - clearing and displaing loader
  imagesView.clearImage();
  loaderView.renderLoader();

  try {
    // Try to get images data
    await images.getImages();

    // Create copy of all images
    const allImages = images.result.slice();

    // Renders results on UI - 10 images and fillters (nav)
    imagesView.saveImages(allImages);
    imagesView.renderImages(allImages);
    filtersView.renderFilters(allImages);
    loaderView.clearLoader();
  } catch (error) {
    console.log(error);
  }
};

// Initialization
controlImages();
