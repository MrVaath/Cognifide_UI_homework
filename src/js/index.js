import Images from './models/Images';
import * as imagesView from './views/imagesView';
import { elements, renderLoader, clearLoader } from './views/base';

const controlImages = async () => {
  const images = new Images();
  try {
    // Prepare UI forresults
    renderLoader(elements.images);

    // Search for images
    await images.getImages();

    // Render resultson UI
    imagesView.renderResults(images.result);
  } catch (error) {
    console.log(error);
  }
};

controlImages();
