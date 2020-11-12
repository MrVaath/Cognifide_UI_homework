import axios from 'axios';

// Class image, where can I keep some data, like id, url etc and use different functions
export default class Image {
  constructor() {}

  // Try to get all images from api
  async getImages() {
    try {
      const res = await axios(
        `http://www.splashbase.co/api/v1/images/search?query=tree`
      );

      this.result = res.data.images;
    } catch (error) {
      console.log(error);
    }
  }
}
