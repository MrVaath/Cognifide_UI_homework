import { elements } from './base';

export const renderImage = (image, large) => {
  if (large) {
    const markup = `
            <a class="gallery__image gallery__image--large" href="#${
              image.large_url
            }">
                <img src="${image.url}" alt="${image.site}" />
            </a>
        `;
    elements.images.insertAdjacentHTML('beforeend', markup);
  } else {
    const markup = `
            <a class="gallery__image gallery__image--small" href="#${
              image.large_url
            }">
                <img src="${image.url}" alt="${image.site}" />
            </a>
        `;
    elements.images.insertAdjacentHTML('beforeend', markup);
  }
};

export const renderResults = images => {
  for (let i = 0; i < 10; i++) {
    if (i % 10 === 4 || i % 10 === 8) {
      renderImage(images[i], true);
    } else {
      renderImage(images[i], false);
    }
  }
};
