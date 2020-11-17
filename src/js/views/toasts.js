// IMPORTS //
// Shared
import { container } from '../shared/elements';

// FUNCTIONS //
/**
 * Display error toast
 * @param {ErrorEvent} error Error that occured
 */
export const showError = (error) => {
  // Render toast with error message if exists
  if (error && error.message) {
    renderToast('error', error.message, 2000);
  } else {
    // Render toast with all error
    if (error === null || error === undefined) {
      error = 'Null or undefined';
    }

    renderToast('error', JSON.stringify(error).substring(0, 255), 2000);
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
  // Secure rendering toast - type and timeout
  if (type !== 'error' && type !== 'success') {
    type = 'error';
  }

  if (typeof timeout !== 'number') {
    timeout = 2000;
  }

  // Create div conainer and toast elements
  const toast = document.createElement('div');
  const messageContainer = `
    <div class="${type}">
      <span>${message}</span>
    </div>
  `;

  // Add class to toast container
  toast.classList.add('toast');

  // Append elements to toast and toast container to main container (if exists). After timeout - remove toast
  toast.insertAdjacentHTML('afterbegin', messageContainer);

  if (container) {
    container.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, timeout);
  }
};
