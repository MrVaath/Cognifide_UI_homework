import { elements } from './base';

export const renderLoader = () => {
  const loader = `
    <div class="${elements.loaderType}">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  `;

  elements.images.insertAdjacentHTML('beforebegin', loader);
};

export const clearLoader = () => {
  const loader = document.querySelector(`.${elements.loaderType}`);

  if (loader) {
    loader.parentElement.removeChild(loader);
  }
};

export const loadingButton = () => {
  elements.button.innerHTML = `<i class="fa fa-spinner fa-spin"></i>`;
};

export const clearLoadingButton = () => {
  elements.button.innerHTML = `<span>Show more</span>`;
};
