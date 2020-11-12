// IMPORTS //
import axios from 'axios';

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
      const res = await axios(
        `https://www.splashbase.co/api/v1/images/search?query=tree`
      );

      this.result = res.data.images;
    } catch (error) {
      console.error(error);
    }
  }
}
