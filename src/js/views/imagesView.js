import { elements, clearButton } from './base';

var limit = 10;
var start = 0;
var allFilters;

export const renderFilter = filter => {
  const markup = `
    <button class="header__btn ${filter}">${filter}</button>
  `;
  elements.fillters.insertAdjacentHTML('beforeend', markup);
};

export const renderFilters = images => {
  const filters = [];
  for (let i = 0; i < images.length; i++) {
    filters[i] = images[i].site;
  }
  allFilters = [...new Set(filters)];
  allFilters.forEach(renderFilter);
};

export const renderImage = (image, large) => {
  if (large) {
    const markup = `
      <a class="gallery__image gallery__image--large" data-type=${
        image.site
      } href="#${image.large_url}">
      <div class="overlay">
        <div class="text--large">#${image.site}</div>
      </div>
        <img src="${image.url}" alt="${image.site}" />
      </a>
    `;
    elements.images.insertAdjacentHTML('beforeend', markup);
  } else {
    const markup = `
      <a class="gallery__image gallery__image--small" data-type=${
        image.site
      } href="#${image.large_url}">
      <div class="overlay">
        <div class="text--small">#${image.site}</div>
      </div>
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

export const renderByFilter = images => {
  // Show all
  document.querySelector(`.header__btn`).addEventListener('click', () => {
    renderResults(images);
  });

  // Show by filters
  for (let i = 0; i < allFilters.length; i++) {
    // const newImages = [];
    document
      .querySelector(`.${allFilters[i]}`)
      .addEventListener('click', () => {
        // for (let j = 0; j < images.length; j++) {
        //   if (images[j].site === allFillters[i]) {
        //     newImages.push(images[j]);
        //   }
        // }
        // console.log(newImages);

        // limit = 10;
        // start = 0;
        // renderResults(newImages);
        console.log(`działa ${allFilters[i]}`);
      });
  }
};
