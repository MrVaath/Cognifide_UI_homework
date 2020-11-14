// IMPORTS //
import Images from './models/Images';
import * as imagesView from './views/images';
import * as loaderView from './views/loader';
import '../sass/style.scss';

// VARIABLES //
/**
 * Create new images object
 */
const images = new Images();

// FUNCTIONS //
/**
 * Get all images from api and renders results on UI
 */
const controlImages = async () => {
  // Prepare UI for results - clearing and displaing loader
  imagesView.clearImage();
  loaderView.renderLoader();

  try {
    // Try to get images data
    await images.getImages();

    // Create copy of all images
    const allImages = images && images.result ? images.result.slice() : [];

    // Renders results on UI - 10 images and fillters (nav)
    imagesView.onInitialized(allImages);
    loaderView.clearLoader();
  } catch (error) {
    console.error(error);
  }
};

// Initialization
controlImages();
