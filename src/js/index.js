import Images from './models/Images';
import * as imagesView from './views/imagesView';
import { elements, renderLoader, clearLoader } from './views/base';

const controlImages = async () => {
  const images = new Images();
  try {
    // Prepare UI for results
    renderLoader(elements.images);

    // Search for images
    await images.getImages();

    // Create copy of all images
    const allImages = images.result.slice();

    // Render results on UI - 10 elements and render fillters (nav)
    clearLoader();
    imagesView.renderResults(allImages);
    imagesView.renderFilters(allImages);

    // Render more results after clicking the button
    imagesView.renderMore(allImages);
    imagesView.renderByFilter(allImages);
  } catch (error) {
    console.log(error);
  }
};

controlImages();
