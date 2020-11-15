// IMPORTS //
// Shared
import { container } from '../shared/elements';

// FUNCTIONS //
/**
 * Display error toast
 * @param {ErrorEvent} error Error that occured
 */
export const showError = (error) => {
  if (error && error.message) {
    renderToast('error', error.message, 2000);
  } else {
    renderToast('error', JSON.stringify(error).substring(255), 2000);
  }
};

/**
 * Render a toast depending on params
 * @param {'success' | 'error'} type Specifies toast type
 * @param {string} message Specifies toast message
 * @param {number} timeout Specifies toast display time
 * @example
 * renderToast('error', 'Network error', 2000);
 */
const renderToast = (type, message, timeout) => {
  const toast = document.createElement('div');
  const messageContainer = `
    <div class="${type}">
      <span>${message}</span>
    </div>
  `;

  toast.classList.add('toast');

  toast.insertAdjacentHTML('afterbegin', messageContainer);

  if (container) {
    container.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, timeout);
  }
};
