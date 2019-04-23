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

    // Render results on UI
    clearLoader();
    imagesView.renderResults(images.result);
    // console.log(images.result[0].site);
  } catch (error) {
    console.log(error);
  }
};

controlImages();
