import { elements } from './base';

export const renderImage = image => {
  const markup = `
    <a class="" href="#">
        <img src="${image.url}" alt="${image.site}" />
    </a>
    `;
  elements.images.insertAdjacentHTML('afterbegin', markup);
};

export const renderResults = images => {
  images.forEach(renderImage);
};
