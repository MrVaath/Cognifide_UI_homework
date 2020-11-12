export const elements = {
  container: document.querySelector('.container'),
  fillters: document.querySelector('.header__filters'),
  images: document.querySelector('.gallery'),
  button: document.querySelector('.more-btn__btn'),
  loaderType: 'lds-ring',
};

export const toggleButton = (toggle) => {
  elements.button.hidden = toggle;
};
