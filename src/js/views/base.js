export const elements = {
  images: document.querySelector('.flexbin')
};

export const elementStrings = {
  loader: 'lds-ring'
};

export const renderLoader = parent => {
  const loader = `
    <div class="${elementStrings.loader}"></div>
  `;
  parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
  const loader = document.querySelector(`.${elementStrings.loader}`);
  if (loader) loader.parentElement.removeChild(loader);
};
