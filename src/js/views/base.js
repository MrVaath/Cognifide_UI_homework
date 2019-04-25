export const elements = {
  images: document.querySelector('.gallery'),
  headerButton: document.querySelector('.header__btn'),
  parentButton: document.querySelector('.more-btn'),
  button: document.querySelector('.more-btn__btn')
  // fillters: document.querySelector('.header__fillters')
};

export const elementStrings = {
  loader: 'lds-ring'
};

export const renderLoader = parent => {
  const loader = `
    <div class="${
      elementStrings.loader
    }"><div></div><div></div><div></div><div></div></div>
  `;
  parent.insertAdjacentHTML('beforebegin', loader);
};

export const clearLoader = () => {
  const loader = document.querySelector(`.${elementStrings.loader}`);
  if (loader) loader.parentElement.removeChild(loader);
};

export const toggleButton = toggle => {
  elements.button.hidden = toggle;
};
