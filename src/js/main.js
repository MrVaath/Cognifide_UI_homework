// IMPORTS //
// Models
import Images from './models/Images';

// Views
import { onInitialized } from './views/images';
import { renderLoader, removeLoader } from './views/loader';
import { showError } from './views/toasts';

// Styles
import '../sass/style.scss';

// Strict mode
('use strict');

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
  // Prepare UI for results - displaing loader
  renderLoader();

  try {
    // Try to get images data
    await images.getImages();

    // Create copy of all images
    const allImages = images && images.result ? images.result.slice() : [];

    // Renders results on UI - clearing page, rendering 10 images and available fillters (nav), setting listeners and removing loader
    onInitialized(allImages);
    removeLoader();
  } catch (error) {
    // Render empty page, remove loader and display error (toast)
    onInitialized([]);
    removeLoader();
    showError(error);

    console.error(error);
  }
};

// Initialization
controlImages();
