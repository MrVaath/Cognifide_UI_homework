export const elements = {
  images: document.querySelector('.gallery')
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
