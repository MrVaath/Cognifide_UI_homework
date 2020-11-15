// IMPORTS //
// Axios
import axios from 'axios';

// Views
import { showError } from '../views/toasts';

/**
 * Image class, where can I keep some data, like id, url etc. and use different functions
 */
export default class Image {
  constructor() {}

  // FUNCTIONS //
  /**
   * Get all images from api
   */
  async getImages() {
    try {
      // Try to get images data
      const res = await axios(
        `http://www.splashbase.co/api/v1/images/search?query=tree`
      );

      // Save images data
      this.result = res.data.images;
    } catch (error) {
      // Display error (toast)
      showError(error);

      console.error(error);
    }
  }
}
