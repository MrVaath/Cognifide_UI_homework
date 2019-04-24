import { elements, clearButton } from './base';

var limit = 10;
var start = 0;

export const renderFillter = fillter => {
  const markup = `
    <button class="header__btn">${fillter}</button>
  `;
  elements.fillters.insertAdjacentHTML('beforeend', markup);
};

export const renderFillters = images => {
  const fillters = [];
  for (let i = 0; i < images.length; i++) {
    fillters[i] = images[i].site;
  }
  const allFillters = [...new Set(fillters)];
  allFillters.forEach(renderFillter);
};

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
  if (limit < images.length) {
    for (start; start < limit; start++) {
      if (start % 10 === 4 || start % 10 === 8) {
        renderImage(images[start], true);
      } else {
        renderImage(images[start], false);
      }
    }
  } else {
    for (start; start < images.length; start++) {
      if (start % 10 === 4 || start % 10 === 8) {
        renderImage(images[start], true);
      } else {
        renderImage(images[start], false);
      }
    }
    clearButton();
  }
};

export const renderMore = images => {
  elements.button.addEventListener('click', () => {
    limit += 10;
    renderResults(images);
  });
};
